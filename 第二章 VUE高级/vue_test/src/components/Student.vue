<template>
  <div class="student">
    <h1>我是一个{{msg}}</h1>
    <h2>学生姓名:{{ name }}</h2>
    <h2>学生性别：{{sex}}</h2>
    <h2>学生年龄：{{age+1}}</h2>
    <button @click="updateAge">尝试修改年龄</button>
  </div>
</template>

<script>
    export default {
        name: 'Student',
        data() {
            return {
                msg: '学生',
            }
        },
        methods:{
            updateAge(){
                this.age++//vue 不建议直接修改props中的值
            }
        },
        //props:["name", "age", "sex"]//简单声明接受
        
        //接受的同时，进行类型限制
        props:{
            name:{
                type:String,
                required:true,//必须传递
               
            },
            age:{
                type:Number,
                default:99,//默认值
            },
            sex:{
                typeof:String,
                required:true,
            }
        }
    }
</script>

<style>
    .student {
        color: gray;
        background-color: azure;
    }
</style>