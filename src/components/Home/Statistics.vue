<template>
  <ol v-if="recordList.length" class="statistic">
    <li v-for="(group,index) in groupList" :key="index">
      <div @click="active(group.title)" class="list">
        <div class="time">{{ beautify(group.title) }}</div>
        <div class="total">
          <div v-if="!(group.incomeTotal === 0)" class="income">
            <span>收入</span>
            <span class="number">{{ group.incomeTotal }}</span>
          </div>
          <div v-if="!(group.payTotal === 0)" class="pay">
            <span>支出</span>
            <span class="number">{{ group.payTotal }}</span>
          </div>

          <div class="triangle" :class="{'selected':actived.indexOf(group.title)>=0}"></div>
        </div>
      </div>

      <div v-if="actived.indexOf(group.title)>=0" class="detail">
        <router-link
          v-for=" (item,index) in  group.items"
          :key="index"
          :to="{name:'detailEdit',params:{
           id:item.id
         }}"
          class="detailWrapper"
        >
          <div class="detailTag">
            <Icon :name="item.tags.currentTag" />
            <div class="tagName">
              <span>{{ item.tags.tagName }}</span>
              <span>{{ item.notes }}</span>
            </div>
          </div>
          <div :class="{income:item.type==='+'}">{{ item.amount }}</div>
        </router-link>
      </div>
    </li>
  </ol>
  <div class="notingRecord" v-else>
    <Icon name="noting"/>
    <span>暂无账目记录</span> 
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import dayjs from "dayjs";
import clone from "@/lib/clone";
import { EventBus } from "@/event-bus.ts";
@Component
export default class Statistics extends Vue {
  actived: String[] = [];
  recordList: RecordItem[] = [];
  created() {
    this.actived = JSON.parse(window.localStorage.getItem("actived") || "[]");
      EventBus.$on("getIsoString", (res: string) => {
      this.recordList = (this.$store.state as RootState).recordList.filter(
        item => dayjs(item.createdAt).format("YYYY-MM") === res
      );
    });
  }
  @Watch('recordList')
  setTotal(){
    if(this.recordList.length ===0){
      this.$store.commit('setTotal ',{totalIncome:0,paytotal:0});
    }
  }
  beforeDestroy() {
    console.log("组件消失");
    window.localStorage.setItem("actived", JSON.stringify(this.actived));
  }
  active(item: String) {
    if (this.actived.indexOf(item) >= 0) {
      this.actived.forEach((i, index) => {
        if (i === item) {
          this.actived.splice(index, 1);
        }
      });
    } else {
      this.actived.push(item);
    }
  }

  get groupList() {
    const { recordList } = this;
    if (recordList.length === 0) return [];
    type HashTableValue = { title: string; items: RecordItem[] };
    type result = {
      title: string;
      incomeTotal?: number;
      payTotal?: number;
      items: RecordItem[];
    }[];
    const newList = clone(recordList).sort(
      (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
    );
    const result: result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]]
      }
    ];
    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current]
        });
      }
    }

    result.map(group => {
      group.incomeTotal = group.items
        .filter(item => item.type === "+")
        .reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
      group.payTotal = group.items
        .filter(item => item.type === "-")
        .reduce((sum, item) => {
          return sum + item.amount;
        }, 0);
    });
    const totalIncome = result.reduce((sum, item) => {
      return sum + item.incomeTotal!;
    }, 0);
    const paytotal = result.reduce((sum, item) => {
      return sum + item.payTotal!;
    }, 0);
    this.$store.commit("setTotal", { totalIncome, paytotal });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(new Date(), "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.statistic {
  height: 50vh;
  overflow: scroll;
  > li {
    padding: 10px 5px 0 5px;
    > .list {
      display: flex;
      align-items: center;
      justify-content: space-between;
      position: relative;
      &::after {
        content: "";
        display: block;
        width: 97%;
        height: 1px;
        background-color: $font-highlight;
        position: absolute;
        bottom: 12%;
      }
      > .time {
        font-size: 12px;
        padding-bottom: 1px;
        margin-bottom: 2px;
        border: 1px solid $font-highlight;
        border-radius: 4px;
        border-bottom: none;
        padding: 4px;
        color: $font-highlight;
      }
      > .total {
        display: flex;
        align-items: center;
        color: grey;
        margin-right: 25px;
        font-size: 12px;
        > .income {
          margin-right: 5px;
        }
        > .triangle {
          position: absolute;
          top: 30%;
          right: 0%;
          border: 8px solid transparent;
          border-bottom-color: $font-highlight;
          &.selected {
            position: absolute;
            top: 55%;
            right: 0%;
            border: 8px solid transparent;
            border-top-color: $font-highlight;
          }
        }
      }
    }
    > .detail {
      .detailWrapper {
        padding: 5px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        font-size: 15px;
        .income {
          color: $font-highlight;
        }
        .detailTag {
          display: flex;
          align-items: center;
          .tagName {
            display: flex;
            flex-direction: column;
            span:last-child {
              font-size: 12px;
              color: rgb(155, 155, 155);
            }
          }
          .icon {
            background: grey;
            margin-right: 5px;
            border-radius: 50%;
            padding: 4px;
            color: #eeeeee;
            vertical-align: middle;
          }
        }

        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
    }
  }
}
.notingRecord{
  padding:30px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .icon{
    width: 100px;
    height: 100px
  }
  span{
    margin-top: 20px;
  }

}
</style>
