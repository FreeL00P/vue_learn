<template>
        <li >
          <label>
            <input type="checkbox" :checked="todo.isFinished" @click="handleCheck(todo.id)" />
            <span> {{todo.title}}</span>
          </label>
          <button class="btn btn-danger" @click="handleDelete(todo.id)">删除</button>
        </li>
</template>

<script>
export default {
    name:"MyItem",
    //声明接受父组件传递过来的数据
    props: ['todo','checkTodo','deleteTodo'],
    methods:{
        handleCheck(id){
          //通知App组件，取消勾选一个todo
          this.checkTodo(id)
        } ,
        //删除
        handleDelete(id){
          //通知App组件，删除一个todo
          this.deleteTodo(id)
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