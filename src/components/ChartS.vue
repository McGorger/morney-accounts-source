<template>
 <div class="wrapper" ref="wrapper"></div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component, Prop, Watch } from "vue-property-decorator";
import echarts, { EChartOption } from 'echarts';
@Component
export default class ChartS extends Vue {
    @Prop() options?:EChartOption;
    @Watch('options',{
      deep: true
    })
    _a(){
      
     if(this.options===undefined){
       return console.error('options 为空');
        }
      const chart = echarts.init(this.$refs.wrapper as HTMLDivElement)
       chart.setOption(this.options);
    }

 }
</script>

<style scoped lang='scss'>
 .wrapper{
   height: 220px;
 }
 
</style>
