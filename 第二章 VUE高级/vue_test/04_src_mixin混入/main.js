import Vue from 'vue'
import App from './APP.vue'
Vue.config.productionTip = false
//全局混合
import {mixin} from './mixin'
Vue.mixin(mixin)
new Vue({
    el: '#app',
    render: h => h(App)
})