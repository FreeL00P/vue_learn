//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
//准备actions——用于响应组件中的动作
const actions = {
    increment(context,value){
        console.log('actions中的increment被调用了',context,value)
        context.commit('INCREMENT',value)
    },
    decrement(context,value){
        console.log('actions中的decrement被调用了',context,value)
        context.commit('DECREMENT',value)
    },
    incrementOdd(context,value){
        console.log('actions中的incrementOdd被调用了',context,value)
        if(context.state.sum % 2){
            context.commit('INCREMENT',value)
        }
    },
    incrementWait(context,value){
        console.log('actions中的incrementWait被调用了',context,value)
        setTimeout(() => {
            context.commit('INCREMENT',value)
        }, 500);
    }
}
//准备mutations——用于操作数据（state）
const mutations = {
    INCREMENT(state,value){
        console.log('mutations中的INCREMENT被调用了',state,value)
        state.sum += value
        console.log(state.sum)
    },
    DECREMENT(state,value){
        console.log('mutations中的DECREMENT被调用了',state,value)
        state.sum -= value
        console.log(state.sum)
    }
}
//准备state——用于存储数据
const state = {
    sum:0 ,//当前的和
    school:'尚硅谷',
    subject:'视频教程'
}
//准备getters——用于将state中的数据进行加工
const getters = {
    bigSum(state){
         return state.sum * 10
   } 
}

//创建并暴露store
export default new Vuex.Store({
    actions,
    mutations,
    state,
    getters
})