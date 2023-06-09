<template>
    <div class="demo">
        <h2>学生名称：{{name}}</h2>
        <h2>学生年龄：{{age}}</h2>       
    </div>
</template>

<script>
    //组件交互相关的代码（数据方法等）
    //export 暴露组件  
    export default {
        name: "Student",
        data(){
            return{
                name:'Freedom of the mind',
                address:'Democracy of the soul'
            }
        },
        methods:{
            showName(){
                alert(this.name)
            }
        }
    }
    
</script>
<style>
/* 组件的样式 */
.demo{
    border:1px solid palegreen;
    padding:10px;
    margin:10px;
}
</style>