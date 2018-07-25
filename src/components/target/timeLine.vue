<template>
    <div>
        <ol class="breadcrumb">
            <li class="breadcrumb-item">
                <router-link to="/">首页</router-link>
            </li>
            <li class="breadcrumb-item">
                <router-link to="/target">靶区管理</router-link>
            </li>
            <li class="breadcrumb-item active">靶区勾画进展</li>
        </ol>
        <timeline v-for="(item, index) in items" :key="item.id">


            <timeline-item color="green">
                <h2 class="tl-time">{{item.eventTime}},{{item.type}}</h2>
                <p class="tl-content">
                    操作人：{{item.userName}} {{item.userDepartment}} {{item.userTitle}}
                    <br>
                    {{item.memo}}
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
    import {Target} from '../../resources'

    export default {
        data: () => ({
            items: []

        }),
        beforeRouteEnter(to, from, next) {
            var id = to.params.id;
            Target.gettimeline(id).then(response => {
                next(vm => {
                    console.log(response.data);
                    vm.items = response.data.eventList;
                    vm.items=vm.items.reverse();
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
