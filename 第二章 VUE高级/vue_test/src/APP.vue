<template>
<div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <MyHeader @addTodo="addTodo"/>
      <MyList :todos="todos" 
      @checkTodo="checkTodo"
      @deleteTodo="deleteTodo"
      />
      <MyFooter :todos="todos" @checkAll="checkAll"
      @clearAllFinished="clearAllFinished"
      />
    </div>
  </div>
</div>
</template>

<script>
    import MyHeader from './components/MyHeader.vue'
    import MyFooter from './components/MyFooter.vue'
    import MyList from './components/MyList.vue'
    export default {
        name: 'App',
        components: {
          MyHeader,
          MyFooter,
          MyList
        },
        data(){
          return {
            todos:[
                {id:1,title:"吃饭",isFinished:false},
                {id:2,title:"睡觉",isFinished:false},
                {id:3,title:"打豆豆",isFinished:true},
            ]
        }
        },
        methods:{
          addTodo(todoObj){
            console.log("我是App组件,我接收到了",todoObj)
            this.todos.unshift(todoObj)
          },
          //取消勾选一个todo
          checkTodo(id){
              this.todos.forEach((item)=>{
                if(item.id===id){
                  item.isFinished=!item.isFinished
                  console.log(item)
                }
              })
          },
          //删除一个todo
          deleteTodo(id){
            console.log("我是App组件,我接收到了",id)
           this.todos=this.todos.filter(item=>item.id!==id)
          },
          //全选或者全不选
          checkAll(checked){
            checked?
            this.todos.forEach(todo=>todo.isFinished=true):
            this.todos.forEach(todo=>todo.isFinished=false)
          },
          //清除所有已完成的
          clearAllFinished(){
            this.todos=this.todos.filter(todo=>!todo.isFinished)
          }
        }
    }
</script>

<style>
/*base*/
body {
  background: #fff;
}

.btn {
  /* display: inline-block; */
  padding: 4px 12px;
  margin-bottom: 0;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.2), 0 1px 2px rgba(0, 0, 0, 0.05);
  border-radius: 4px;
}

.btn-danger {
  color: #fff;
  background-color: #da4f49;
  border: 1px solid #bd362f;
}

.btn-danger:hover {
  color: #fff;
  background-color: #bd362f;
}

.btn:focus {
  outline: none;
}

.todo-container {
  width: 600px;
  margin: 0 auto;
}
.todo-container .todo-wrap {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
}







</style>