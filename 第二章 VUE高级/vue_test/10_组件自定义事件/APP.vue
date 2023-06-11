<template>
  <div class="app">
    <h1> {{  msg }},{{ schName }},{{ stuName}}</h1>
    <School @getSchoolName="getSchoolName"></School>
    <hr>
   <Student @getStudentName="getStudentName"></Student>
  </div>
</template>

<script>
import Student from './components/Student'
import School from './components/School'
    export default {
        name: 'App',
        components: {
            Student,
            School
        },
        data() {
            return {
                msg: '你好',
                stuName:'',
                schName:''
            }
        },
        methods:{
          getSchoolName(name){
            console.log("APP接受到School的数据",name);
            this.schName=name
          },
          getStudentName(name){
            console.log("APP接受到Student的数据",name);
            this.stuName = name
          } 
        }
    }
</script>

<style>
.app{
  background-color: #ccc;
}
</style>