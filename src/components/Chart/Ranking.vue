<template>
  <div class="Ranking">
   <div class="caption">{{ this.type==='-'?'支出':'收入' }}排行榜</div>
    <ul 
    v-if="recordList.length"
    class="recordList">
      <li
     v-for=" item in recordList"
     :key="item.id"
       class="record-item">
        <div class="record-info">
          <Icon name="rice" />
          <span>{{item.tags.tagName }}</span>
        </div>
        <div>{{ percentage(item.amount) }}</div>
        <div>{{item.amount }}</div>
      </li>
    </ul>
    <Noting v-else/>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import dayjs from "dayjs";
import { Component, Prop, Watch } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
import Layout from '../Layout.vue';
@Component
export default class Ranking extends Vue {
  @Prop() dateType!:DataSourceItem
  @Prop() type!:string
  @Prop() dataSource!:RecordItem[]
  currentDate = new Date().toISOString();
  recordList:RecordItem[] =[]
  @Watch('type')
  @Watch('dateType')
  a(){
      this.recordList =   this.dataSource.filter(item=>{
      return item.type === this.type && dayjs(item.createdAt).isSame(dayjs(this.currentDate),this.dateType.value as any)
     })
  }
  percentage (value:number) {
   const total = this.recordList.reduce((sum, item)=>{
       return  sum + item.amount
    },0)

    return (value/total*100).toFixed(2) +'%'
  }
  mounted(){
   this.recordList =   this.dataSource.filter(item=>{
      return item.type === this.type && dayjs(item.createdAt).isSame(dayjs(this.currentDate),this.dateType.value as any)
     })
  }
  
  
}
</script>

<style scoped lang='scss'>
::v-deep .notingRecord{
  padding:20px;
   .icon{
    width: 50px;
    height: 50px;
  }
  span{
    margin-top: 10px;
  }
}
.Ranking {
  padding: 6px 16px;
  overflow: scroll;
  max-height: 30vh;
  .caption {
    text-align: left;
    font-size: 14px;
    padding: 6px 0px;
  }
  .recordList {
    padding: 6px 0px;
    .record-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      >div{
        width: 30%;
      }
      .record-info {
          display: flex;
          align-items: center;
          justify-content: flex-start;
        .icon {
          margin-right: 5px;
          width: 20px;
          height: 20px;
          padding: 4px;
          background: #eee;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
