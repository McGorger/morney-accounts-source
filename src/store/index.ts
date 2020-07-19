import Vue from 'vue'
import Vuex from 'vuex'
import clone from '../lib/clone'
import router from '@/router/index.ts';
import createId from '../lib/idCreator';
Vue.use(Vuex)

 const store =  new Vuex.Store({
  state: {
    recordList: [],
    tagList: {"+":[],"-":[]},
    total:{totalIncome:0,paytotal:0},
    currentRecord:undefined
  } as RootState ,
  mutations: {
    setTotal(state,value){
      state.total = value;
    },
    setCurrentRecords(state,id){
      console.log(id)
      state.currentRecord = state.recordList.filter(t => t.id === id)[0];
    },
    fetchRecords(state) {
      state.recordList = JSON.parse(window.localStorage.getItem('recordList') || '[]') as RecordItem[]
    },
    createRecord(state, record: RecordItem) {
      const record2: RecordItem = clone(record);
      record2.createdAt = record2.createdAt || new Date().toISOString() ;
      record2.id = createId().toString();
      state.recordList.push(record2);
      store.commit('saveRecords');
    },
    saveRecords(state) {
      window.localStorage.setItem('recordList', JSON.stringify(state.recordList))
    },
    fetchTags(state) {
      return state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '[]')
    },
    createTag(state,Tag){
      const type = Tag.type as "+"|"-";
      const names = state.tagList[type].map(item => item.tagName)
      if (names.indexOf(Tag.tagName) >= 0) {
        window.alert('标签名重复了');
        return 'duplicated';
     }else{
     
      state.tagList[type].push({tagName:Tag.tagName,currentTag:Tag.currentTag });
      store.commit('saveTags');
      window.alert('添加成功');
      router.push('/Money')
      return 'success';
     }
    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    }
  },
})
export default store