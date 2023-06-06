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

<img src="https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603204604571.png" alt="image-20230603204604571" style="zoom: 67%;" />

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

>![image-20230603220800396](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603220800396.png)
>
>_data对采用事件劫持对data进行了封装

## 1.7 事件处理

### 1.7.1 事件的基本使用

点击事件

```javascript
<div id="root">
      <h2>新天地，有了新{{name}}</h2>
      <h2>新{{name}}，就是新天地</h2>
      <!-- 点击后寻找名为changeName的函数进行调用 -->
      <button v-on:click="changeName">改名</button>
      <!-- 可以简写为@click -->
      <button @click="changeName">改名</button>
</div>
```

如果我们像使用js一样，直接创建一个函数

```javascript
function changeName() {
	alert("改名成功");
}
```

我们可以看到是无法调用成功的

![image-20230604190849991](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604190849991.png)

因为Vue的模板只能访问Vue实例所提供

![image-20230604191059917](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604191059917.png)

在Vue实例中添加事件处理函数

```javascript
new Vue({
    el: "#root",
    data: {
      name: "满洲",
    },
    //配置事件处理函数 e是事件对象
    methods: {
      changeName: function (e) {
        //this指向当前vue实例
        this.name = "馒头";
      },
    },
});
```

使用

![image-20230604192244200](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604192244200.png)

**事件处理函数中的this指向当前Vue实例**

![image-20230604192441398](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604192441398.png)

>  **如果使用箭头函数，那么this就我去父级寻找，在这里是windows**

```
changeNameByValue: (e) => {
    //this指向window
    this.name = "馒头";
    console.log(this);
},
```

回调函数如何传递参数‘

```
 <button v-on:click="changeNameByValue(66)">改名</button>
changeNameByValue: (e) => {
    //this指向window
    this.name = "馒头";
    console.log(this);
    console.log(e);
},
```

直接在括号里面填入自己的参数，但上面的列子会丢失event事件对象

![image-20230604193207169](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604193207169.png)

可以看到e接受了传过来的参数，事件对象不见了

在参数列表中加入$event Vue会自动扫描当前事件对象，将他传递进来

```javascript
 <button v-on:click="changeNameByValue($event,66)">改名byValue</button>
```



![image-20230604193513944](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604193513944.png)

代码

```javascript
<div id="root">
  <h2>新天地，有了新{{name}}</h2>
  <h2>新{{name}}，就是新天地</h2>
  <!-- 点击后寻找名为changeName的函数进行调用 -->
  <button v-on:click="changeNameByValue($event,66)">改名byValue</button>
  <!-- 可以简写为@click -->
  <button @click="changeName">改名</button>
</div>
<script>
  //   function changeName() {
  //     alert("改名成功");
  //   }
  //关闭vue启动时的提示信息
  Vue.config.productionTip = false;
  new Vue({
    el: "#root",
    data: {
      name: "满洲",
    },
    //配置事件处理函数 e是事件对象
    methods: {
      changeName: function (e) {
        //this指向当前vue实例
        this.name = "馒头";
        console.log(this);
      },
      changeNameByValue: (e, a) => {
        //this指向window
        this.name = a;
        console.log(this);
        console.log(e);
        console.log(a);
      },
    },
  });
</script>
```

事件的基本使用总结：

- 使用v-on:xxx或@xxx绑定事件，其中xxx是事件名;
- 事件的回调需要配置在methods对象中，最终会在vm上;
- methods中配置的函数，不要箭头函数！否则this就不是vm了；
- methods中配置的函数，都是被Vue所管理的函数，this的指向是vm或组件实例对象
- @click="demo" 和@click="demo($event)"效果一样，但后者可以传递参数

### 1.7.2 事件修饰符

使用事件修饰符阻止默认事件

```javascript
e.preventDefault();
```

vue使用prevent阻止默认事件，直接在事件名后面加上.prevent

```javascript
<a href="https://freel00p.top" @click.prevent="showInfo">点我提示信息</a>
```

![image-20230604200712956](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604200712956.png)

点确认后不会跳转到页面，阻止成功

Vue的一些事件修饰符

1. prevent 阻止默认事件
2. stop 阻止事件冒泡
3. once 事件只触发一次
4. capture 使用事件的捕获模式
5. self 只有event.target是当前操作的元素才触发事件
6. passive 事件的默认行为立即执行，无需等待事件回调执行完毕

**事件的捕获模式**

```javascript
<!-- 使用事件的捕获模式 -->
<div class="box1" @click="showMsg(1)">
    div1
    <div class="box2" @click="showMsg(2)">div2</div>
</div>
showMsg: function (num) {
    console.log("div" + num);
},
```

点击box2，控制台输出

![image-20230604202402626](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604202402626.png)

在事件捕获阶段，从外向内 div1->div2
在事件冒泡阶段，从内向外div2->div1

在box1 的事件上添加事件修饰符capture 使用事件的捕获模式
点击box2，控制台输出

![image-20230604202706044](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604202706044.png)

**使用self 只有event.target是当前操作的元素才触发事件**
在div1上加上事件修饰符self

```javascript
<div class="box1" @click.self="showMsg($event,1)">
    div1
    <div class="box2" @click="showMsg($event,2)">div2</div>
</div>
showMsg: function (e, num) {
    console.log(e.target);
    console.log("div" + num);
},
```

控制台输出

![image-20230604203257574](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604203257574.png)

控制台只打印了div2，因为事件冒泡阶段的event都是div2，在div1上的event是div1时才会执行

> 使用self修饰符也能阻止事件冒泡

点击div1,控制台打印

![image-20230604203545171](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230604203545171.png)

**passive 事件的默认行为立即执行，无需等待事件回调执行完毕**

例如鼠标滚动一下循环一千次，加上passive后就无需等待循环结束，直接滚动页面

### 1.7.3 键盘事件

键盘事件语法糖：@keydown，@keyup

Vue中常用的按键别名：

- 回车 => enter
- 删除 => delete
- 退出 => esc
- 空格 => space
- 换行 => tab (特殊，必须配合keydown去使用)

```javascript
<div id="root">
  <input
    type="text"
    placeholder="按下回车键输入"
    @keyup.enter="showInfo"
  />
</div>
<script>
  new Vue({
    el: "#root",
    methods: {
      showInfo: function (e) {
        // if (e.keyCode == 13) {
        //   alert(e.target.value);
        // }
        console.log(e.target.value);
      },
    },
  });
</script>
```

## 1.8计算属性

- 定义：需要使用的属性，需要用现有属性"计算"得到
- 优势：与method相比，计算属性用缓存机制，避免多次调用，效率高
- get函数调用时期
  - 1.初次读取fullName时。2.所依赖的数据发生变化时。      
- Tips
  - 计算属性最终会出现在vm上，直接读取使用即可
  - 如果计算属性要被修改，那必须写set函数去响应修改，且set中要引起计算时依赖的数据发生改变

```javascript
 <div id="root">
  姓：<input type="text" v-model="firstName" /><br />
  名：<input type="text" v-model="lastName" /> <br />
  姓名：<span>{{fullName}}</span> 姓名：<span>{{fullName}}</span>
  姓名：<span>{{fullName}}</span> 姓名：<span>{{fullName}}</span>
</div>
<script>
  new Vue({
    el: "#root",
    data: {
      firstName: "张",
      lastName: "三",
    },
    computed: {
      fullName: {
        //当有人读取fullName时，get就会被调用，且返回值就作为fullName的值
        //什么时候调用？1.初次读取fullName时。2.所依赖的数据发生变化时。
        get() {
          console.log("get被调用了");
          return this.firstName + "-" + this.lastName;
        },
        //当计算属性的结果不需要修改时，可以使用简写方法
   		//funName:function(){
        //	 return this.firstName + "-" + this.lastName; 
      	//}
        //set什么时候调用? 当fullName被修改时。
        // 可以主动在控制台修改fullName来查看情况
        set(value) {
          console.log("set", value);
          const arr = value.split("-");
          this.firstName = arr[0];
          this.lastName = arr[1];
        },
      },
    },
  });
</script>
```

 ## 1.9 事件监听

 监视属性watch：

1. 当被监视的属性发生改变时，会自动调用handler函数

2. 监视的属性必须存在

3. 当监视的属性发生改变时，会传递两个参数

   ​       1.newValue:改变后的值

   ​       2.oldValue:改变前的值

4. .监视的两种写法

   1.  new Vue({watch:{isHot(){}}})
   2. vm.$watch("isHot",function(){})

```javascript
 const vm = new Vue({
        el: "#root",
        data: {
          isHot: true,
        },
        computed: {
          info() {
            return this.isHot ? "热" : "不热";
          },
        },
        methods: {
          changeWeather() {
            this.isHot = !this.isHot;
          },
        },
        /*
          监视属性watch：
            1.当被监视的属性发生改变时，会自动调用handler函数
            2.监视的属性必须存在
            3.当监视的属性发生改变时，会传递两个参数
              1.newValue:改变后的值
              2.oldValue:改变前的值
            4.监视的两种写法
              1)new Vue({watch:{isHot(){}}})
              2)vm.$watch("isHot",function(){})
        */
     	//写法1
        // watch: {
        //   isHot: {
        //     //当isHot发生改变时，会自动调用handler函数
        //     handler(newValue, oldValue) {
        //       console.log(newValue, oldValue);
        //     },
        //     immediate: true, //初始化时就会执行
        //   },

        //   // isHot(newValue, oldValue) {
        //   //   console.log(newValue, oldValue);
        //   // },
        // },
      });
		//写法2
		//watch也可以监听info属性
      vm.$watch("isHot", {
        handler(newValue, oldValue) {
          console.log(newValue, oldValue);
        },
        immediate: true, //初始化时就会执行
      });
```

深度监视

​	（1）Vue中的watch默认不监听对象内部值的改变（一层）

​	（2）配置deep:true可以使监测对象的内部值发生改变（多层）

> TIPS:
>
> 	1. Vue自身可以监听到对象内部值的改变，但Vue提供的watch默认不可以
> 	1. 使用watch时根据数据的具体结构，决定是否采用深度监视

监视多级结构中所有属性的变化

```javascript
numbers{
    a:1,
    b:1
}
```

如果直接监视numbers 当a或b发生改变时，监听器handler不会检测到，这是因为handler监听这是numbers 获取不到a和b的状态。

正确使用方式

```
watch{
	numbers:{
		deep:true,
		handler(){
			console.log('numbers发生改变')
		}
	}
}
```

## 1.10 绑定样式

绑定样式

1. class 样式

   - 写法：class="xxx" xxx可以是字符串、对象、数组。

     -  字符串写法 适用于：样式的类名不确定，需要动态指定 

     - 对象写法，适用于：要绑定的样式个数确定，名字确定，但需要动态指定用不用 

     - 数组写法，适用于：要绑定的样式个数不确定，名字也不确定

2.  style 样式

   - style="{fontSize:xxx}"其中的xxx是动态值
   - style="[a,b]"其中a、b是样式对象
```javascript
 <!-- 绑定class样式--字符串写法 适用于：样式的类名不确定，需要动态指定 -->
 <div class="basic" :class="mood" @click="changeMood">{{name}}</div>
 <!-- 绑定class样式--数组写法，适用于：要绑定的样式个数不确定，名字也不确定 -->
 <div class="basic" :class="classArr" @click="changeMood">{{name}}</div>
 <!-- 绑定class样式--对象写法，适用于：要绑定的样式个数确定，名字确定，但需要动态指定用不用 -->
 <div class="basic" :class="mood" @click="changeMood">{{name}}</div>
```

## 1.11 条件渲染

条件渲染：

1. v-if
   - 写法：
     1. v-if="表达式"
     2. v-else-if="表达式"
     3. v-else="表达式"
   - 适用于切换频率较低的场景
   - 特点：不展示的dom元素直接移除
   - 注意：v-if 和v-else-if、v-else可以一起使用，但结构不能被打断
2. v-show
   - 写法 v-show="表达式"
   - 适用于：切换频率较低的场景
   - 不展示的dom只是被隐藏起来了，并没有被移除

使用示例

```javascript
 <h2>当前n的值是{{n}}</h2>
    <button @click="n++">点我n++</button>
    <!-- 使用v-show做条件渲染 -->
    <!-- 底层使用display：none dom元素并没有移除-->
    <!-- <h2 v-show="true">欢迎来到{{name}}</h2> -->
    <!-- 使用v-if做条件渲染 移除dom元素-->
    <!-- <h2 v-if="false">欢迎来到{{name}}</h2> -->
    <div v-if="n===1">也许争不过天和地</div>
    <div v-else-if="n===2">也许低下头会哭泣</div>
<div v-else="n===3">也许六月雪会飞进心里</div>
```

## 1.12 列表渲染

简单使用

```javascript
<div id="root">
  <ul>
    <!-- 遍历数组并为每个元素指定唯一标识（:key） -->
    <li v-for="item in arr" :key="item.name">{{item.name}}-{{item.age}}</li>
  </ul>
  <!-- 遍历对象 -->
  <ul>
    <li v-for="(a,b,c) in car">{{a}}-{{b}}-{{c}}</li>
  </ul>
</div>
<script>
  new Vue({
    el: "#root",
    data: {
      arr: [
        { name: "张三", age: 18 },
        { name: "李四", age: 19 },
        { name: "王五", age: 20 },
        { name: "赵六", age: 21 },
      ],
      car: {
        name: "宝马",
        price: 1000000,
        color: "red",
      },
    },
  });
</script>
```

**虚拟DOM中key的作用**

key是虚拟DOM对象的标识，当数据发生变化时，Vue会根据【新数据】生成【新的虚拟DOM】, 随后Vue进行【新虚拟DOM】与【旧虚拟DOM】的差异比较，比较规则如下：

- 旧虚拟DOM中找到了与新虚拟DOM相同的key：
  - ①.若虚拟DOM中内容没变, 直接使用之前的真实DOM！
  - ②.若虚拟DOM中内容变了, 则生成新的真实DOM，随后替换掉页面中之前的真实DOM。
- 旧虚拟DOM中未找到与新虚拟DOM相同的key
  - 创建新的真实DOM，随后渲染到到页面。

> 好了，我们知道了最简单的key的原理，如果要继续研究下去就要涉及到vue的核心之一-Diff算法，后面会详细介绍。

用index作为key可能会引发的问题：
若对数据进行：逆序添加、逆序删除等破坏顺序操作：
会产生没有必要的真实DOM更新 ==> 界面效果没问题, 但效率低。

![image-20230605221536987](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230605221536987.png)

![image-20230605221326324](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230605221326324.png)

使用数组元素的唯一id作为key

- 最好使用每条数据的唯一标识作为key, 比如id、手机号、身份证号、学号等唯一值
- 如果不存在对数据的逆序添加、逆序删除等破坏顺序操作，仅用于渲染列表用于展示，使用index作为key是没有问题的

![image-20230605221805058](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230605221805058.png)

## 1.13 vue监测data中的数据

Vue监视数据的原理：

- vue会监视data中所有层次的数据

- 如何监测对象中的数据？

  通过setter实现监视，且要在new Vue时就传入要监测的数据。

  - 对象中后追加的属性，Vue默认不做响应式处理

  - 如需给后添加的属性做响应式，请使用如下API：

    Vue.set(target，propertyName/index，value) 或

    vm.$set(target，propertyName/index，value)

- 如何监测数组中的数据？

  通过包裹数组更新元素的方法实现，本质就是做了两件事：

  - 调用原生对应的方法对数组进行更新
  - 重新解析模板，进而更新页面

- 在Vue修改数组中的某个元素一定要用如下方法：

  - 使用这些API:push()、pop()、shift()、unshift()、splice()、sort()、reverse()
  - Vue.set() 或 vm.$set()

> 特别注意：Vue.set() 和 vm.$set() 不能给vm 或 vm的根数据对象 添加属性！！！ 

## 1.14 收集表单数据

- v-model默认收集的是用户输入的value值，

```javascript
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        账号：<input type="text" v-model.trim="userInfo.account"> <br/><br/>
        密码：<input type="password" v-model="userInfo.password"> <br/><br/>
        年龄：<input type="number" v-model.number="userInfo.age"> <br/><br/>
        <button>提交</button>
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                account:'',
                password:'',
                age:18,
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

- 如果表单是单选下拉列表等，需要自己在标签内加入value属性

```javascript
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        性别：
        男<input type="radio" name="sex" v-model="userInfo.sex" value="male">
        女<input type="radio" name="sex" v-model="userInfo.sex" value="female">
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                sex:'female'
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```



- 没有配置input的value属性，那么收集的就是checked（勾选 or 未勾选，是布尔值）

- 配置input的value属性:
  - v-model的初始值是非数组，那么收集的就是checked（勾选 or 未勾选，是布尔值）
  - v-model的初始值是数组，那么收集的的就是value组成的数组

```javascript
<!-- 准备好一个容器-->
<div id="root">
    <form @submit.prevent="demo">
        爱好：
        学习<input type="checkbox" v-model="userInfo.hobby" value="study">
        打游戏<input type="checkbox" v-model="userInfo.hobby" value="game">
        吃饭<input type="checkbox" v-model="userInfo.hobby" value="eat">
        <br/><br/>
        所属校区
        <select v-model="userInfo.city">
            <option value="">请选择校区</option>
            <option value="beijing">北京</option>
            <option value="shanghai">上海</option>
            <option value="shenzhen">深圳</option>
            <option value="wuhan">武汉</option>
        </select>
        <br/><br/>
        其他信息：
        <textarea v-model.lazy="userInfo.other"></textarea> <br/><br/>
        <input type="checkbox" v-model="userInfo.agree">阅读并接受<a href="http://www.atguigu.com">《用户协议》</a>
        <button>提交</button>
    </form>
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    new Vue({
        el:'#root',
        data:{
            userInfo:{
                hobby:[],
                city:'beijing',
                other:'',
                agree:''
            }
        },
        methods: {
            demo(){
                console.log(JSON.stringify(this.userInfo))
            }
        }
    })
</script>
```

![image-20230606161653320](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230606161653320.png)

v-model的三个修饰符：

lazy：失去焦点再收集数据

number：输入字符串转为有效的数字

trim：输入首尾空格过滤
