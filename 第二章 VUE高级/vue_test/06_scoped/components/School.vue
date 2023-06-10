<template>
    <div class="demo">
      <h2 >学校名称: {{name|mySlice}}</h2>
      <h2>学校地址：{{address}}</h2>
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
}
</script>

<style scoped>
.demo {
    background-color: orange;
  }
</style>