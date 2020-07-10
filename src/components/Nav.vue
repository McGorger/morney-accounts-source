<template>
  <nav>
    <router-link class="item" to="/home" active-class="selected">
      <Icon name="details" />主页
    </router-link>
    <router-link class="item" to="/Money" active-class="selected">
      <Icon name="money" />记账
    </router-link>
    <router-link class="item" to="/chart" active-class="selected">
      <Icon name="chart" />图标
    </router-link>
  </nav>
</template>

<script lang='ts'>
export default {};
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
nav {
  @extend %outShadow;
  display: flex;
  flex-direction: row;
  font-size: 12px;
  > .item {
    width: 33.3333%;
    padding: 3px;
    display: flex;

    justify-content: center;
    align-items: center;
    flex-direction: column;
    .icon {
      width: 32px;
      height: 32px;
    }
  }
  > .item.selected {
    color: $font-highlight;
  }
}
</style>
