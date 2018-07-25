<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item active">报表管理</li>
            <li class="breadcrumb-item active">系统资源</li>
        </ol>

        <!--在线用户统计-->
        <div class="row">
            <div class="col-md-12">
                <div id="onlineUser" :style="{width: '1080px', height: '290px'}"></div>
            </div>
        </div>
    </div>
</template>
<script>
    import {Fills} from '../../resources'

    export default {
        data: () => ({
            //获取在线用户
            getOptionOnline: {
                title: {
                    text: '服务器同时在线人数',
                    left: '42%',
                    textStyle: {
                        fontSize: 20,
                        fontWeight: 'lighter'
                    }
                },
                tooltip: {
                    trigger: 'axis',
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                color: ['#48cda6', '#fd87ab', '#11abff', '#ffdf33', '#968ade', '#c64fcd', '#202FCD'],
                legend: {
                    bottom: '5px',
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
                                        + '<td>时间</td>';
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
                    data: []
                }],
                yAxis: [
                    {type: 'value',minInterval:1}
                ],
                series: []
            }
        }),
        beforeRouteEnter(to, from, next) {
            Fills.getLoadData({}).then(res => {
                next(vm => {
                    console.log(JSON.stringify(res.data));
                    let resultMap = res.data.data;
                    console.log(JSON.stringify(resultMap));
                    vm.getOptionOnline.xAxis[0].data = resultMap.xAxis;
                    let dataArray = resultMap.data;
                    console.log(dataArray);
                    for (let i = 0; i < dataArray.length; i++) {
                        vm.getOptionOnline.series.push(dataArray[i]);
                        vm.getOptionOnline.legend.data.push(dataArray[i].name);
                    }
                    vm.drawOnline();
                    console.log(vm.getOptionOnline);
                    vm.$nextTick(function () {
                        vm.$store.state.isLoading = false
                    })
                })
            })
        },
        mounted() {
            this.drawOnline();
        },
        methods: {
            drawOnline() {
                let onlineChart = window.echarts.init(document.getElementById('onlineUser'));
                onlineChart.setOption(this.getOptionOnline);
            }
        }
    }
</script>
