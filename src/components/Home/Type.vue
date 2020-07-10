<template>
 <div class="type">
   <div class="pay">
      <div>支出</div>
      <div class="total">111</div>
   </div>
   <div class="income">
       <div>收入</div>
       <div class="total">222</div>

    </div>  
  </div>  
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';
@Component
 export default class Type extends Vue {

 }
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";

.type{
  @extend %fixClear;
   @extend %outShadow;
   display: flex;
   .total{
     font-size: 20px;
    }
  >.pay{
    float: right;
    flex: 1;
    text-align: right;
    padding: 8px;
    border-right: 1px solid ;
    >div:nth-of-type(1){
    font-size: 15px;
    }
  
  }
  >.income{
    padding:8px;
    flex: 1;
    >div:nth-of-type(1){
    font-size: 15px;
    }
   
  }
}
 
</style>
