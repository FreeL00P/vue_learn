<template>
        <li >
          <label>
            <input type="checkbox" :checked="todo.isFinished" @click="handleCheck(todo.id)" />
            <span v-show="!todo.isEdit"> {{todo.title}}</span>
            <input v-show="todo.isEdit" 
            type="text" 
            :value="todo.title" 
            @blur="handleBlur(todo,$event)"
            ref="InputTitle"/>
          </label>
          <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
          <button v-show="!todo.isEdit"  class="btn btn-edit" @click="handleEdit(todo)">编辑</button>
        </li>
</template>

<script>
//引入消息发布订阅模块
import pubsub from 'pubsub-js'
export default {
    name:"MyItem",
    //声明接受父组件传递过来的数据
    props: ['todo'],
    methods:{
        handleCheck(id){
          //通知App组件，取消勾选一个todo
          //this.$emit("checkTodo",id)
          // this.$bus.$emit("checkTodo",id)
          //发布消息
          pubsub.publish('checkTodo',id)
        } ,
        //删除
        handleDelete(id){
          console.log('click id',id);
          //通知App组件，删除一个todo
          //this.$emit("deleteTodo",id)
          // this.$bus.$emit("deleteTodo",id)
          //发布消息
          pubsub.publish('deleteTodo',id)
        },
        //编辑
        handleEdit(todo){
          //如果已经是编辑状态，就不要再添加isEdit属性了
          if(todo.hasOwnProperty('isEdit')){
             todo.isEdit=true
          }else{
            this.$set(todo,'isEdit',true)
          }
          //让文本框获取焦点 
          //$nextTick()是在下一次DOM更新循环结束之后执行延迟回调
          this.$nextTick(()=>{
            this.$refs.InputTitle.focus()
          })
        },
        //失去焦点回调
        handleBlur(todo,e){
          console.log('失去焦点',todo,e.target.value);
          todo.isEdit=false
          if(e.target.value==todo.title||e.target.value.trim()==''){
            alert('输入的内容不合法')
            e.target.value=todo.title
            return
          }
          this.$bus.$emit('updateTodo',todo,e.target.value)
        }
      }
    }
</script>

<style>
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 5px;
  border-bottom: 1px solid #ddd;
}

li label {
  float: left;
  cursor: pointer;
}

li label li input {
  vertical-align: middle;
  margin-right: 6px;
  position: relative;
  top: -1px;
}

li button {
  float: right;
  display: none;
  margin-top: 3px;
}

li:before {
  content: initial;
}

li:last-child {
  border-bottom: none;
}
li:hover {
  background: #f5f5f5;
}
li:hover button {
  display: block;
}
</style>