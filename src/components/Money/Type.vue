<template>
  <div class="Type">
    <div class="left">
      <Icon name="left" />
    </div>
    <div class="types">
      <span 
       v-for="item in dataSource"
          :key="item.value"
      :class="{select:type === item.value}"
       @click="select(item.value)">{{ item.text }}</span>
      
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { EventBus } from "@/event-bus.ts";
@Component
export default class Type extends Vue {
     @Prop({required:true,type:Array}) 
     dataSource!: DataSourceItem[];
   type: string = "-";
  select(item:string){
   this.type = item;
   console.log(this.type)
   EventBus.$emit('getSelectedStatus',item);
  }
   mounted(){
        this.getSelectedStatus();
    }
  getSelectedStatus(){
    EventBus.$on('getSelectedStatus',(res:string)=>{
        this.type =  res;
    })
  }
}
</script>

<style scoped lang='scss'>
.Type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  .types {
    padding: 2px 5px;
    background: #eee;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      padding: 5px;
      &.select {
        background: #fff;
        border-radius: 7px;
      }
    }
  }
}
</style>
