<template>
  <Layout>
  <div class="topBar">
    <Tabs classPrefix="type" :data-source="recordtypeList" />
      <ul class="tab-bar">
      <li
      v-for=" item in dataTime"
      :key="item"
      :class="{selected:item === select}"
      @click="active(item)"
      >{{ item }}</li>
    </ul>
    </div>
   <StatChart/>
   <Ranking/> 
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component} from "vue-property-decorator";
import StatChart from "@/components/Chart/StatChart.vue";
import Ranking from "@/components/Chart/Ranking.vue";
import recordtypeList from "@/constants/recordtypeList";
import dataTime from "@/constants/dataTime";
import { EventBus } from "@/event-bus.ts";
@Component({
    components:{
        StatChart,
        Ranking
    }
})
export default class Chart extends Vue {
  recordtypeList = recordtypeList;
  dataTime = dataTime;
  select:string = dataTime[0];
  type:string = '-'
  active(item:string){
   this.select =  item;
  }
  mounted(){
       EventBus.$on('getSelectedStatus',(res:string)=>{
        this.type =  res;
    })
    }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
 ::v-deep .type-Tab .tabs span {
     color: grey;
     background:$font-highlight ;
     border-radius: 3px;
    } 
.topBar{
    background: $font-highlight;
   
.tab-bar{
    display: flex;
    padding: 10px;
    align-items: center;
    justify-content: center;
    li{
        width: 33.33%;
        text-align: center;
        border:1px solid black;
        padding: 2px 0;
        &.selected{
            background: black;
            color:$font-highlight;
        }
        &:first-child{
            border-top-left-radius: 2px;
            border-bottom-left-radius: 2px;
        }
        &:last-child{
            border-top-right-radius: 2px;
            border-bottom-right-radius: 2px;
        }
        &:nth-of-type(2){
        border-left: none;
        border-right: none;
        }
    }
}
}
</style>
