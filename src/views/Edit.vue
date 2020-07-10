<template>
  <Layout show>
    <div class="navBar">
      <div class="left">
        <Icon name="left" @click="goBack"/>
      </div>
      <div class="title">
        <div class="iconWrapper">
          <Icon name="money" />
        </div>
        <div>金钱</div>
      </div>
      <div class="right"></div>
    </div>
    <ul class="main">
      <li>
        <span class="name">类型</span>
        <span class="type">支出</span>
      </li>
      <li>
        <label>
          <span class="name">金额</span>
          <input type="text" />
        </label>
      </li>
      <li>
        <label>
          <span class="name">日期</span>
          <input type="text" />
        </label>
      </li>
      <li>
        <label>
          <span class="name">备注</span>
          <input type="text" />
        </label>
      </li>
    </ul>
    <div class="footer">
        <button>编辑完成</button>
        <button>删除</button>
    </div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
@Component
export default class Edit extends Vue {
    goBack(){
        this.$router.push('/home');
    }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.navBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  background: $font-highlight;
  > .left {
    > .icon {
      width: 30px;
      height: 30px;
    }
  }
  > .title {
    > .iconWrapper {
      background: #eee;
      border-radius: 50%;
      padding: 8px;
      margin-bottom: 8px;
      > .icon {
        width: 40px;
        height: 40px;
      }
    }
    > div {
      text-align: center;
    }
  }
}
.main {
  padding: 8px 18px;
  flex-grow:1;
  > li {
    padding: 15px 0;
    border-bottom: 1px solid #eee;
    .name {
        color: grey;
        margin-right: 10px;
      }
    label {
       display: flex;
       align-items: center;
       
      input {
        flex: 1;
        border:none;
        height: 40px;
      }
    }
  }
}
.footer{
    border-top: 1px solid #ddd;
    padding: 0 16px;
    button{
            width: 50%;
    font-size: 14px;
    padding: 4px 0;
    margin: 12px 0;
    &:first-child{
        border-right: 1px solid #ddd;
    }
    &:last-child{
        color: #b84e52;
    }
}
    
}
</style>
