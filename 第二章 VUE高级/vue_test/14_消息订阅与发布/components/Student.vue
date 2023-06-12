<template>
    <div class="student">
        <h2 >学生姓名：{{name}}</h2>
        <h2>学生性别：{{sex}}</h2>
        <button @click="sendStudentName">把学生名称给School</button>
    </div>

</template>

<script>
//引入消息发布订阅模块
import pubsub from 'pubsub-js'
    export default {
        name: 'Student',
        data() {
            return {
                name: '张三',
                sex: '男',
            }
        },
        methods:{
            sendStudentName(){
               pubsub.publish('studentName',this.name) 
            }
        }
    }
</script>

<style scoped>
.student{
    background-color: skyblue;
    padding: 5px;
    margin-top: 30px;
}
</style>