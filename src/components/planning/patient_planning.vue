<template>
    <div v-if="isShow == 1">
        <planning-detail :planning="planning" :departments="departments" :parts="parts" :machines="machines"
                         :templates="templates" :templateTargetList="templateTargetList"
                         :templateOrganList="templateOrganList" :nowImageId="nowImageId" :suid="suid"></planning-detail>
    </div>
</template>
<script>
    import planningDetail from './detail.vue';
    import {Planning, User, Docgroup, Machine, PlanningTemplate} from '../../resources.js';

    export default {
        data: () => {
            return {
                planning: {},
                departments: [],
                parts: [],
                machines: [],
                templateTargetList: [],
                templateOrganList: [],
                templates: [],
                isShow: 0,
                suid:'',
                nowImageId:'',
            }
        },
        beforeRouteEnter(to, from, next) {
            let planningId = to.params.id;

            next(vm => {
                User.departments().then(user => {
                    vm.departments = user.data.departments;
                });
                Docgroup.parts().then(docgroup => {
                    vm.parts = docgroup.data.parts;
                });
                PlanningTemplate.templates().then(planningtemplate => {
                    vm.templates = planningtemplate.data.templates;
                })
                Planning.get(planningId).then(planning => {
                    vm.planning = planning.data;
                    vm.nowImageId=planning.data.imageId;
                    vm.suid=to.query.suid;
                    vm.nowImageId=to.query.nowImageId;
                    console.log('nowimageId--------',planning.data)
                  for(var key in vm.planning){
                    if(vm.planning[key]==null){
                      vm.planning[key]='';
                    }
                  }
                    vm.templateTargetList = planning.data.planningTargetList;
                    vm.templateOrganList = planning.data.planningOrganList;
                    Machine.machinesbyplanning(vm.planning.id).then(machine => {
                        vm.machines = machine.data.machines
                        // 默认机器
                        for (let i = 0; i < vm.machines.length; i++) {
                            let machine = vm.machines[i];
                            if (machine.departmentId == vm.planning.departmentId) {
                                vm.planning.machineId = machine.id;
                                break;
                            }
                        }
                    })
                    vm.isShow = 1;
                });


                vm.$nextTick(() => vm.$store.state.isLoading = false)
            })
        },
        components: {planningDetail}
    }
</script>
