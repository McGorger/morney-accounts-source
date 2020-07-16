import Vue from 'vue'
import Vuex from 'vuex'
import clone from '../lib/clone'
Vue.use(Vuex)

 const store =  new Vuex.Store({
  state: {
    recordList: [],
    tagList: {"+":[],"-":[]},
  } as RootState ,
  mutations: {
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = new Date().toISOString() ;
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
  },
})
export default store