<template>
  <ol class="statistic">
    <li v-for="item in recordList" :key="item.tags.tagName">
      <div @click="active(item)" class="list">
       <div class="time">7月8日 周三</div>
        <div class="total">
          <div class="income">
            <span>收入</span>
            <span class="number">333</span>
          </div>
          <div class="pay">
            <span>支出</span>
            <span class="number">222</span>
          </div>

          <div class="triangle" :class="{'selected':actived.indexOf(item)>=0}"></div>
        </div>
      </div>

      <div v-if="actived.indexOf(item)>=0" class="detail">
     
          <router-link
            :to="{name:'detailEdit',params:{
           record:item.tags.tagName
         }}"
            class="detailWrapper"
          >
            <div>11</div>
            <div>21312</div>
          </router-link>
          <router-link
            :to="{name:'detailEdit',params:{
           record:item.tags.tagName
         }}"
            class="detailWrapper"
          >
            <div>读书</div>
            <div class="number">21312</div>
          </router-link>
      </div>
    </li>
  </ol>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Statistics extends Vue {
  actived: String[] = [];
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
   get recordList() {
    return (this.$store.state as RootState).recordList;
  }
    get groupList() {
      const { recordList } = this;
       return [];
    }
   beforeCreate() {
    this.$store.commit("fetchRecords");
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
      a {
        padding: 5px 0px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        font-size: 15px;
        &:nth-last-child(1) {
          border-bottom: none;
        }
      }
    }
  }
}
</style>
