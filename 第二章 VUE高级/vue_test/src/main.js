import Vue from 'vue'
import App from './APP.vue'
Vue.config.productionTip = false
//定义全局组件
// const Demo = Vue.extend({})
// const d = new Demo()
// Vue.prototype.x = d;
new Vue({
    el: '#app',
    render: h => h(App),
    beforeCreate(){
        Vue.prototype.$bus = this //安装全局事件总线
    }
})