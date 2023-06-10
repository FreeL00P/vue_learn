<template>
    <div class="demo">
      <h2 @click="showName">学校名称: {{name|mySlice}}</h2>
      <h2>学校地址：{{address}}</h2>
      <hr>
    </div>
  </template>
<script>
//引入一个混合

export default {
    name: 'School',
    data(){
        return {
            name: '北京1大学atguigu',
            address: '北京市海淀区',
        }
    },

  
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