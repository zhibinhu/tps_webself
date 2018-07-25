<template>
    <div v-if="isShow == 1">
        <target-detail :target="target" :nowImageId="nowImageId" :departments="departments" :parts="parts" :suid="suid"></target-detail>
    </div>
</template>
<script>
    import targetDetail from './detail.vue';
    import {Target, User, Docgroup} from '../../resources.js';

    export default {
        data: () => {
            return {
                target: {},
                departments: [],
                parts: [],
                isShow: 0,
                nowImageId:'',//影像ID
                suid:'',//查看影响id
            }
        },
        beforeRouteEnter(to, from, next) {
            let targetId = to.params.id;
            next(vm => {
                User.departments().then(user => {
                    vm.departments = user.data.departments;
                });
                Docgroup.parts().then(docgroup => {
                    vm.parts = docgroup.data.parts;
                });
                Target.get(targetId).then(target => {
                    vm.target = target.data;
                    vm.nowImageId=target.data.imageId;
                    vm.isShow = 1;
                    vm.suid=to.query.suid;
                    console.log('vm.suid----------',vm.suid);
                    console.log('target==========',target.data);
                });


                vm.$nextTick(() => vm.$store.state.isLoading = false)
            })
        },
        components: {targetDetail}
    }
</script>
