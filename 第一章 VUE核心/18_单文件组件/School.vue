<template>
    <!-- 组件的结构 -->
    <div class="demo">
        <h2>学校名称;{{name}}}</h2>
        <p>学校地址{{address}}}</p>
        <button @click="showName">点我显示学校名</button>
    </div>
</template>

<script>
    //组件交互相关的代码（数据方法等）
    //export 暴露组件  
    export default {
        name: "School",
        data(){
            return{
                name:'清华大学',
                address:'北京市海淀区'
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
    border:1px solid #ccc;
    padding:10px;
    margin:10px;
}
</style>