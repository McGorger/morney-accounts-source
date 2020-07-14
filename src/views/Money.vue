<template>
<Layout show>
  <Type :data-source="recordtypeList"/>
  <div class="tag">
     <Tags/>
  </div>
  <NumberPad :data-source="recordtypeList" :type.sync="record.type"  :value.sync="record.amount" :notes.sync="record.notes"/>
  {{ record }}
</Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import Type from '@/components/Money/Type.vue'
import Tags from '@/components/Money/Tags.vue'
import NumberPad from '@/components/Money/NumberPad.vue'
import recordtypeList from "@/constants/recordtypeList";
@Component({
   components:{
       Type,
       Tags,
       NumberPad,
    }
})
export default class Money extends Vue {
     record: RecordItem = { tags: [] , notes: "", type: "-", amount: 0 };
     recordtypeList = recordtypeList;
 }
</script>

<style scoped lang='scss'>

 .tag{
    flex: 1;
 }
</style>
