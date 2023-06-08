<template>
  <div id="app">
    <school></school>
    <student></student>
</div>
</template>

<script>
    //引入组件
    import Student from './components/Student.vue'
    import School from './components/School.vue'
    export default {
        name:"App",
        components:{
            Student,
            School
        }
    }
</script>

<style>
    .demo{
        border:1px solid pink;
        padding:10px;
        margin:10px;
    }
</style>