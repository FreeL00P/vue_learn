<template>
  <div >
   <button @click="getStudent">点击获取学生信息</button>
  </div>
</template>

<script>
  import axios from 'axios'
	export default {
		name:'App',
    methods:{
      getStudent(){
        axios.get('http://127.0.0.1:8081/student/all').then(
          response => {console.log('成功了',response.data)},
          error => {console.log('失败了',error)}
        )
      },
    }
    
	}
        
</script>
