import Vue from 'vue'
import App from './APP.vue'
Vue.config.productionTip = false
//引入插件
import plugins from './plugins'
Vue.use(plugins)
new Vue({
    el: '#app',
    render: h => h(App)
})