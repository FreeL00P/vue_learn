<template>
    <div class="todo-footer" v-show="total">
        <label>
          <!-- <input type="checkbox" :checked="isAllChecked" @change="checkAllTodos" /> -->
          <input type="checkbox" v-model="isAllChecked" />
        </label>
        <span>
          <span>已完成{{finishCount}}</span> / 全部{{ total }}
        </span>
        <button class="btn btn-danger" @click="clearFinished">清除已完成任务</button>
    </div>
</template>

<script>


export default {
name:"MyFooter",
  props:['todos','checkAll',"clearAllFinished"],
  computed:{
    //计算总数
    total(){
      return this.todos.length
    },
    //计算已完成的个数
    finishCount(){
      return this.todos.reduce((preTotal,todo)=>preTotal+(todo.isFinished?1:0),0)
    },
    //判断是否全选
    isAllChecked:{
      get() {
         return this.finishCount===this.total&&this.total>0
      },
      set(checked) {
        this.$emit("checkAll",checked)
      }
      
    },
  },
  methods:{
     //全选或者全不选
    //  checkAllTodos(e){
    //   //调用App组件的方法
    //   this.checkAll(e.target.checked)
    // }
    clearFinished(){
      //调用App组件的方法
      this.$emit("clearAllFinished")
    }
  }
}
</script>

<style>
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;
}

.todo-footer label {
  display: inline-block;
  margin-right: 20px;
  cursor: pointer;
}

.todo-footer label input {
  position: relative;
  top: -1px;
  vertical-align: middle;
  margin-right: 5px;
}

.todo-footer button {
  float: right;
  margin-top: 5px;
}
</style>