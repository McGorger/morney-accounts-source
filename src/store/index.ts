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
    currentRecord:undefined,
    createTagError:null
  } as RootState ,
  mutations: {
    setTotal(state,value){
      state.total = value;
    },
    setCurrentRecords(state,id){
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
     state.tagList = JSON.parse(window.localStorage.getItem('tagList') || '{"+":[],"-":[]}');
     console.log(state.tagList['-'].length);
      if(state.tagList['-'].length===0){
        console.log(state.tagList['+']);
        store.commit('createTag',{type:'-',currentTag:'wancan',tagName:'晚餐'});
        store.commit('createTag',{type:'-',currentTag:'maicai',tagName:'买菜'});
        store.commit('createTag',{type:'-',currentTag:'clothes',tagName:'衣服'});
        store.commit('createTag',{type:'-',currentTag:'huodong',tagName:'活动'});
        store.commit('createTag',{type:'-',currentTag:'hotel',tagName:'酒店'});
        store.commit('createTag',{type:'-',currentTag:'zuche',tagName:'租车'});
        store.commit('createTag',{type:'-',currentTag:'feiji',tagName:'飞机'});
        store.commit('createTag',{type:'-',currentTag:'ETC',tagName:'ETC'});
        store.commit('createTag',{type:'-',currentTag:'transport',tagName:'交通'});
        store.commit('createTag',{type:'-',currentTag:'shuidian',tagName:'水电'});
        store.commit('createTag',{type:'-',currentTag:'lunchaun',tagName:'轮船'});
        store.commit('createTag',{type:'-',currentTag:'tongxun',tagName:'通讯'});
        store.commit('createTag',{type:'-',currentTag:'kuzi',tagName:'裤子'});
        store.commit('createTag',{type:'-',currentTag:'meirong',tagName:'美容'}); 
        store.commit('createTag',{type:'-',currentTag:'dushu',tagName:'读书'});
      }else if(state.tagList['+'].length===0){
        store.commit('createTag',{type:'+',currentTag:'gongzi',tagName:'工资'});
        store.commit('createTag',{type:'+',currentTag:'waikuai',tagName:'外快'});
        store.commit('createTag',{type:'+',currentTag:'fenhong',tagName:'分红'});
        store.commit('createTag',{type:'+',currentTag:'jianzhi',tagName:'兼职'});
        store.commit('createTag',{type:'+',currentTag:'hongbao',tagName:'红包'});
        store.commit('createTag',{type:'+',currentTag:'jiekuan',tagName:'借款'});
        store.commit('createTag',{type:'+',currentTag:'baoxiao',tagName:'报销'});
        store.commit('createTag',{type:'-',currentTag:'jiangjin',tagName:'奖金'});
        store.commit('createTag',{type:'+',currentTag:'rongyu',tagName:'荣誉'});
      }
    },
    createTag(state,Tag:{type:string,currentTag:string,tagName:string}){
      state.createTagError = null;
      const type = Tag.type as "+"|"-";
      const names = state.tagList[type].map(item => item.tagName)
      if (names.indexOf(Tag.tagName) >= 0) {
        state.createTagError  = new Error('tag name duplicated')
        return;
     }else{
      state.tagList[type].push({tagName:Tag.tagName,currentTag:Tag.currentTag });
      store.commit('saveTags');
     }
    },
    saveTags(state){
      window.localStorage.setItem('tagList', JSON.stringify(state.tagList))
    },
    updateRecord(state,payload:RecordItem){
      const{ tags,id,amount,createdAt,notes} = payload;
      const idList = state.recordList.map(item => item.id)
      const record = state.recordList.filter(item => item.id === id)[0];
              store.commit('saveRecords');
  },
  removeRecord(state,id:string){
    let index = -1
    for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].id ===id ) {
            index = i
            break;
        }
    }
   
    if(index >= 0){
      state.recordList.splice(index, 1);

      store.commit('saveRecords');
       router.back();
    }else{
      window.alert('删除失败');
  }
  
  }
  },
})
export default store