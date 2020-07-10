<template>
  <div class="Type">
    <div class="left">
        <Icon name="left" />
    </div>
    <div class="types">
      <span class="select">支出</span>
      <span>收入</span>
    </div>
    <div class="right"></div>
  </div>
</template>

<script lang='ts'>
import x from "@/assets/icons/left.svg"; 
console.log(x)
export default {};
</script>

<style scoped lang='scss'>

.Type {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 8px 10px;
  .types {
    padding:2px 5px;
    background: #eee;
    border-radius: 7px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      padding: 5px;
      &.select {
        background: #fff;
        border-radius: 7px;
      }
    }
  }
}
</style>
