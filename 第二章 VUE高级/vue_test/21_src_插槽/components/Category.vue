<template>
  <div class="cate">
    <h3>{{title}}</h3>
    <slot :games="games">默认值1</slot>
    <!-- <slot name="footer">默认值2</slot> -->
  </div>
</template>

<script>
export default {
    name: 'Category',
    props:["title"],
    data(){
        return{
				games:["英雄联盟","王者荣耀","绝地求生","穿越火线","地下城与勇士","魔兽世界"],
			
				//foods:["热菜","凉菜","汤","主食","饮料","甜点"],
					// films:["战狼","红海行动","流浪地球","复仇者联盟","速度与激情","变形金刚"]

			}
    }
}
</script>

<style>
    .cate{
        width: 200px;
        height: 300px;
        background-color: burlywood;
        ;
    }
    h3{
        text-align: center;
        color: #fff;
        background-color: bisque;
    }
</style>