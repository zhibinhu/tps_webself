<template>
    <div v-if="isShow == 1">
        <edit :patient="patient" :doctor="doctors" :startTime="startTime" :isLocal="isLocal"></edit>
    </div>
</template>
<script>
    import edit from './edit.vue';
    import {Patient,User} from '../../resources.js';

    export default {
        data: () => {
            return {
                patient: {},
                isLocal:1,
                isShow: 0,
                doctors: [],
                startTime: {
                    time: ''

                }
            }
        },
        beforeRouteEnter(to, from, next) {
            let patientId = to.params.id;
            next(vm => {
                Patient.get(patientId).then(res => {
                    let birthda = res.data.birthday;
                    if (birthda != null && birthda != '') {
                        let birthdaies = birthda.substring(0, 11);
                        res.data.birthday = birthdaies
                    }
                    vm.patient = res.data;
                    vm.doctors = [{id: vm.patient.docId, userName: vm.patient.doctor}];
                    console.log(res.data)
                    User.doctors(vm.patient.departmentId).then(response => {
                        let docIds = response.data.doctors;
                        if (vm.patient.docId == undefined){
                            vm.patient.docId = docIds[0].id;
                        }
                    })

                    vm.startTime.time = res.data.birthday;
                    vm.isShow = 1;
                    User.departments().then(user => {
                        //上级医生查看下级病人时，隐藏提交按钮
                        if (User.current().roleId == -1 || user.data.departments[0].id != res.data.departmentId) {
                            vm.isLocal = 0;
                        }
                    })
                })

                vm.$nextTick(() => vm.$store.state.isLoading = false)
            });
        },
        components: {edit}
    }
</script>
