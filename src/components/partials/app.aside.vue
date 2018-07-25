<template>
    <div class="app-aside">
        <template v-for="menu in permissionList" style="flex: 1;overflow-y:auto;overflow-x: hidden;">
            <div class="aside-item parent" v-if="menu.children.length>0" v-ripple>
                <div class="aside-item hasChild"><i :class="menu.icon"></i><span>{{menu.text}}</span></div>
                <div class="children">
                    <div class="fold-header">{{menu.text}}</div>
                    <router-link class="aside-item" v-for="c in menu.children" :key="c.code" :to="'/'+c.code" v-ripple.stop><i
                            class="fa fa-caret-right" aria-hidden="true"></i><span v-if="c.text !== '计划模板' && c.text !== '机器模型'">{{c.text}}</span></router-link>
                </div>
            </div>
            <router-link class="aside-item noChild" v-else :to="'/'+menu.code" v-ripple><i
                    :class="menu.icon"></i><span>{{menu.text}}</span></router-link>
        </template>
    </div>
</template>
<script>
    import {Patient, Target, Planning, Permission} from '../../resources';

    export default {
        data() {
            return {
                permissionList: [],
                parts: [],
                page: ''
            }
        },
        methods: {},
        mounted() {
          let this$1 = this;
          let $el = $(this$1.$el);
          Permission.perms().then(response => {
            let permsList = response.data;
            for(let i=0;i<permsList.length;i++){
//              if(permsList[i].text === '日志管理' || permsList[i].text === '数据备份' || permsList[i].text === '病例管理' || permsList[i].text === '工单管理'){
//                permsList.splice(i,1);
//                i--;
//              }
              if(permsList[i].text === '计划申请'){
                Planning.query({status: 100, ps: 3}).then(response => {
                  let planPage = response.data
                  let planning_all = parseInt(planPage.totalCount % planPage.pageSize == 0 ? planPage.totalCount / planPage.pageSize : planPage.totalCount / planPage.pageSize + 1)
                  let planning_count = planPage.totalCount
                  this$1.$store.dispatch('updatePlanPage',{planPage})
                  this$1.$store.dispatch('updatePlanning_all',{planning_all})
                  this$1.$store.dispatch('updatePlanning_count',{planning_count})
                })
              }
              if(permsList[i].text === '病人管理'){
                Patient.query().then(response => {
                  let patientPage = response.data
                  let patient_all = parseInt(patientPage.totalCount % patientPage.pageSize == 0 ? patientPage.totalCount / patientPage.pageSize : patientPage.totalCount / patientPage.pageSize + 1)
                  let patient_count = patientPage.totalCount
                  this$1.$store.dispatch('updatePatientPage',{patientPage})
                  this$1.$store.dispatch('updatePatient_all',{patient_all})
                  this$1.$store.dispatch('updatePatient_count',{patient_count})
                })

              }
              if(permsList[i].text === '靶区勾画'){
                Target.query({status: 100, ps: 3}).then(response => {
                  let targetPage = response.data
                  let target_all = parseInt(targetPage.totalCount % targetPage.pageSize == 0 ? targetPage.totalCount / targetPage.pageSize : targetPage.totalCount / targetPage.pageSize + 1)
                  let target_count = targetPage.totalCount
                  this$1.$store.dispatch('updateTargetPage',{targetPage})
                  this$1.$store.dispatch('updateTarget_all',{target_all})
                  this$1.$store.dispatch('updateTarget_count',{target_count})
                })

              }
            }
            this$1.permissionList = permsList;
            this$1.$nextTick(function () {
              setAsideActiveItem(); //刷新后展示之前的选项
            })
          });

            function activeAncestors($el) {
                var $parent = $el.parent();
                if ($parent.hasClass('parent')) {
                    if ($parent.find('.hasChild').length > 0) {
                        $parent.find('.hasChild').addClass('active');
                    }

                    activeAncestors($parent.parent())
                }
            }

            function setAsideActiveItem() {
                this$1.parts = window.location.href.split('/');
                if (this$1.parts[4]) {
                    this$1.page = this$1.parts[3] + '/' + this$1.parts[4];
                } else {
                    this$1.page = this$1.parts[3] + '/';
                }
                $el.find('a').each(function (i, item) {
                    this$1.page = window.location.href;
                    if (this$1.page === item.href) {
                        var $parent = $(this).parent();
                        $(this).addClass('active');
                        if ($parent.hasClass('children')) {
                            $parent.parent().addClass('opened');
                        }
                        activeAncestors($parent);
                        return false;
                    }
                });

            }

            //绑定监听事件
            $el.on('click.aside', '.aside-item', function (e) {
                var $this = $(this);
                if ($this.hasClass('noChild')) {
                    $el.find('.aside-item.active').removeClass('active');
                    $el.find('.aside-item.parent').removeClass('opened');
                    $this.addClass('active');
                }else if($this.hasClass('parent')) {
                    if($this.hasClass('opened')){
                        $this.removeClass('opened');
                    }else{
                        $el.find('.aside-item.active').removeClass('active');
                        $el.find('.aside-item.parent').removeClass('opened');
                        $this.addClass('opened');
                        $this.find('.aside-item.hasChild').addClass('active');
                    }
                }
            })

        }
    }
</script>
<style>
    .app-aside {
        min-width: 200px !important;
        background-color: #fff !important;
        padding-left: 15px;
        padding-right: 15px;
    }

    .app-aside .aside-item {
        color: #393939 !important;
        border-radius: 23px;
        margin-bottom: 15px;
    }

    .app-aside .aside-item span {
        line-height: 36px !important;
    }

    .app-aside .aside-item.active {
        color: #fff !important;
        border: 0 !important;
        background: #fff !important;
    }

    .app-aside .aside-item:hover {
        background: none !important;
    }

    .app-aside .aside-item.opened {
        background: none !important;
    }

    .app-aside .aside-item.parent:after {
        content: '';
    }

    .app-aside .aside-item.parent .hasChild:after {
        font-family: FontAwesome;
        position: absolute;
        right: 1rem;
        top: 5px;
        content: '\F105';
        -webkit-transition: transform .2s;
        -o-transition: transform .2s;
        transition: transform .2s;
    }

    .app-aside .aside-item.parent.opened .hasChild:after {
        -webkit-transform: rotate(90deg);
        transform: rotate(90deg);
    }

    .app-aside .children {
        background-color: #fff !important;
    }

    .app-aside .hasChild.opened, .app-aside .hasChild.active, .app-aside .noChild.active {
        background-color: #54a0ff !important;
        border: 0 !important;
    }

    .app-aside .aside-item > i {
        background: none !important;
        top: 2px !important;
    }

    .app-aside .aside-item.parent:after {
        top: 5px !important;
    }

    .app-aside .aside-item:hover > i, .app-aside .children .aside-item:hover > span {
        color: #1775ea !important;
    }

    .app-aside .children .aside-item {
        background: none !important;
        margin-bottom: 0px !important;
    }

    .app-aside .children .aside-item.active, .app-aside .children .aside-item.active > i {
        color: #1775ea !important;
    }
</style>
