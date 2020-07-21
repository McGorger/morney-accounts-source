<template>
  <div class="chart">
    <div class="caption">
      <span>本{{ this.dateType.text }}</span>
    </div>
    <div class="total">总{{ type==='+'?'收入':'支出'  }}: ¥{{ total }}</div>
    <div class="average">平均值: ¥{{ average }}</div>
    <div class="Echart-wrapper" ref="EchartWrapper">
      <ECharts :dateType="dateType" :options="x" />
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import dayjs from "dayjs";
import { Component, Prop, Watch } from "vue-property-decorator";
import ECharts from "@/components/ChartS.vue";
import _ from "lodash";
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
  total: number = 0;
  average: string = '';
  @Watch("type")
  @Watch("dateType")
  _a() {
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
  }
  get x() {
    const today = new Date();
    const array = [];
    const dateType: any = this.dateType.value;
    let dateChartList = this.recordList.map(r => ({
      createdAt: dayjs(r.createdAt).format("M.D"),
      amount: r.amount
    }));
    const currentDateEndOf = dayjs(new Date()).endOf(dateType);

    if (this.dateType.value === "week") {
      for (let i = 0; i < 7; i++) {
        const date = currentDateEndOf.subtract(i, "day").format("M.D");
        array.push({
          date: date,
          value:
            _.find(dateChartList, {
              createdAt: date
            })?.amount || 0
        });
      }
    } else if (this.dateType.value === "month") {
      for (let i = 0; i < dayjs(today).daysInMonth(); i++) {
        const date = currentDateEndOf.subtract(i, "day").format("M.D");
        array.push({
          date: date,
          value:
            _.find(dateChartList, {
              createdAt: date
            })?.amount || 0
        });
      }
    } else {
      for (let i = 0; i < 12; i++) {
        const date = currentDateEndOf.subtract(i, "month").format("M");
        let dateChartList = this.recordList.map(r => ({
          createdAt: dayjs(r.createdAt).format("M"),
          amount: r.amount
        }));
        array.push({
          date: date,
          value:
            _.find(dateChartList, {
              createdAt: date
            })?.amount || 0
        });
      }
    }
    array.reverse();
    const keys = array.map(item => item.date);
    const value = array.map(item => item.value);
    this.total = value.reduce((sum, item) => {
      return sum + item;
    }, 0);
    this.average =  (this.total/array.length).toFixed(2);
    return {
      grid: {
        left: 0,
        top: 35,
        right: 0,
        height: 160,
        bottom: 0
      },
      xAxis: {
        type: "category",
        data: keys,
        axisTick: {
          alignWithLabel: true
        },
        axisLine: {
          lineStyle: {
            color: "#678"
          }
        }
      },
      yAxis: {
        type: "value",
        show: false
      },
      series: [
        {
          symbol: "circle",
          symbolSize: 8,
          itemStyle: {
            color: "#d3c506",
            borderColor: "#768"
          },
          data: value,
          type: "line"
        }
      ],
      tooltip: {
        show: true,
        triggerOn: "click",
        position: "top",
        formatter: "{c}"
      }
    };
  }
}
</script>

<style scoped lang='scss'>
.chart {
  .Echart-wrapper {
    overflow: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    .echart {
      width: 430%;
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
