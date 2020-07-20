<template>
  <div class="chart">
    <div class="caption">
      <span>今年</span>
    </div>
    <div class="total">总支出: ¥34712.91</div>
    <div class="average">平均值: ¥4958.98</div>
    <ECharts :options="x" />
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import dayjs from "dayjs";
import { Component } from "vue-property-decorator";
import ECharts from "@/components/ChartS.vue";
@Component({
  components: {
    ECharts
  }
})
export default class StatChart extends Vue {
  get x() {
    return {
      xAxis: {
        type: "category",
        data: ["1", "2", "3", "4", "5", "6", "7 ","8","9","10",
        "11", "12", "13", "14", "15", "16", "17","18","19","20",
        "21", "22", "23", "24", "25", "26", "27","28","29","30"]
      },
      yAxis: {
        type: "value"
      },
      tooltip: {
        show: true
      },
      series: [
        {
          data: [1, 2, 3, 3, 3, 3, 6,6,6,1,
        1, 2, 3, 3, 3, 3, 6,6,6,1,
        1, 2, 3, 3, 3, 3, 6,6,6,0,1,11],
          type: "line"
        }
      ]
    };
  }
}
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
