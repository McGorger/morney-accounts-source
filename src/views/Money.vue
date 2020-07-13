<template>
<Layout show>
  <Type/>
  <div class="tag">
     <Tags/>
  </div>
  <NumberPad/>
</Layout>
</template>

<script lang='ts'>
import Type from '@/components/Money/Type.vue'
import Tags from '@/components/Money/Tags.vue'
import NumberPad from '@/components/Money/NumberPad.vue'

 export default {
    components:{
       Type,
       Tags,
       NumberPad,
   
    }
 }
</script>

<style scoped lang='scss'>

 .tag{
    flex: 1;
 }
</style>
