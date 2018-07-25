import {
    XTK_MODEL,
  UPDATE_PATIENTPAGE,
  UPDATE_PATIENT_ALL,
  UPDATE_PATIENT_COUNT,
  UPDATE_TARGETPAGE,
  UPDATE_TARGET_ALL,
  UPDATE_TARGET_COUNT,
  UPDATE_PLANPAGE,
UPDATE_PLANNING_ALL,
  UPDATE_PLANNING_COUNT
} from './mutation-types'

export default {
    //获取xtk文件
    getXtkModel ({commit},{xtkModel}){
        commit(XTK_MODEL,{xtkModel})
    },
    updatePatientPage ({commit},{patientPage}){
        commit(UPDATE_PATIENTPAGE,{patientPage})
    },
    updatePatient_all ({commit},{patient_all}){
        commit(UPDATE_PATIENT_ALL,{patient_all})
    },
    updatePatient_count ({commit},{patient_count}){
        commit(UPDATE_PATIENT_COUNT,{patient_count})
    },
    updateTargetPage ({commit},{targetPage}){
        commit(UPDATE_TARGETPAGE,{targetPage})
    },
    updateTarget_all ({commit},{target_all}){
        commit(UPDATE_TARGET_ALL,{target_all})
    },
    updateTarget_count ({commit},{target_count}){
        commit(UPDATE_TARGET_COUNT,{target_count})
    },
    updatePlanPage ({commit},{planPage}){
        commit(UPDATE_PLANPAGE,{planPage})
    },
    updatePlanning_all ({commit},{planning_all}){
        commit(UPDATE_PLANNING_ALL,{planning_all})
    },
    updatePlanning_count ({commit},{planning_count}){
        commit(UPDATE_PLANNING_COUNT,{planning_count})
    },
}
