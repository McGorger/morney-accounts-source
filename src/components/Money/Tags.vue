<template>
  <ul class="tags">
    <li v-for="(item,index) in tagList " :key="index" @click="selected(item)" class="tags-item">
      <div :class="{select:item === selectedTag}" class="tags-item-icon">
        <Icon :name="item.currentTag" />
      </div>
      <span>{{ item.tagName }}</span>
    </li>
    <router-link  :to="{name:'editTag',params:{
        type:currentTag
      }}" class="tags-item">
      <div class="tags-item-icon">
        <Icon name="increase" />
      </div>
      <span>增加</span>
    </router-link>
  </ul>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import router from "../../router/index";
@Component
export default class Tags extends Vue {
   @Prop({required:true,type:String}) 
     currentTag!: string;
  Taglist: DataSourceItem[] = [
    { text: "饭卡", value: "rice" },
    { text: "衣服", value: "clothes" },
    { text: "酒水", value: "wine" }
  ];
  get tagList() {
    return this.$store.state.tagList[this.currentTag];
  }
  selectedTag:DataSourceItem =  this.Taglist[0];
  created() {
     this.$store.commit("fetchTags");
     this.$emit("update:value", this.selectedTag);
  }
  selected(item: DataSourceItem) {
    this.selectedTag = item;
   this.$emit("update:value", this.selectedTag);
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.tags {
  display: flex;
  align-content: flex-start;
  overflow: auto;
  padding: 10px;
  flex-direction: row;
  flex-wrap: wrap;
  height: 35vh;
  .tags-item {
    width: 20%;
    padding: 9px 0;
    font-size: 13px;
    display: flex;
    align-items: center;
    flex-direction: column;

    .tags-item-icon {
      width: 38px;
      height: 38px;
      padding: 4px;
      border-radius: 50%;
      background: #f5f5f5;
      margin-bottom: 4px;
      justify-content: center;
      align-items: center;
      display: flex;
      &.select {
        background: $font-highlight;
      }
      .icon {
        width: 23px;
        height: 23px;
      }
    }
  }
}
</style>
