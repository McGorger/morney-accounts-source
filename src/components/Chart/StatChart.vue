<template>
  <div class="chart">
    <div class="caption">
      <span>今年</span>
    </div>
    <div class="total">总支出: ¥34712.91</div>
    <div class="average">平均值: ¥4958.98</div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import dayjs from "dayjs";
import { Component } from "vue-property-decorator";
@Component
export default class StatChart extends Vue {}
</script>

<style scoped lang='scss'>
.chart {
  padding: 6px 0;
  border-bottom: 1px solid #ddd;
  .caption {
    border-bottom: 1px solid #ddd;
    padding: 8px 16px;
    font-size: 14px;
  }
  .total {
    font-size: 14px;
    color: #999;
    text-align: left;
    padding: 6px 6px;
  }
  .average {
    font-size: 12px;
    color: #999;
    text-align: left;
    padding: 0 6px;
    margin-bottom: 16px;
  }
}
</style>
