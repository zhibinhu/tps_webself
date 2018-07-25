<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">报表管理</li>
            <li class="breadcrumb-item active">报表-图表</li>
        </ol>
        <div class="row" style="margin-left: 15px;margin-bottom: 12px">
            <label style="width:75px;">报表年份:</label>
            <div class="col-md-3" v-show="is_show === 0">
                <select class="form-control" v-model="year">
                    <option v-for="year in years" v-bind:class="{ selected : curyear === year }">{{year}}</option>
                </select>
            </div>
            <div class="col-md-3" v-show="is_show === 1">
                <select class="form-control" v-model="showYear">
                    <option>{{showYear}}</option>
                </select>
            </div>
            <div class="col-md-1">
                <button type="button" class="btn btn-info rounded" @click="queryData"><i class="fa fa-search"
                                                                                         style="color: #fff"></i> 查询
                </button>
            </div>
        </div>

        <div class="row">
            <!-- 柱图 -->
            <div class="col-md-7">
                <div style="width: 600px; height: 420px; display: inline-block; text-align: center" v-show="is_show === 1">
                    <div style="height: 30%"></div>
                    <span style="font-size: 28px">没有已完成的计划！</span>
                </div>
                <div id="myChartLine" :style="{width: '600px', height: '420px'}" v-show="is_show === 0"></div>
            </div>
            <!-- 环形图 -->
            <div class="col-md-5" style="position: relative">
                <div style="width: 400px; height: 420px; display: inline-block; text-align: center" v-show="is_show === 1">
                    <div style="height: 30%"></div>
                    <span style="font-size: 28px">已完成计划的个数为0！</span>
                </div>
                <div id="myChart" :style="{width: '400px', height: '420px'}" v-show="is_show === 0"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {
        del,
        treeify
    } from '../../misc/utils'
    import {
        Docgroup,
        User,
        Log,
        Fills
    } from '../../resources'
    import swal from 'sweetalert'
    import Pagination from '../../widgets/pagination.vue'
    import {
        debounce
    } from '../../misc/utils'

    var page_backup = null; // 初始化分页数据备份

    export default {
        data: () => ({
            loading: 0,
            keyword: '',
            years: '',
            curyear: '',
            is_show: 0,
            showYear: 0,
            year: '',
            //柱形图
            getOptionLine: {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color: ['#48cda6', '#fd87ab', '#11abff', '#ffdf33', '#968ade', '#c64fcd', '#202FCD'],
                legend: {
                    data: []
                },
                toolbox: {
                    show: true,
                    orient: 'vertical',
                    top: '10%',
                    right:'20px',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true,
                            optionToContent: function (opt) {
                                let axisData = opt.xAxis[0].data;
                                let series = opt.series;
                                if (axisData != undefined && series != undefined) {
                                    //表头
                                    let table = '<table style="width:100%;text-align:center"><tbody><tr>'
                                        + '<td>月份</td>';
                                    for (let i = 0; i < series.length - 1; i++) {
                                        table += '<td>' + series[i].name + '</td>';
                                    }
                                    table += '<td>' + series[series.length - 1].name + '</td>'
                                        + '</tr>';
                                    //表中数据
                                    for (let i = 0, l = axisData.length; i < l; i++) {
                                        table += '<tr>'
                                            + '<td>' + axisData[i] + '</td>';
                                        for (let j = 0; j < series.length - 1; j++) {
                                            table += '<td>' + series[j].data[i] + '</td>';
                                        }
                                        table += '<td>' + series[series.length - 1].data[i] + '</td>'
                                            + '</tr>';
                                    }
                                    table += '</tbody></table>';
                                    return table;
                                }

                            }
                        },
                        magicType: {
                            show: true,
                            type: ['line', 'bar']
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                xAxis: [{
                    type: 'category',
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
                }],
                yAxis: [
                    {type: 'value',minInterval:1}
                ],
                series: []
            },
            getOptionBar: {
                title: {
                    text: '总人数',
                    subtext: '',
                    subtextStyle:{
                        color:'#1775ea',
                        fontWeight:'bold',
                        fontSize:'15px'
                    },
                    x: 'center',
                    y: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)",
                    textStyle: {
                        fontSize: 20
                    }
                },
                color: ['#48cda6', '#fd87ab', '#11abff', '#ffdf33', '#968ade', '#c64fcd', '#202FCD'],
                legend: {
                    orient: 'vertical',
                    x: 'left',
                    data: []
                },
                toolbox: {
                    show: true,
                    right:'20px',
                    feature: {
                        mark: {
                            show: true
                        },
                        dataView: {
                            show: true,
                            readOnly: true,
                            optionToContent: function(opt) {
                                console.log((opt));
                                var axisData = opt.series[0].data;
                                var table = '<table style="width:100%;text-align:left"><tbody><tr>'
                                    + '<th>医院</th>'
                                    + '<th>人数</th>'
                                    + '</tr>';
                                for (var i = 0, l = axisData.length; i < l; i++) {
                                    var value=axisData[i].value==undefined?0:axisData[i].value;
                                    table += '<tr>'
                                        + '<td>' + axisData[i].name + '</td>'
                                        + '<td>' + value + '</td>'
                                        + '</tr>';
                                }
                                table += '</tbody></table>';
                                return table;
                            }
                        },
                        magicType: {
                            show: true,
                            type: ['pie', 'funnel'],
                            option: {
                                funnel: {
                                    x: '25%',
                                    width: '50%',
                                    funnelAlign: 'center',
                                    max: 1548
                                }
                            }
                        },
                        restore: {
                            show: true
                        },
                        saveAsImage: {
                            show: true
                        }
                    }
                },
                calculable: true,
                series: [{
                    name: '数据来源',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    itemStyle: {
                        normal: {
                            label: {
                                show: false
                            },
                            labelLine: {
                                show: false
                            }
                        },
                    },
                    data: []
                }]
            }
        }),
        beforeRouteEnter(to, from, next) {
            //柱形图
            Fills.getHosBar().then((res) => {
                next(vm => {
                    let array = res.data.data.data
//                    console.log(JSON.stringify(res) + ".............." + JSON.stringify(array))
//                    if (res.data.data.data != null && res.data.data.data != '') {
                    if (array != undefined) {
                        vm.year = res.data.data.selectYear;
                        vm.curyear = res.data.data.selectYear;
                        for (let i = 0; i < array.length; i++) {
                            vm.getOptionLine.series.push(array[i]);
                            vm.getOptionLine.legend.data.push(array[i].name)
                        }
                        vm.drawLine()
                    } else {
                        vm.is_show = 1;
                        vm.showYear = res.data.data.selectYear
                    }
                    vm.$nextTick(function () {
                        vm.$store.state.isLoading = false
                    })

                })
            });
        },
        beforeRouteUpdate(to, from, next) {
            this.$store.state.isLoading = false
            this.paging(1, next)
        },
        created: function () {
            //环形图数据
            this._getHosCircle();
            //获取包含年份
            this._getYears();
        },
        mounted() {
            //柱形图
            this.drawLine();
            // 环形图
            this.drawBar();
        },
        methods: {
            queryData() {
                this.getOptionLine.series = [];
                this.getOptionLine.legend.data = [];
                this.getOptionBar.series[0].data = [];
                this.getOptionBar.legend.data = [];
                this._getHosBar();
                this._getHosCircle()
            },
            //柱形图
            drawLine() {
                let myChartLine = document.getElementById('myChartLine');
                if (myChartLine) {
                    let myChart1 = window.echarts.init(myChartLine);
                    myChart1.setOption(this.getOptionLine)
                }
            },
            //环形图
            drawBar() {
                // 基于准备好的dom，初始化echarts实例
                let myChart = document.getElementById('myChart');
                if (myChart) {
                    let myChart2 = window.echarts.init(myChart);
                    // 绘制图表
                    myChart2.setOption(this.getOptionBar);
                }
            },
            //获取柱图数据
            _getHosBar() {
                Fills.getHosBar({year: this.year}).then((res) => {
                    let array = res.data.data.data;
                    if (array != undefined) {
                        this.is_show = 0;
                        this.year = res.data.data.selectYear;
                        this.curyear = res.data.data.selectYear;
                        for (let i = 0; i < array.length; i++) {
                            this.getOptionLine.series.push(array[i]);
                            this.getOptionLine.legend.data.push(array[i].name)
                        }
                    } else {
                        this.is_show = 1;
                        this.showYear = res.data.data.selectYear
                    }
                    this.$nextTick(function () {
                        this.drawLine()
                    })
                })
            },
            //获取环形图数据
            _getHosCircle() {
                Fills.getHosCircle({year: this.year}).then((res) => {
                    let array = res.data.data.data;
                    this.getOptionBar.title.subtext = res.data.data.total;
//                    console.log('res.data.data.total-----',res.data.data.total);
//                    console.log('array-------',array)
                    if (res.data.data.total != 0) {
                        for (let i = 0; i < array.length; i++) {
                            this.getOptionBar.series[0].data.push(array[i]);
                            this.getOptionBar.legend.data.push(array[i].name)
                        }
                    }
                    this.$nextTick(function () {
                        this.drawBar()
                    })
                })
            },
            //获取年份列表
            _getYears() {
                Fills.getYears().then((res) => {
                    this.years = res.data.data
                })
            }
        },
        watch: {
            keyword(v) {
                if (!v && page_backup) { // 已经备份过原始数据, 直接使用跳过查询
                    return this.page = page_backup
                }

                this.loading = 1;
                this.paging_delayed()
            }
        },
        components: {
            Pagination
        }
    }
</script>
