<template>
	<div>
		<h1>当前求和为：{{ sum}}</h1>
		<h3>当前求和放大10倍后的结果为：{{bigSum}}</h3>
		<h3>很不错的{{subject}},爱来自{{ school}}</h3>
		<select v-model.number="n">
			<option value="1">1</option>
			<option value="2">2</option>
			<option value="3">3</option>
		</select>
		<button @click="INCREMENT(n)">+</button>
		<button @click="DECREMENT(n)">-</button>
		<button @click="incrementOdd(n)">当前求和为奇数再加</button>
		<button @click="incrementWait(n)">等一等再加</button>
	</div>
</template>

<script>
import {mapState,mapGetters,mapActions,mapMutations} from 'vuex'
	export default {
		name:'Count',
		data() {
			return {
				n:1, //用户选择的数字

			}
		},
		methods: {
			// increment(){
			// 	this.$store.commit('INCREMENT',this.n)
			// },
			// decrement(){
			// 	this.$store.commit('DECREMENT',this.n)
			// },
			...mapMutations(['INCREMENT','DECREMENT']),	
			//数组写法
			//...mapMutations(['INCREMENT','DECREMENT']),
			// incrementOdd(){
			// 	this.$store.dispatch('incrementOdd',this.n)
			// },
			// incrementWait(){
			// 	setTimeout(()=>{
			// 		this.$store.dispatch('incrementWait',this.n)
			// 	},500)
			// },
			...mapActions(['incrementOdd','incrementWait']),
		},
		mounted(){
			console.log("Count",this.$store)
		},
		//使用vuex的辅助函数mapState，从getters中获取数据
		computed:{
			...mapState(['sum','school','subject']),
			...mapGetters(['bigSum'])
		}
	}
</script>

<style lang="css">
	button{
		margin-left: 5px;
	}
</style>