<template>
  <div>
        <h2>人员列表</h2>
        <h3>上方组件求和为{{sum}}</h3>
        <h3>列表中第一个人的名字是{{firstPersonName}}</h3>
        <input type="text" placeholder="请输入名字" v-model="name">
        <button @click="addWang">添加</button>
        <ul>
            <li v-for="p in personList" :key="p.id">{{  p.name}}</li>
        </ul>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'	

import { nanoid } from 'nanoid'
export default {
    name: 'Person',
    data() {
        return {
            name:''
        }
    },
    computed:{
        //获取countAbout下的sum
        ...mapState('countAbout',['sum']),
        ...mapState('personAbout',['personList']),
        firstPersonName(){
            return this.$store.getters['personAbout/firstPersonName']
        }
    },
    methods: {
        add(){
            const p={id:nanoid(),name:this.name}
            //联系personAbout下的mutations 里的ADD_PERSON
            this.$store.commit('personAbout/ADD_PERSON',p)
        },
        addWang(){
            const p={id:nanoid(),name:this.name}
            //联系personAbout下的actions 里的addWang
            this.$store.dispatch('personAbout/addWang',p)
        }
    }   
}
</script>

<style>

</style>