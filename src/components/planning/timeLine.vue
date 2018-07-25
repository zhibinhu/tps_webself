<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/planning">计划申请</router-link>
            </li>
            <li class="breadcrumb-item active">计划进展</li>
        </ol>
        <h2 class="title">计划设计</h2>
        <timeline v-for="(item, index) in items1" :key="item.id">

            <timeline-item color="green">
                <h2 class="tl-time">{{item.eventTime}},{{item.type}}</h2>
                <p class="tl-content">
                    <span v-if="item.memo" style="display:block;">{{item.memo}}</span>
                    操作人：{{item.userName}} {{item.userDepartment}} {{item.userTitle}}

                </p>
            </timeline-item>

        </timeline>
        <h2 class="title">靶区勾画</h2>
        <timeline v-for="(item, index) in items2" :key="item.id">

            <timeline-item color="green">
                <h2 class="tl-time">{{item.eventTime}},{{item.type}}</h2>
                <p class="tl-content">
                    <span v-if="item.memo" style="display:block;">{{item.memo}}</span>
                    操作人：{{item.userName}} {{item.userDepartment}} {{item.userTitle}}
                </p>
            </timeline-item>

        </timeline>

        <div class="px-3" style="margin-top: 6px;">
            <a class="btn btn-info rounded mr-2" href="javascript:history.back()"><i
                    class="fa fa-arrow-circle-left"></i> 返回</a>
        </div>
    </div>
</template>

<script>
    import timeline from 'pzvue-timeline'
    import {Planning} from '../../resources'

    export default {
        data: () => ({
            items1: [],
            items2: []
        }),
        beforeRouteEnter(to, from, next) {
            var id = to.params.id;
            Planning.gettimeline(id).then(response => {
                next(vm => {
                    vm.items1 = response.data.planningList;
                    vm.items2 = response.data.targetList;
//                    console.log('haha====',response.data.targetList);
                    vm.items1=vm.items1.reverse();
                    vm.items2=vm.items2.reverse();
                    vm.$nextTick(() => vm.$store.state.isLoading = false)
                })
            })
        },
        methods: {},
        components: {
            "timeline": timeline,
            "timeline-item": timeline.item,
        }
    }
</script>
<style>
    .pz-timeline{min-height:50px;}
</style>
