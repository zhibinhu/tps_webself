import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

const store = new Vuex.Store({
    // 定义状态
    state: {
        noticeCount: -1,
        dbVersion:1,
        bones:{}
    }
});

export default store