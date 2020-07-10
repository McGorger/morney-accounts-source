
<template>
 <div class="layout">
     <div class="content">
            <slot /> 
     </div>
 
     <Nav v-if="isShow"/>
 </div>
</template>

<script lang='ts'>
 import Vue from 'vue';
import {Component,Prop} from 'vue-property-decorator';
@Component
 export default class Layout extends Vue {
    @Prop(String) readonly show?: string ;
    get isShow(){
        return this.show ===undefined?true:false
    }
 }
</script>

<style scoped lang='scss'>
.layout{
    display: flex;
    flex-direction: column;
    min-height: 100vh;
}
.content{
    flex-grow:1;
    display: flex;
    flex-direction: column;
}
 
</style>
