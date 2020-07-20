<template>
  <Layout show>
    <Tabs classPrefix="type" :data-source="recordtypeList" >
      <Icon slot="left" name="left" />    
    </Tabs>
    <div class="tag">
      <Tags :currentTag="record.type" @update:value="onUpdateTags" />
          
    </div>
    <NumberPad
      :data-source="recordtypeList"
      @submit="saveRecord"
      :type.sync="record.type"
      :value.sync="record.amount"
      :notes.sync="record.notes"
    />
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordtypeList from "@/constants/recordtypeList";
@Component({
  components: {
    Tags,
    NumberPad
  }
})
export default class Money extends Vue {
  record: RecordItem = {
    tags: { text: "", value: "" },
    notes: "",
    type: "-",
    amount: 0,
    createdAt:new Date().toISOString()
  };
  recordtypeList = recordtypeList;
  onUpdateTags(value: DataSourceItem) {
    this.record.tags = value;
  }
  saveRecord(){
    
      this.$store.commit("createRecord", this.record);
      this.record.notes="";
      alert('添加成功')
  }
}
</script>

<style scoped lang='scss'>
.tag {
  flex: 1;
}
</style>
