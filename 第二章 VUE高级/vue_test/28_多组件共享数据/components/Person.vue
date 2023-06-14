<template>
  <div>
        <h2>人员列表</h2>
        <h3>上方组件求和为{{sum}}</h3>
        <input type="text" placeholder="请输入名字" v-model="name">
        <button @click="add">添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">{{  p.name}}</li>
        </ul>
  </div>
</template>

<script>
import {mapState} from 'vuex'
import { nanoid } from 'nanoid'
export default {
    name: 'Person',
    data() {
        return {
            name:''
        }
    },
    computed:{
        ...mapState(['personList','sum'])
    },
    methods: {
        add(){
            const p={id:nanoid(),name:this.name}
            console.log("添加",p)
            this.$store.commit('ADD_PERSON',p)
        }
    }   
}
</script>

<style>

</style>