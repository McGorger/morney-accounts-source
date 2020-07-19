<template>
  <div class="tags">
    <Tabs classPrefix="increateTag" data-source="添加类别">
      <Icon
      @click="ok"
       name="success" />
    </Tabs>
    <div class="current">
      <div class="label">
        <span>选中标签:</span>
        <Icon :name="Tag" />
      </div>
      <input type="text" 
       @blur="createTagName"
       maxlength="4"
      placeholder="请最多输入4个字">
    </div>
    <div class="content">
      <div v-for="tagType in currentAllTags " :key="tagType.name" class="food">
        <div class="kind-name">{{ tagType.name }}</div>
        <ul class="main-tags">
          <li
            v-for=" item in tagType.item"
            :key="item"
            @click="selectTag(item)"
            class="main-tags-item"
          >
            <Icon
            
             :class="{selected:item === currentTag}" :name="item" />
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
import allTaglist from "@/constants/allTaglist";
@Component
export default class increateTag extends Vue {
  currentAllTags: newTag[] = [];
  currentTag: string = "";
  tagName:string = "";
  type:string = "";
  get Tag() {
    if (this.currentTag === "") {
      this.currentTag = this.currentAllTags[0].item[0];
    }
    return this.currentTag;
  }
  selectTag(item: string) {
    this.currentTag = item;
  }
  createTagName(e:any){
   this.tagName = e.target.value;
  }
  created() {
    this.type = this.$route.params.type;
    if (this.type === "-") {
      this.currentAllTags = allTaglist.pay;
    } else if (this.type === "+") {
      this.currentAllTags = allTaglist.income;
    }
  }
  ok(){
    if(this.tagName ===''){
      alert('请输入标签名')
    }else{
      this.$store.commit('createTag',{type:this.type,currentTag:this.currentTag,tagName:this.tagName})
   }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/style/helper.scss";
.tags {
  $bg-1: #f7d680;
  $bg-2: #b84e52;
  $bg-3: rgb(68, 4, 4);
  $bg-4: #5079c8;
  $bg-5: #a4d09f;

  .current {
    @extend %outShadow;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px 12px;
    .label {
      display: flex;
      align-items: center;
      .icon {
      width: 30px;
      height: 30px;
      margin-left: 8px;
      color: $bg-1;
      border-radius: 50%;
      padding: 6px;
      border: 1px solid $bg-1;
    }
  
    }
    input{
      text-align: right;
    }
  }
  .content {
    padding: 15px 8px 2px 7px;
    height: 85vh;
    overflow: scroll;
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
        justify-content: flex-start;
        flex-wrap: wrap;
        > li {
          width: 20%;
          text-align: center;
          margin-bottom: 5px;
          &:nth-child(5n + 1) {
            color: $bg-1;
          }
          &:nth-child(5n + 2) {
            color: $bg-2;
          }
          &:nth-child(5n + 3) {
            color: $bg-3;
          }
          &:nth-child(5n + 4) {
            color: $bg-4;
          }
          &:nth-child(5n + 5) {
            color: $bg-5;
          }

          .icon {
            width: 30px;
            height: 30px;
            border-radius: 50%;
            padding: 6px;
            &.selected {
              border: 1px solid ;
              border-color: inherit;
            }
          }
        }
      }
    }
  }
}
</style>
