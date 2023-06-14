<template>
	<div>
		<h1>当前求和为：{{ sum}}</h1>
		<h3>当前求和放大10倍后的结果为：{{bigSum}}</h3>
		<h3>很不错的{{subject}},爱来自{{ school}}</h3>
		<h3>下方组件总人数为{{personList.length}}</h3>
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

			...mapMutations('countAbout',['INCREMENT','DECREMENT']),	
		
			...mapActions('countAbout',['incrementOdd','incrementWait']),
		},
		mounted(){
			console.log("Count",this.$store)
		},
		//使用vuex的辅助函数mapState，从getters中获取数据
		computed:{
			//使用命名空间获取数据（必须先开启命名空间）
			...mapState('countAbout',['sum','school','subject']),
			...mapState('personAbout',['personList']),
			...mapGetters('countAbout',['bigSum'])
		}
	}
</script>

<style lang="css">
	button{
		margin-left: 5px;
	}
</style>