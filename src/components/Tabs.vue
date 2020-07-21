<template>
  <div :class="{[classPrefix+'-Tab']:classPrefix}" class="Tab">
    <div @click="goback"
     class="left">
      <slot name="left"></slot>
    </div>
    <div 
    class="tabs">
    <template v-if="classPrefix === 'type'">
      <span 
       v-for="item in dataSource"
          :key="item.value"
      :class="{select:type === item.value}"
       @click="select(item.value)">{{ item.text }}</span>
    </template>
    <div v-else>
        {{ dataSource }}
    </div>
    </div>
    <div class="right">
      <slot name='right'></slot>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import { EventBus } from "@/event-bus.ts";
@Component
export default class Type extends Vue {
     @Prop({required:true,type:[Array,String]}) 
     dataSource!: DataSourceItem[]|string;
     @Prop(String) readonly  classPrefix?: string ;
   type: string = "-";
 select(item:string){
   this.type = item;
   EventBus.$emit('getSelectedStatus',item);
  }
   mounted(){
       EventBus.$on('getSelectedStatus',(res:string)=>{
        this.type =  res;
    })
    }
    goback(){
      this.$router.back();
    }

}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.Tab {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
 &.type-Tab{
  .tabs{
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
    
  } }
  }
 &.increateTag-Tab{
   background: $font-highlight;
   padding: 8px 5px;
   font-weight: bold;
   font-size: 19px;
   border-bottom: 1px solid #eee;
   .icon{
     width: 25px;
     height: 25px;
   }
 }
 }
</style>
