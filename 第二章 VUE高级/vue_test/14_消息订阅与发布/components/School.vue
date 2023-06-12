<template>
    <div class="school">
      <h2 >学校名称: {{name}}</h2>
      <h2>学校地址：{{address}}</h2>
    </div>
  </template>
<script>
//引入消息发布订阅模块
import pubsub from 'pubsub-js'

export default {
    name: 'School',
    data(){
        return {
            name: '湖南工程学院',
            address: '湖南省湘潭市',
        }
    },
    mounted(){
      //订阅消息
      //msg:消息名称
      //data:消息内容
       pubsub.subscribe('studentName',(msg,data)=>{
          console.log("有人发布了消息，执行了回调函数")
          console.log(msg,data)

       })
    },
    beforeDestroy(){
        console.log("School beforeDestroy")
        //取消订阅
        pubsub.unsubscribe('studentName')
    }
}
</script>

<style scoped>
.school {
    background-color: orange;
    padding: 5px;
  }
</style>