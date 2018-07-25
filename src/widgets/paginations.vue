
<template>
  <div class="page-bar" style="margin-bottom: 40px">
    <ul>
      <li><a :class="setButtonClass(0)" v-on:click="prvePage(curIndex)" id="frontYeMa">上一页</a></li>
      <li v-for="index in indexs"  v-bind:class="{ active: curIndex == index }" :id="'yema'+index"  >
        <a v-on:click="btnClick(index)">{{ index < 1 ? "..." : index }}</a>
      </li>
      <li><a :class="setButtonClass(1)" v-on:click="nextPage(curIndex)" id="nextYeMa">下一页</a></li>
      <li>
        <a style="color:black" v-if="all>0 && count>0">共{{all}}页,{{count}}条数据</a>
        <a style="color:#999;" v-else>共{{all}}页,{{count}}条数据</a>
      </li>
    </ul>
    <input type="hidden" id="activedYeMa" v-model="activedYeMa"/>
  </div>
</template>

<script>
    export default {
        props: ['cur', 'all',"count","curIndex_s","pageNumChange"],
        data() {

            return{
                curIndex: 1,
                operation:0,
                curIndex_a:this.curIndex_s,
                activedYeMa:0
            };

        },
        created(){

        },
        computed: {
            indexs: function () {
                if(this.operation == 1) {
                    this.curIndex = this.curIndex_a
                }else {
                    this.curIndex = this.curIndex_s
                }

                var left = 1;
                var right = this.all;
                var ar = [];
                if (this.all >= 6) {
                    if (this.curIndex > 2 && this.curIndex < this.all - 2) {
                        left = this.curIndex - 2;
                        right = this.curIndex + 3;
                    } else {
                        if (this.curIndex <= 2) {
                            left = 1;
                            right = 6;
                        } else {
                            right = this.all;
                            left = this.all - 5;
                        }
                    }
                }
                while (left <= right) {
                    ar.push(left);
                    left++;
                }
                if (ar[0] > 1) {
                    ar[0] = 1;
                    ar[1] = -1;
                }
                if (ar[ar.length - 1] < this.all) {
                    ar[ar.length - 1] = this.all;
                    ar[ar.length - 2] = 0;
                }
                this.operation=0;
                var needForeach = this.pageNumChange;
                return ar;
            }
        },
        methods: {
            // 页码点击事件
            btnClick: function (data) {
                if (data < 1) return;
                if (data != this.curIndex) {
                    this.curIndex = data;
                    this.curIndex_a=data
                    this.operation=1
                    this.activedYeMa=data
                    this.$emit('listen', data);
//                    console.log(JSON.stringify(data))
//                    console.log(JSON.stringify(this.curIndex))
//                    let check_yema="yema"+data
//                    let yemaId=document.getElementById(check_yema)
//                    yemaId.setAttribute("class","active")
                }
                $(".active").removeClass("active");
            },
            // 下一页
            nextPage: function (data) {
                if (this.curIndex >= this.all) return;
                this.btnClick(this.curIndex + 1);
            },
            // 上一页
            prvePage: function (data) {
                if (this.curIndex <= 1) return;
                this.btnClick(this.curIndex - 1);
            },
            // 设置按钮禁用样式
            setButtonClass: function (isNextButton) {
                if (isNextButton) {
                    return this.curIndex >= this.all ? "page-button-disabled" : "";
                }
                else {
                    return this.curIndex <= 1 ? "page-button-disabled" : "";
                }
            }

        }

    }
</script>

<style lang="scss">
  ul, li {margin: 0px;padding: 0px;}
  .page-bar {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .page-button-disabled {
    color:#ddd !important;
  }
  .page-bar li {
    list-style: none;
    display: inline-block;
  }
  .page-bar li:first-child > a {
    margin-left: 0px;
  }
  .page-bar a {
    border: 1px solid #ddd;
    text-decoration: none;
    position: relative;
    float: left;
    padding: 4px 10px;
    margin-left: -1px;
    line-height: 1.42857143;
    color: #337ab7;
    cursor: pointer;
  }

  .page-bar a:hover {
    background-color: #eee;
  }

  .page-bar .active a {
    color: #fff;
    cursor: default;
    background-color: #337ab7;
    border-color: #337ab7;
  }

  .page-bar i {
    font-style: normal;
    color: #d44950;
    margin: 0px 4px;
    font-size: 12px;
  }
</style>