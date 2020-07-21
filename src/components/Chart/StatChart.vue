<template>
  <div class="chart">
    <div class="caption">
      <span>今年</span>
    </div>
    <div class="total">总支出: ¥34712.91</div>
    <div class="average">平均值: ¥4958.98</div>
    <div class="Echart-wrapper" ref="EchartWrapper">
      <ECharts :options="x" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import dayjs from "dayjs";
import { Component, Prop, Watch } from "vue-property-decorator";
import ECharts from "@/components/ChartS.vue";
@Component({
  components: {
    ECharts
  }
})
export default class StatChart extends Vue {
  @Prop() dateType!: DataSourceItem;
  @Prop() type!: string;
  @Prop() dataSource!: RecordItem[];
  currentDate = new Date().toISOString();
  recordList: RecordItem[] = [];
  @Watch("type")
  @Watch("dateType")
  a() {
    this.recordList = this.dataSource.filter(item => {
      return (
        item.type === this.type &&
        dayjs(item.createdAt).isSame(
          dayjs(this.currentDate),
          this.dateType.value as any
        )
      );
    });
  }
  mounted() {
    this.recordList = this.dataSource.filter(item => {
      return (
        item.type === this.type &&
        dayjs(item.createdAt).isSame(
          dayjs(this.currentDate),
          this.dateType.value as any
        )
      );
    });
    (this.$refs.EchartWrapper as HTMLDivElement).scrollLeft = 9999;
  }
  get x() {
    return {
      grid: {
        left: 0,
        top: 35,
        right: 0,
        height:160,
        bottom:0
      },
      xAxis: {
        type: "category",
        data: [
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "10",
          "11",
          "12",
          "13",
          "14",
          "15",
          "16",
          "17",
          "18",
          "19",
          "20",
          "21",
          "22",
          "23",
          "24",
          "25",
          "26",
          "27",
          "28",
          "29",
          "30"
        ],
        axisTick:{
          alignWithLabel:true
        },
        axisLine:{
        lineStyle:{
          color:'#678'
        }
        }
      },
      yAxis: {
        type: "value",
        show: false
      },
      series: [
    
        {
        symbol:'circle',
        symbolSize:8,
        itemStyle:{
          color:'#d3c506',
          borderColor:'#768'
        },
          data: [
            1,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
            12,
            13,
            14,
            15,
            16,
            17,
            18,
            19,
            20,
            21,
            22,
            23,
            24,
            25,
            26,
            27,
            28,
            29
          ],
          type: "line"
        }
      ],
      tooltip:{
        show:true,triggerOn:'click',
        position:'top',
        formatter:'{c}'
      }
    };
  }
}
</script>

<style scoped lang='scss'>
.chart {
  .Echart-wrapper {
    overflow: auto;
    &::-webkit-scrollbar{
      display:none;
    }
  }
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
  }
}
</style>
