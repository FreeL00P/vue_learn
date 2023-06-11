<template>
    <div class="school">
      <h2 >学校名称: {{name}}</h2>
      <h2>学校地址：{{address}}</h2>
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
    mounted(){
      console.log("School mounted",this)
      //接收学生的名称
      this.x.$on("getStudentName",(data)=>{
        console.log("School接收到了学生的名称",data)
      })   
    },
    beforeDestroy(){
        console.log("School beforeDestroy")
        this.$bus.$off("getStudentName")
    }
}
</script>

<style scoped>
.school {
    background-color: orange;
    padding: 5px;
  }
</style>