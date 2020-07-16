<template>
  <div class="tags">
    <Tabs classPrefix="increateTag" data-source="添加类别">
      <Icon name="success" />
    </Tabs>
    <div class="current">
      <div class="label">
        <span>选中标签:</span>
        <Icon name="success" />
      </div>
      <span>数码</span>
    </div>
    <div class="content">
      <div class="food">
        <div class="kind-name">餐饮</div>
        <ul class="main-tags">
          <li class="main-tags-item">
            <Icon name="wine" />
          </li>
        </ul>
      </div>
      <div class="food">
        <div class="kind-name">餐饮</div>
        <ul class="main-tags">
          <li class="main-tags-item">
            <Icon name="hotel" />
          </li>
        </ul>
      </div>
      <div class="food">
        <div class="kind-name">餐饮</div>
        <ul class="main-tags">
          <li class="main-tags-item">
            <Icon name="clothes" />
          </li>
        </ul>
      </div>
      <div class="food">
        <div class="kind-name">餐饮</div>
        <ul class="main-tags">
          <li class="main-tags-item">
            <Icon name="success" />
          </li>
           <li class="main-tags-item">
            <Icon name="success" />
          </li>

           <li class="main-tags-item">
            <Icon name="success" />
          </li>
           <li class="main-tags-item">
            <Icon name="success" />
          </li>
          <li class="main-tags-item">
            <Icon name="success" />
          </li>

          <li class="main-tags-item">
            <Icon name="success" />
          </li>
          <li class="main-tags-item">
            <Icon name="success" />
          </li>
          <li class="main-tags-item">
            <Icon name="success" />
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Icon from "@/components/Icon.vue";
@Component
export default class increateTag extends Vue {}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.tags {
  .current {
    @extend %outShadow;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    .label {
      display: flex;
      align-items: center;
    }
    .icon {
      width: 30px;
      height: 30px;
      margin-left: 8px;
    }
  }
  .content {
    padding: 15px 8px 2px 7px;
    > div {
      display: flex;
      flex-direction: column;
      .kind-name {
        font-size: 14px;
        color: #999;
        margin-bottom: 10px;
        margin-left: 14px;
      }
      .main-tags {
        display: flex;
        align-items: center;
        justify-content: start;
        flex-wrap: wrap;
        > li {
          width: 20%;
          text-align: center;
       // padding:0px 5px;
        //   margin-right: 10px;
          .icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            padding:5px;
            color: red;
          }
        }
      }
    }
  }
}
</style>
