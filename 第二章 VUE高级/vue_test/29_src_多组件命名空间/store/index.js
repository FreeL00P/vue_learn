//该文件用于创建Vuex中最为核心的store
import Vue from 'vue'
//引入Vuex
import Vuex from 'vuex'
//应用Vuex插件
Vue.use(Vuex)
//人员管理相关的配置
const personOptions = {
    //开启命名空间
    namespaced:true,
    actions:{
        addWang(context,value){
            console.log('actions中的addPersonWang被调用了',context,value)
            if(value.name.indexOf('王') === 0){
                context.commit('ADD_PERSON',value)
            }else{
                alert('添加的人必须姓王')
            }
        }
    },
    mutations:{
        ADD_PERSON(state,personObj){
            console.log('mutations中的ADD_PERSON被调用了',state,personObj)
            state.personList.unshift(personObj)
        }
    },
    state:{
        personList:[
            {id:'001',name:'张三'},
            {id:'002',name:'李四'},
            {id:'003',name:'王五'}
        ]
    },
    getters:{
        firstPersonName(state){
            return state.personList[0].name
        }
    }

}
//求和功能相关的配置
const countOptions = {
    //开启命名空间
    namespaced:true,
    actions:{
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
    },
    mutations:{
        INCREMENT(state,value){
            console.log('mutations中的INCREMENT被调用了',state,value)
            state.sum += value
            console.log(state.sum)
        },
        DECREMENT(state,value){
            console.log('mutations中的DECREMENT被调用了',state,value)
            state.sum -= value
            console.log(state.sum)
        },
    },
    state:{
        sum:0 ,//当前的和
        school:'尚硅谷',
        subject:'视频教程',
    },
    getters:{
        bigSum(state){
            return state.sum * 10
      } 
    }
}
//创建并暴露store
export default new Vuex.Store({
    modules:{
        countAbout:countOptions,
        personAbout:personOptions
    }
})