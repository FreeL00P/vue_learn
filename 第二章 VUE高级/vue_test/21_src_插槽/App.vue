<template>
	<div class="app">
		<!-- <Category  title="食物">
			<img slot="center" src="https://p9.itc.cn/q_70/images03/20201031/300987044953429dad9ead7cbaa3e672.png" alt="">
			<div class="a-text" slot="footer">
				<a  href="https://freeL00P.top">更多</a>
			</div>
		</Category> -->
		<!-- <Category  title="游戏">
			<img slot="center" src="https://p9.itc.cn/q_70/images03/20201031/300987044953429dad9ead7cbaa3e672.png" alt="">
			<div class="a-text" slot="footer">
				<a  href="https://freeL00P.top">更多</a>
				<a href="https://freeL00P.top">更多</a>
		
			</div>
				<ul>
					<li v-for="(item,index) in games" :key="index">{{ item }}</li>
				</ul>
			
		</Category> -->
		<Category  title="游戏">
			<template scope="atguigu">
				<ul>
        			<li v-for="(item,index) in atguigu.games " :key="index">{{ item }}</li>
    			</ul>
			</template>
		</Category>		
		<Category  title="游戏">
			<template scope="atguigu">
        		<h4 v-for="(item,index) in atguigu.games " :key="index">{{ item }}</h4>
			</template>
		</Category>		
		<Category  title="游戏">
			<template scope="atguigu">
				<ol>
        			<li style="color: pink;" v-for="(item,index) in atguigu.games " :key="index">{{ item }}</li>
    			</ol>
			</template>
		</Category>		
		<!-- <Category  title="电影">
			<video src="https://xy115x223x28x166xy.mcdn.bilivideo.cn:4483/upgcxcode/61/48/255264861/255264861-1-208.mp4?e=ig8euxZM2rNcNbhjnwdVhwdlhzT3hwdVhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1686642161&gen=playurlv2&os=mcdn&oi=1910360649&trid=00005f83e5e46da14e39b89591be0e0c6b92u&mid=284822327&platform=pc&upsig=721e4cc75e499505fd6c8b52aa20deac&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&mcdnid=17000066&bvc=vod&nettype=0&orderid=0,3&buvid=C01AE8BB-4CCC-FE62-0384-D4C58BAF40AD95026infoc&build=0&agrr=1&bw=369721&logo=A0010000&requestFrom=BILIBILI_HELPER_2.5.24"></video>
		</Category> -->
	</div>
</template>

<script>
import Category from "./components/Category.vue"
	export default {
		name:'App',
		components:{Category}
	}
</script>
<style>
	.app{
		display: flex;
		justify-content: space-around;
	}
	img{
		width: 100%;
		height: 100px;
	}
	a-text{
		text-align: center;
	}
</style>
