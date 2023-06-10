<template>
    <div class="demo">
      <h2 @click="showName">学校名称: {{name}}</h2>
      <h2>学校地址：{{address}}</h2>
      <hr>
    </div>
  </template>
<script>
//引入一个混合
import {mixin} from '../mixin'
export default {
    name: 'School',
    data(){
        return {
            name: '北京大学',
            address: '北京市海淀区',
        }
    },
    // methods:{
    //     showName(){
    //         alert(this.name)
    //     }
    // },
    mixins:[mixin],
    mounted(){
        console.log('school mounted')
    }
}
</script>

<style>
.demo {
    background-color: #f5f5f5;
  }
</style>