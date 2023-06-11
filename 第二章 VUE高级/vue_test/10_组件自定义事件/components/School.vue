<template>
    <div class="school">
      <h2 >学校名称: {{name}}</h2>
      <h2>学校地址：{{address}}</h2>
      <button @click="sendSchoolName">把学校名称给App</button>
    </div>
  </template>
<script>
//引入一个混合

export default {
    name: 'School',
    data(){
        return {
            name: '湖南工程学院',
            address: '湖南省湘潭市',
        }
    },
    methods:{
      sendSchoolName(){
        this.$emit("getSchoolName",this.name)
      }
    }
}
</script>

<style scoped>
.school {
    background-color: orange;
    padding: 5px;
  }
</style>