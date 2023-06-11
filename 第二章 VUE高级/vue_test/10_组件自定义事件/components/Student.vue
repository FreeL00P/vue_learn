<template>
    <div class="student">
        <h2 >学生姓名：{{name}}</h2>
        <h2>学生性别：{{sex}}</h2>
        <button @click="sendStudentName">把学生名称给App</button>
        <button @click="unbind">解绑事件</button>
    </div>

</template>

<script>

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
                this.$emit("getStudentName",this.name)
            },
            unbind(){
                //解绑事件
                this.$off("getStudentName")
                //解绑所有事件
                // this.$off()
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