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
    [XTK_MODEL] (state,{xtkModel}){
        state.xtkModel = xtkModel
    },
    [UPDATE_PATIENTPAGE] (state,{patientPage}){
        state.patientPage = patientPage
    },
    [UPDATE_PATIENT_ALL] (state,{patient_all}){
        state.patient_all = patient_all
    },
    [UPDATE_PATIENT_COUNT] (state,{patient_count}){
        state.patient_count = patient_count
    },
    [UPDATE_TARGETPAGE] (state,{targetPage}){
        state.targetPage = targetPage
    },
    [UPDATE_TARGET_ALL] (state,{target_all}){
        state.target_all = target_all
    },
    [UPDATE_TARGET_COUNT] (state,{target_count}){
        state.target_count = target_count
    },
    [UPDATE_PLANPAGE] (state,{planPage}){
        state.planPage = planPage
    },
    [UPDATE_PLANNING_ALL] (state,{planning_all}){
        state.planning_all = planning_all
    },
    [UPDATE_PLANNING_COUNT] (state,{planning_count}){
        state.planning_count = planning_count
    },
}
