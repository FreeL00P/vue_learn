# vue笔记

# 第1章：Vue核心

## 1.1 初识Vue

* 想让Vue工作，就必须创建一个Vue实例，且要传入一个配置对象
* demo容器里的代码依然符合html规范，只不过混入了一些特殊的Vue语法
* demo容器里的代码被称为【Vue模板】
* Vue实例和容器是一一对应的
* 真实开发中只有一个Vue实例，并且会配合着组件一起使用
* {{xxx}}是Vue的语法：插值表达式，{{xxx}}可以读取到data中的所有属性
* 一旦data中的数据发生改变，那么页面中用到该数据的地方也会自动更新(Vue实现的响应式)

> 初始示例代码

```
<!-- 准备好一个容器 -->
<div id="demo">
	<h1>Hello，{{name.toUpperCase()}}，{{address}}</h1>
</div>

<script type="text/javascript" >
	Vue.config.productionTip = false //阻止 vue 在启动时生成生产提示。

	//创建Vue实例
	new Vue({
		el:'#demo', //el用于指定当前Vue实例为哪个容器服务，值通常为css选择器字符串。
		data:{ //data中用于存储数据，数据供el所指定的容器去使用，值我们暂时先写成一个对象。
			name:'hello,world',
			address:'北京'
		}
	});
</script>
```

## 1.2 模板语法

Vue模板语法有2大类:

* 插值语法：
  功能：用于解析标签体内容
  写法：{{xxx}}，xxx是js表达式，且可以直接读取到data中的所有属性
* 指令语法:
  功能：用于解析标签（包括：标签属性、标签体内容、绑定事件.....）
  举例：v-bind:href="xxx" 或 简写为 :href="xxx"，xxx同样要写js表达式，且可以直接读取到data中的所有属性

> 代码

```
<div id="root">
	<h1>插值语法</h1>
	<h3>你好，{{name}}</h3>
	<hr/>
	<h1>指令语法</h1>
    <!-- 这里是展示被Vue指令绑定的属性，引号内写的是js表达式 -->
	<a :href="school.url.toUpperCase()" x="hello">点我去{{school.name}}学习1</a>
	<a :href="school.url" x="hello">点我去{{school.name}}学习2</a>
</div>

<script>
    new Vue({
		el:'#root',
		data:{
			name:'jack',
			school:{
				name:'百度',
				url:'http://www.baidu.com',
			}
        }
	})
</script>
```

## 1.3 数据绑定

Vue中有2种数据绑定的方式：

* 单向绑定(v-bind)：数据只能从data流向页面
* 双向绑定(v-model)：数据不仅能从data流向页面，还可以从页面流向data
  > tips:
  >
  > 1.双向绑定一般都应用在表单类元素上（如：input、select等）
  >
  > 2.v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值
  >

> 代码

```
<div id="root">
	<!-- 普通写法 单向数据绑定 -->
    单向数据绑定：<input type="text" v-bind:value="name"><br/>
    双向数据绑定：<input type="text" v-model:value="name"><br/>

    <!-- 简写 v-model:value 可以简写为 v-model，因为v-model默认收集的就是value值-->
    单向数据绑定：<input type="text" :value="name"><br/>
    双向数据绑定：<input type="text" v-model="name"><br/>
</div>

<script>
    new Vue({
		el:'#root',
		data:{
			name:'jack',
        }
	})
</script>
```

## 1.4 el与data的两种写法

el有2种写法

* new Vue时候配置el属性
* 先创建Vue实例，随后再通过vm.$mount('#root')指定el的值

data有2种写法

* 对象式
* 函数式
  > 在组件中，data必须使用函数式
  >

> 代码

```
<script type="text/Javascript">
      const v=new Vue({
          //el:"#root", //第一种写法

        //   data:{//data的第一种写法
        //       name:"张三"
        //   }
        //data的第二种写法
        data:function() {
            console.log("data this is",this);//这里的this指向的是vue实例
            return {
                name:"张三"
            }
        }
      })
      console.log(v);
      v.$mount("#root");//第二种写法
    </script>
```

## 1.5 MVVM模型

1. M：模型（Model）：对应data中的数据
2. V：视图（view）：模板
3. VM：视图模型（ViewModel）：Vue实例对象

![image-20230603202854114](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603202854114.png)

![image-20230603203706338](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603203706338.png)

往模型里添加的数据都会出现在vue实例对象上（VM）

<img src="https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603204148831.png" alt="image-20230603204148831" style="zoom:150%;" />

VM（Vue实例对象）身上的属性以及Vue原型上的所有属性都可以在Vue模板(V层）上直接使用，

![image-20230603204627304](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603204627304.png)

<img src="https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603204422418.png" alt="image-20230603204422418" style="zoom:67%;" />

<img src="C:\Front_Leran\Vue_Learn\assets\image-20230603204604571.png" alt="image-20230603204604571" style="zoom: 67%;" />

```javascript
<div id="root">
  <h1>学校名称：{{name}}</h1>
  <h1>学校地址：{{address}}</h1>
  <h1>测试1{{1+1}}</h1>
  <h1>测试2{{$options}}</h1>
  <h1>测试3{{_c}}</h1>
</div>
<script>
  const v = new Vue({
    el: "#root",
    data: {
      name: "湖南工程学院",
      address: "湘潭",
    },
  });
  console.log(v);
</script>
```

## 1.6 数据代理

### 1.6.1回顾Object.defineProperty()方法

1.对象 (obj)

　　要定义或修改属性的对象。

2.属性名称 (prop)

　　要定义或修改的属性名称。

3.属性描述符 (descriptor)

　　一个包含属性特性的对象。

　　属性描述符对象 (descriptor) 可以包含以下可选属性：

　　·value: 属性的值。

　　·writable: 如果为 true，属性的值可以被赋值运算符改变。默认为 false。

　　·enumerable: 如果为 true，属性可以通过 for...in 循环或 Object.keys 枚举。默认为 false。

　　·configurable: 如果为 true，属性可以被删除，以及属性的特性可以被修改。默认为 false。

　　·get: 作为属性的 getter 函数，当访问属性时会调用该函数。

　　·set: 作为属性的 setter 函数，当设置属性值时会调用该函数。

**使用**

```javascript
<script>
  let sex="女"
  let person = {
    name: "张三",
    age: 18,
  };
  // 通过Object.defineProperty方法来实现数据代理
  //1.对象 (obj)要定义或修改属性的对象。
  //2.属性名称 (prop)要定义或修改的属性名称。
  //3.属性描述符 (descriptor)一个包含属性特性的对象。

  //为Person对象添加一个sex属性
  Object.defineProperty(person, "sex", {
    value: "男",
  });
  console.log(person);
</script>
```

在浏览器上查看

![image-20230603210244528](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603210244528.png)

可以看到添加的sex属性颜色不一样，表示这个属性不可枚举（不参与遍历）

```javascript
//添加的属性是不可枚举的
log(Object.keys(person)); //["name", "age"]
```

控制属性是否可以枚举是否可以修改是否可以...

```javascript
Object.defineProperty(person, "sex", {
    value: "男",
    enumerable: true, //是否可枚举
    writable: true, //是否可修改
    ...
});
```

![image-20230603211410555](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603211410555.png)

通过Object.defineProperty()让sex和person产生了关联

```javascript
Object.defineProperty(person, "sex", {
    get: function () {
      //当有人读取person的sex属性时，会自动调用get方法
      console.log("get方法被调用了");
      return sex;
    },
    set: function (value) {
      //当有人修改person的sex属性时，会自动调用get方法
      console.log("set方法被调用了");
      sex = value;
	},
});
```



![image-20230603212541862](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603212541862.png)

### 1.6.2 何为数据代理

```javascript
//数据代理：通过一个对象代理另一个对象中的属性
let obj1 = { x: 100 };
let obj2 = { y: 200 };
Object.defineProperty(obj2, "x", {
get() {
  return obj1.x;
},
set(value) {
  obj1.x = value;
},
});
```

![image-20230603214208201](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603214208201.png)

通过obj2修改了obj1属性x的值

### 1.6.3 Vue中的数据代理

```javascript
<div id="root">
  <h2>学校名称{{name}}</h2>
  <h2>学校地址{{address}}</h2>
</div>
<script>
  const v = new Vue({
    el: "#root",
    data: {
      name: "湖南工程学院",
      address: "湘潭",
    },
  });
  console.log(v);
</script>
```

![image-20230603215549491](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603215549491.png)

可以看到，写在配置项中的 data 数据被 绑定到了 vm 对象上，我先来讲结果，是 Vue 将 _data 中的 name，address 数据 代理到 vm 本身上。

![image-20230603215707877](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603215707877.png)

将 **vm._data** 中的值，再代理到 vm 本身上来，用vm.name 代替 **vm._data.name**。这就是 Vue 的数据代理

这一切都是通过 Object.defineProperty() 来完成的，我来模拟一下这个过程

![image-20230603220226413](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603220226413.png)

将_data的数据在vm下代理一份

![image-20230603220339044](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603220339044.png)

>![image-20230603220800396](C:\Front_Leran\Vue_Learn\assets\image-20230603220800396.png)
>
>_data对采用事件劫持对data进行了封装
