<template>
  <div class="Ranking">
    <div class="caption">支出排行榜</div>
    <ul class="recordList">
      <li class="record-item">
        <div class="record-info">
          <Icon name="rice" />
          <span>医生</span>
        </div>
        <div>33%</div>
        <div>33</div>
      </li>
        <li class="record-item">
        <div class="record-info">
          <Icon name="rice" />
          <span>医生</span>
        </div>
        <div>33%</div>
        <div>33</div>
      </li>

    </ul>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import dayjs from "dayjs";
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
@Component
export default class Ranking extends Vue {}
</script>

<style scoped lang='scss'>
.Ranking {
  padding: 6px 16px;
  .caption {
    text-align: left;
    font-size: 14px;
    padding: 6px 0px;
  }
  .recordList {
    padding: 6px 0px;
    .record-item {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: center;
      .record-info {
          display: flex;
          align-items: center;
        .icon {
          margin-right: 5px;
          width: 20px;
          height: 20px;
          padding: 4px;
          background: #eee;
          border-radius: 50%;
        }
      }
    }
  }
}
</style>
