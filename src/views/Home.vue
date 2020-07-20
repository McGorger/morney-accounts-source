<template>
 <Layout>
  <Logo/>
  <Type/>
  <Statistics />
</Layout>
</template>

<script lang='ts'>
 import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Logo from '@/components/Home/Logo.vue';
import Type from '@/components/Home/Type.vue';
import Statistics from '@/components/Home/Statistics.vue';
@Component({
  components:{
    Logo,
    Type,
    Statistics
  }
})
 export default class Home extends Vue {
 }
</script>

<style scoped lang='scss'>

 
</style>
