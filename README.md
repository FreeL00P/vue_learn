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

> ![image-20230603220800396](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230603220800396.png)
>
> _data对采用事件劫持对data进行了封装

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

> **如果使用箭头函数，那么this就我去父级寻找，在这里是windows**

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

       1.newValue:改变后的值
       
       2.oldValue:改变前的值
4. .监视的两种写法

   1. new Vue({watch:{isHot(){}}})
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

    （1）Vue中的watch默认不监听对象内部值的改变（一层）
    
    （2）配置deep:true可以使监测对象的内部值发生改变（多层）

> TIPS:
>
> 1. Vue自身可以监听到对象内部值的改变，但Vue提供的watch默认不可以
> 2. 使用watch时根据数据的具体结构，决定是否采用深度监视

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

     - 字符串写法 适用于：样式的类名不确定，需要动态指定
     - 对象写法，适用于：要绑定的样式个数确定，名字确定，但需要动态指定用不用
     - 数组写法，适用于：要绑定的样式个数不确定，名字也不确定
2. style 样式

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

## 1.15 内置指令

- **v-text指令**
  1. 作用：设置标签的文本内容
  2. 使用场景：一般用于设置标签的文本内容
  3. 如果标签中有其他内容，会被覆盖  （使用插值语法不会替换）

```javascript
<div id="root">
    <div>你好，{{name}}</div>
    <div v-text="name">你好</div>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            name:"张三"
        }
    })
</script>
```

![image-20230606174458611](C:\Front_Leran\Vue_Learn\assets\image-20230606174458611.png)

   你好被替换成了张三

- **v-html指令：**(使用的很少)

1.作用：向指定节点中渲染包含html结构的内容。

2.与插值语法的区别：

- v-html会替换掉节点中所有的内容，{{xx}}则不会。
- v-html可以识别html结构。

3.严重注意：v-html有安全性问题！！！！

- 在网站上动态渲染任意HTML是非常危险的，容易导致XSS攻击。
- 一定要在可信的内容上使用v-html，永不要用在用户提交的内容上！

```javascript
<div id="root">
    <div v-html="str"></div>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            str:"<h1>你好</h1>"
        }
    })
</script>
```

 **v-cloak指令（没有值）**

1. 本质上是一个属性，用于解决插值语法闪烁的问题
2. 使用场景：一般用于设置标签的文本内容
3. Vue实例创建之后，会删掉v-cloak属性

```javascript
<div id="root">
    <h2 v-cloak>{{name}}</h2>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            name:"张三"
        }
    })
</script>
```

**v-once指令**

1. v-once指令（没有值）
2. v-once所在节点动态渲染后，就视为静态内容
3. 以后数据的改变不会引起v-once所在结构的更新，一般用于优化性能，减少不必要的渲染

```javascript
<div id="root">
    <h2 v-once>初始化的n={{n}}</h2>
    <h2>n={{n}}</h2>
    <button @click="n++">n++</button>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            n:0
        }
    })
</script>
```

**v-pre指令**

1. 跳过所在节点的编译过程
2. 可利用它跳过没有指令语法和插值语法的节点，加快编译

```javascript
<div id="root">
    <h2 v-pre>vue 其实很简单</h2>
    <h2 v-once>初始化的n={{n}}</h2>
    <h2>n={{n}}</h2>
    <button @click="n++">n++</button>
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            n:0
        }
    })
</script>
```

## 1.16 自定义指令

需求1：定义一个v-big指令，和v-text功能类似，但会把绑定的数值放大10倍。

需求2：定义一个v-fbind指令，和v-bind功能类似，但可以让其所绑定的input元素默认获取焦点。

**语法：**

局部指令：

```javascript
<div id="root">
    <h2>当前值为<span v-text="n"></span></h2>
    <h2>放大十倍后的n值是：<span v-big="n"></span></h2>
    <button @click="n++">点我n+1</button>
    <input type="text" v-fbind:value="n">
</div>
<script>
    new Vue({
        el:"#root",
        data:{
            n:0
        },
        directives:{
        //函数式自定义指令
        //big函数何时会被？
        //1.指令第一次绑定到元素上时 
        //2.指令所在的模板被重新编译时
        big(el,binding){
            el.innerHTML = binding.value * 10
        },
        //对象式自定义指令
        fbind:{
            //指令第一次绑定到元素上时
            bind(el,binding){
                console.log("bind")
                el.innerHTML = binding.value
            },
            //指令所在元素被插入到页面时
            inserted(el,binding){
                console.log("inserted")
                el.focus()//让元素获得焦点
            },
            //指令所在模板被重新编译时
            update(el,binding){
                console.log("update")
                el.value = binding.value
            },
          }
        },

    })
</script>
```

全局指令

```javascript
<!-- 准备好一个容器-->
<div id="root">
    <input type="text" v-fbind:value="n">
</div>

<script type="text/javascript">
    Vue.config.productionTip = false

    //定义全局指令
    Vue.directive('fbind', {
        // 指令与元素成功绑定时（一上来）
        bind(element, binding){
            element.value = binding.value
        },
        // 指令所在元素被插入页面时
        inserted(element, binding){
            element.focus()
        },
        // 指令所在的模板被重新解析时
        update(element, binding){
            element.value = binding.value
        }
    })
  
    new Vue({
        el:'#root',
        data:{
            name: '尚硅谷',
            n: 1
        }
    })

</script>
```

## 1.17 Vue 生命周期

![组件生命周期图示](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/lifecycle.16e4c08e.png)

 ![vue的生命周期的详细图解_vue](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/resize,m_fixed,w_1184.webp)

## 1.18 非单文件组件

Vue中使用组件的三大步骤：

1.     定义组件(创建组件)
2.     注册组件
3.     使用组件(写组件标签)

一、如何定义一个组件？

    使用Vue.extend(options)创建，其中options和new Vue(options)时传入的那个options几乎一样，但也有点区别；

- 区别如下：

  1. el不要写，为什么？ ——— 最终所有的组件都要经过一个vm的管理，由vm中的el决定服务哪个容器。
  2. data必须写成函数，为什么？ ———— 避免组件被复用时，数据存在引用关系。

    备注：使用template可以配置组件结构。

二、如何注册组件？

    1.局部注册：靠new Vue的时候传入components选项
    
    2.全局注册：靠Vue.component('组件名',组件)

 三、编写组件标签：

    `<school></school>`

```javascript
   <div id="root">
       //使用组件
      <school></school>
      <hr>
       <hello></hello>
        <student></student>
   </div>
   
   <script>
   
       const hello=Vue.extend({
           template:`<h2>你好啊</h2>`
       })
        //创建全局组件
        Vue.component('hello',hello)
       //创建学校组件
       const school=Vue.extend({
           data(){
               return {
                   name:'尚硅谷',
                   address:'北京市昌平区'
               }
           },
           template:`
               <div>
                   <h2>学校名称：{{name}}</h2>
                   <h2>学校地址：{{address}}</h2>
               </div>
               `
       })
       //创建学生组件
       const student=Vue.extend({
           data(){
               return {
                   name:'张三',
                   age:18
               }
           },
           template:` 
                   <div>
                       <h2>学生名称：{{name}}</h2>
                       <h2>学生年龄：{{age}}</h2>      
                   </div>
           `
       })
       //创建vm
       new Vue({
           el:'#root',
           //注册组件
           components:{
               school,
               student
           }, 
       })
   </script>
```

**注意事项**

几个注意点：

1. 关于组件名:、

   - 一个单词组成：

     1. 第一种写法(首字母小写)：school
     2. 第二种写法(首字母大写)：School
   - 多个单词组成：

     1. 第一种写法(kebab-case命名)：my-school
     2. 第二种写法(CamelCase命名)：MySchool (需要Vue脚手架支持)

     备注：

    (1).组件名尽可能回避HTML中已有的元素名称，例如：h2、H2都不行。

    (2).可以使用name配置项指定组件在开发者工具中呈现的名字。

2. 关于组件标签:

- 第一种写法：`<school></school>`
- 第二种写法：`<school/>`

    备注：不用使用脚手架时，`<school/>`会导致后续组件不能渲染。

3. 一个简写方式：

    const school = Vue.extend(options) 可简写为：const school = options

```javascript
<script type="text/javascript">
    Vue.config.productionTip = false

    //定义组件
    const s = Vue.extend({
        name:'atguigu',
        template:`
            <div>
                <h2>学校名称：{{name}}</h2>
                <h2>学校地址：{{address}}</h2>
            </div>
        `,
        data(){
            return {
                name:'尚硅谷',
                address:'北京'
            }
        }
    })

    new Vue({
        el:'#root',
        data:{
            msg:'欢迎学习Vue!'
        },
        components:{
            school:s
        }
    })
</script>
```

**组件嵌套**

```javascript
<div id="root">

</div>
<script>
     //创建学生组件
     const student=Vue.extend({
        data(){
            return {
                name:'张三',
                age:18
            }
        },
        template:` 
                <div>
                    <h2>学生名称：{{name}}</h2>
                    <h2>学生年龄：{{age}}</h2>     

                    </div>
        `
    })
    const school=Vue.extend({
        data(){
            return {
                name:'尚硅谷',
                address:'北京市昌平区'
            }
        },
        template:`
            <div>
                <h2>学校名称：{{name}}</h2>
                <h2>学校地址：{{address}}</h2>
                <student></student>
                </div>
            `,
        components:{
            student
        }
    })
    const app=Vue.extend({
        components:{
            school
        },
        template:`
            <div>
                <h2>根组件</h2>
                <school></school>
            </div>
        `,

    })
    //注册组件
    new Vue({
        el:"#root",
        components:{
            app,
        },
        template:`<app></app>`
    })
</script>
```

# 第二章 vue2高级

## 01 分析VUE脚手架

### 脚手架文件结构

    ├── node_modules
    ├── public
    │   ├── favicon.ico: 页签图标
    │   └── index.html: 主页面
    ├── src
    │   ├── assets: 存放静态资源
    │   │   └── logo.png
    │   │── component: 存放组件
    │   │   └── HelloWorld.vue
    │   │── App.vue: 汇总所有组件
    │   │── main.js: 入口文件
    ├── .gitignore: git版本管制忽略的配置
    ├── babel.config.js: babel的配置文件
    ├── package.json: 应用包配置文件
    ├── README.md: 应用描述文件
    ├── package-lock.json：包版本控制文件

### 关于不同版本的Vue

1. vue.js与vue.runtime.xxx.js的区别：
   1. vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
   2. vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
2. 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。

### vue.config.js配置文件

1. 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
2. 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

## 02 ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
   1. 打标识：`<h1 ref="xxx">.....</h1>` 或 `<School ref="xxx"></School>`
   2. 获取：`this.$refs.xxx`

## 03 props配置项

1. 功能：让组件接收外部传过来的数据
2. 传递数据：`<Demo name="xxx"/>`
3. 接收数据：

   1. 第一种方式（只接收）：`props:['name'] `
   2. 第二种方式（限制类型）：`props:{name:String}`
   3. 第三种方式（限制类型、限制必要性、指定默认值）：

      ```
      props:{
      	name:{
      	type:String, //类型
      	required:true, //必要性
      	default:'老王' //默认值
      	}
      }
      ```

   > 注意：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。
   >

```javascript
export default {
    name: 'Student',
    data() {
        return {
            msg: '学生',
        }
    },
    methods:{
        updateAge(){
            this.age++//vue 不建议直接修改props中的值
        }
    },
    //props:["name", "age", "sex"]//简单声明接受

    //接受的同时，进行类型限制
    props:{
        name:{
            type:String,
            required:true,//必须传递

        },
        age:{
            type:Number,
            default:99,//默认值
        },
        sex:{
            typeof:String,
            required:true,
        }
    }
}
```

## 04 mixin(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象
2. 使用方式：

   第一步定义混合：

   ```
   {
       data(){....},
       methods:{....}
       ....
   }
   ```

   第二步使用混入：

   全局混入：`Vue.mixin(xxx)` 局部混入：`mixins:['xxx']	`

```javascript
//全局混合
import {mixin} from './mixin'
Vue.mixin(mixin)
export const mixin={
    methods:{
        showName(){
            alert(this.name)
        }
    },
    mounted(){
        console.log('mix mounted')
    }
}
import {mixin} from '../mixin'
export default {
    name: 'Student',
    data() {
        return {
            name: '张三',
            sex: '男',
        }
    },
    // methods:{
    //    showName(){
    //        alert(this.name)
    //    }
    // },
   mixins:[mixin]


}
```

## 05 插件

1. 功能：用于增强Vue
2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。
3. 定义插件：

   ```
   对象.install = function (Vue, options) {
       // 1. 添加全局过滤器
       Vue.filter(....)
   
       // 2.定义全局指令局指令
       Vue.directive(....)
   
       // 3. 配置全局混入(合)
       Vue.mixin(....)
   
       // 4. 添加实例方法
       Vue.prototype.$myMethod = function () {...}
       Vue.prototype.$myProperty = xxxx
   }
   ```
4. 使用插件：`Vue.use()`

```javascript
export default{
    install(Vue){
        //全局过滤器
        Vue.filter('mySlice',function(value){
            return value.slice(0,4)
        })
        //定义全局指令
        Vue.directive('fbind',{
            //指令与元素成功绑定时（一上来）
            bind(element,binding){
                element.value = binding.value
            },
            //指令所在元素被插入页面时
            inserted(element,binding){
                element.focus()
            },
            //指令所在的模板被重新解析时
            update(element,binding){
                element.value = binding.value
            }
        })
        //定义一个全局的混合
        Vue.mixin({
            data(){
                return{
                    x:100,
                    y:200
                }
            },
            methods:{
                showName(){
                    alert(this.name)
                }
            }
        })
        //给Vue的原型上添加一个方法
        Vue.prototype.demo=()=> alert('hello')
      
    }
}
//引入插件
import plugins from './plugins'
Vue.use(plugins)
```

## 06 scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：`<style scoped>`

```javasc
school组件
<style scoped>
.demo{
    background-color: skyblue;
}
</style>
student组件
<style scoped>
.demo {
    background-color: orange;
  }
</style>
```

![image-20230610155809658](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230610155809658.png)

## 07 总结TodoList案例

1. 组件化编码流程：

   (1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

   (2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

   1).一个组件在用：放在组件自身即可。

   2). 一些组件在用：放在他们共同的父组件上（状态提升）。

   (3).实现交互：从绑定事件开始。
2. props适用于：

   (1).父组件 ==> 子组件 通信

   (2).子组件 ==> 父组件 通信（要求父先给子一个函数）
3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！
4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

**父组件注册方法**

```javascript
 methods:{
  addTodo(todoObj){
    console.log("我是App组件,我接收到了",todoObj)
    this.todos.unshift(todoObj)
  },
  //取消勾选一个todo
  checkTodo(id){
      this.todos.forEach((item)=>{
        if(item.id===id){
          item.isFinished=!item.isFinished
          console.log(item)
        }
      })
  },
  //删除一个todo
  deleteTodo(id){
    console.log("我是App组件,我接收到了",id)
   this.todos=this.todos.filter(item=>item.id!==id)
  },
  //全选或者全不选
  checkAll(checked){
    checked?
    this.todos.forEach(todo=>todo.isFinished=true):
    this.todos.forEach(todo=>todo.isFinished=false)
  },
  //清除所有已完成的
  clearAllFinished(){
    this.todos=this.todos.filter(todo=>!todo.isFinished)
  }
}
```

**方法传递给子组件**

```javascript
<div id="root">
  <div class="todo-container">
    <div class="todo-wrap">
      <MyHeader :addTodo="addTodo"/>
      <MyList :todos="todos" 
      :checkTodo="checkTodo"
      :deleteTodo="deleteTodo"
      />
      <MyFooter :todos="todos" :checkAll="checkAll"
      :clearAllFinished="clearAllFinished"
      />
    </div>
  </div>
</div>
```

**子组件接受和使用**

```javascript
//声明接受父组件传递过来的数据
props: ['todo','checkTodo','deleteTodo'],
methods:{
    handleCheck(id){
      //通知App组件，取消勾选一个todo
      this.checkTodo(id)
    } ,
    //删除
    handleDelete(id){
      //通知App组件，删除一个todo
      this.deleteTodo(id)
    } 
  }
```

## 08 webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

   1. `xxxxxStorage.setItem('key', 'value');` 该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

   2. `xxxxxStorage.getItem('person');`

       该方法接受一个键名作为参数，返回键名对应的值。

   3. `xxxxxStorage.removeItem('key');`

       该方法接受一个键名作为参数，并把该键名从存储中删除。

   4. ` xxxxxStorage.clear()`

       该方法会清空存储中的所有数据。

4. 备注：

   1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
   2. LocalStorage存储的内容，需要手动清除才会消失。
   3. `xxxxxStorage.getItem(xxx)`如果xxx对应的value获取不到，那么getItem的返回值是null。
   4. `JSON.parse(null)`的结果依然是null。

## 09 组件的自定义事件

1. 一种组件间通信的方式，适用于：**子组件 ===> 父组件**

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（事件的回调在A中）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：`<Demo @atguigu="test"/>` 或 `<Demo v-on:atguigu="test"/>`

   2. 第二种方式，在父组件中：

      ```javascript
      <Demo ref="demo"/>
      ......
      mounted(){
         this.$refs.xxx.$on('atguigu',this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用`once`修饰符，或`$once`方法。

4. 触发自定义事件：`this.$emit('atguigu',数据)`

5. 解绑自定义事件`this.$off('atguigu')`

6. 组件上也可以绑定原生DOM事件，需要使用`native`修饰符。

7. 注意：通过`this.$refs.xxx.$on('atguigu',回调)`绑定自定义事件时，回调要么配置在methods中，要么用箭头函数，否则this指向会出问题！

## 10 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于任意组件间通信。

2. 安装全局事件总线（在main.js中）：

   ```javascript
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。

      ```javascript
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ......
      beforeDestroy() {
          this.$bus.$off('xxxx')
      }
      ```

   2. 提供数据：`this.$bus.$emit('xxxx',数据)`

4. 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

## 11 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于任意组件间通信。

2. 安装全局事件总线（在main.js中）：

   ```javascript
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的回调留在A组件自身。

      ```javascript
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ......
      beforeDestroy() {
          this.$bus.$off('xxxx')
      }
      ```

   2. 提供数据：`this.$bus.$emit('xxxx',数据)`

4. 最好在beforeDestroy钩子中，用$off去解绑当前组件所用到的事件。

## 12 消息订阅与发布（pubsub）

1. 一种组件间通信的方式，适用于任意组件间通信。

2. 使用步骤：

   1. 安装pubsub：`npm i pubsub-js`

   2. 引入: `import pubsub from 'pubsub-js'`

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的回调留在A组件自身。

      ```javascript
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息，this.demo改成箭头函数也是一样的效果，不使用箭头函数的话，this不维护
      }
      ```

   4. 提供数据：`pubsub.publish('xxx',数据)`

   5. 最好在beforeDestroy钩子中，用`PubSub.unsubscribe(pid)`去取消订阅。

## 13 nextTick

1. 语法：`this.$nextTick(回调函数)`
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## 14 Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：![image-20230612191059222](https://freelooptc.oss-cn-shenzhen.aliyuncs.com/image-20230612191059222.png)

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用`<transition>`包裹要过度的元素，并配置name属性：

      ```javascript
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

      

   3. 备注：若有多个元素需要过度，则需要使用：`<transition-group>`，且每个元素都要指定`key`值。

   可以使用css动画库，这里提供一个

   [Animate.css | https://animate.style/](https://animate.style/)

## 15 vue脚手架配置代理

### ajax请求我们使用axios

#### AJAX

AJAX（Asynchronous JavaScript and XML）是一种Web开发技术，它允许网页在不刷新的情况下发送和接受数据。传统的Web应用程序采用同步请求，即当用户执行某些操作时，它会向服务器发送请求并等待响应。而AJAX则允许异步请求，在后台发送请求并继续执行其他任务，当服务器响应时再进行处理。这种技术可以提高网站性能，并允许动态更新网页内容。

##### 工作原理

AJAX使用XMLHttpRequest对象进行通信，该对象允许网页向服务器发送HTTP请求并获取响应。通过这种方式，网页可以在不刷新页面的情况下更新部分内容。

1. 创建XMLHttpRequest对象
2. 发送HTTP请求
3. 接收服务器响应
4. 更新网页内容

#### Axios

Axios是一个基于Promise的HTTP客户端库，它允许在浏览器和Node.js中发送异步HTTP请求。Axios支持所有现代浏览器，包括IE8+，IE9+和IE11+。它提供了易于使用的API，可以轻松地将其集成到任何项目中。与jQuery.ajax()和原生XMLHttpRequest相比，Axios提供了更多的功能和更好的错误处理。

##### 工作原理

Axios通过创建XMLHttpRequest对象发送HTTP请求，并返回一个Promise对象，该对象可以处理成功和失败的情况。Axios还提供了拦截器，可以在请求和响应之前或之后执行处理程序。

1. 创建一个Axios实例
2. 发送HTTP请求
3. 处理成功或失败的结果

#### 在npm中下载axios

```javascript
npm i axios
```

```javascript
// 引入JavaScript方法
import axios from 'axios'
```

### 方法一：vue-cil配置防止跨域，代理服务器

 在vue.config.js中添加如下配置：

```javascript
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

> 此时ajax请求发送端口就不是5000了，而是当前服务器的端口，然后由代理服务器进行转发。
>
> 此时请求策略是：如果ajax在8080端口服务器中请求不到（默认是请求public文件夹下的东西），就会转发到5500端口服务器

### 方法二：根据规则进行代理

 编写vue.config.js配置具体代理规则：

```javascript
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

### 使用 Vue CLI 提供的 `defineConfig` 方法来创建配置对象（视频上使用的案例）

其实就是通过使用 Vue CLI 提供的 `defineConfig` 方法来创建一个配置对象。该方法可以获取到 Vue CLI 默认的配置信息，并且支持传入一个函数作为参数。在这个函数中，可以对默认配置信息进行修改和扩展，并且可以使用 Vue CLI 提供的 API 来自动生成某些配置信息。

下面是使用`defineConfig`方法来创建配置对象

```javascript
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig(config => {
  // 添加自定义插件
  config.plugins.push(new MyCustomPlugin());
  
  // 自动设置别名
  config.resolve.alias.set('utils', path.resolve(__dirname, 'src/utils'));

  // 对开发服务器进行详细配置（方式二）
  config.devServer = {
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        pathRewrite: {'^/api': ''}
      }
    }
  };

  return config;
});
```

在这个示例代码中，我们传给 `defineConfig` 方法一个函数作为参数，并将其命名为 `config`。在这个函数中，我们对 Vue CLI 默认的配置信息进行了一些修改和扩展，如添加自定义插件、自动设置别名和对开发服务器进行详细配置等。

其中最重要的部分是使用 `config.resolve.alias.set()` 方法来设置别名，以便更方便地引用项目中的模块。另外，还对开发服务器进行了详细的配置，这里采用的是第二种方式，即使用对象字面量的方式。

总之，使用 `defineConfig` 方法可以更灵活和方便地定制化应用程序的行为和功能，并能够充分利用 Vue CLI 所提供的工具和 API。

## 16 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 **父组件 ===> 子组件** 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```javascript
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

      

   2. 具名插槽：

      ```javascript
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

      

   3. 作用域插槽：

      1. 理解：数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```javascript
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```

         

         - 在父组件中，分别定义了两个`<Category>`组件，并向其传递了不同的模板。模板都使用了`slot-scope`或`scope`来指定变量名并向子组件传递数据。
         - 在子组件中，定义了一个`games`数组，并将该数组通过`slot`传递给父组件。父组件可以在模板内部使用`slot-scope`或`scope`指定的变量名来访问该数组，并生成不同的内容。
         - 具体来说，第一个模板使用了`<ul>`和`<li>`标签来生成一个无序列表，循环遍历了`scopeData.games`数组并将每个元素作为列表项展示；而第二个模板则使用了`<h4>`标签来生成一个标题，同样循环遍历了`scopeData.games`数组并将每个元素作为一个标题展示。
         - 最终，在子组件的渲染过程中，父组件会根据不同的模板来生成不同的内容，从而实现了子组件内容的自定义。
         - 总之，作用域插槽提供了一种非常灵活的机制，可以帮助我们将组件的渲染逻辑与组件本身解耦，实现更加清晰和高效的代码。

## 17. Vuex

### 1.概念

 在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

[![img](https://github.com/emmmua/study_vue/raw/master/vue_test/..%5C%E8%B5%84%E6%96%99%EF%BC%88%E5%90%AB%E8%AF%BE%E4%BB%B6%EF%BC%89%5C02_%E5%8E%9F%E7%90%86%E5%9B%BE%5Cvuex.png)](https://github.com/emmmua/study_vue/blob/master/vue_test/..\资料（含课件）\02_原理图\vuex.png)

### 2.何时使用？

 多个组件需要共享数据时

### 3.搭建vuex环境

1. 创建文件：`src/store/index.js`

   ```javascript
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

   

2. 在`main.js`中创建vm时传入`store`配置项

   ```javascript
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

   

### 4.基本使用

1. 初始化数据、配置`actions`、配置`mutations`，操作文件`store.js`

   ```javascript
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

   

2. 组件中读取vuex中的数据：`$store.state.sum`

3. 组件中修改vuex中的数据：`$store.dispatch('action中的方法名',数据)` 或 `$store.commit('mutations中的方法名',数据)`

   > 备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写`dispatch`，直接编写`commit`

### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在`store.js`中追加`getters`配置

   ```javascript
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

   

3. 组件中读取数据：`$store.getters.bigSum`

4. 它不是一个必须使用的（所以官方图上也没有展示）

### 6.四个map方法的使用

1. **mapState方法：**用于帮助我们映射`state`中的数据为计算属性

   ```javascript
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

   

2. **mapGetters方法：**用于帮助我们映射`getters`中的数据为计算属性

   ```javascript
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

   

3. **mapActions方法：**用于帮助我们生成与`actions`对话的方法，即：包含`$store.dispatch(xxx)`的函数

   ```javascript
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

   

4. **mapMutations方法：**用于帮助我们生成与`mutations`对话的方法，即：包含`$store.commit(xxx)`的函数

   ```javascript
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（数组形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

   

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 18.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改`store.js`

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          // 这里的state时当前countAbout中的state
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

   

3. 开启命名空间后，组件中读取state数据：

   ```javascript
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

   

4. 开启命名空间后，组件中读取getters数据：

   ```
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

   

5. 开启命名空间后，组件中调用dispatch

   ```javascript
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

   

6. 开启命名空间后，组件中调用commit

   ```javascript
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

## 路由

1. 理解： 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。
2. 前端路由：key是路径，value是组件。
3. 后端路由：value是function，用于处理**请求路径**找到匹配的**函数**来处理(@RequestMapping)

### 1.基本使用

1. 安装vue-router，命令：`npm i vue-router`

2. 应用插件：`Vue.use(VueRouter)`

3. 编写router配置项:

   ```
   //引入VueRouter
   import VueRouter from 'vue-router'
   //引入Luyou 组件
   import About from '../components/About'
   import Home from '../components/Home'
   
   //创建router实例对象，去管理一组一组的路由规则
   const router = new VueRouter({
   	routes:[
   		{
   			path:'/about',
   			component:About
   		},
   		{
   			path:'/home',
   			component:Home
   		}
   	]
   })
   
   //暴露router
   export default router
   ```

   

4. 实现切换（active-class可配置高亮样式）

   ```
   <router-link active-class="active" to="/about">About</router-link>
   ```

   

5. 指定展示位置

   ```
   <router-view></router-view>
   ```

   

### 2.几个注意点

1. 路由组件通常存放在`pages`文件夹，一般组件通常存放在`components`文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载。
3. 每个组件都有自己的`$route`属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，可以通过组件的`$router`属性获取到。
5. 在配置routers时，引入的compoment大小写编译器可能不报错，但是vue编译会报错。

### 3.多级路由（多级路由）

1. 配置路由规则，使用children配置项：

   ```
   routes:[
   	{
   		path:'/about',
   		component:About,
   	},
   	{
   		path:'/home',
   		component:Home,
   		children:[ //通过children配置子级路由
   			{
   				path:'news', //此处一定不要写：/news
   				component:News
   			},
   			{
   				path:'message',//此处一定不要写：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

   

2. 跳转（要写完整路径）：

   ```
   <router-link to="/home/news">News</router-link>
   ```

   

### 4.路由的query参数

1. 传递参数

   ```
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   

2. 接收参数：

   ```
   $route.query.id
   $route.query.title
   ```

   

### 5.命名路由

1. 作用：可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

      

   2. 简化跳转：

      ```
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

      

### 6.路由的params参数

1. 配置路由，声明接收params参数

   ```
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

   

2. 传递参数

   ```
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```
   $route.params.id
   $route.params.title
   ```

   

### 7.路由的props配置

 作用：让路由组件更方便的收到参数

```
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```



### 8.`<router-link>`的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 浏览器的历史记录有两种写入方式：分别为`push`和`replace`，`push`是追加历史记录，`replace`是替换当前记录。路由跳转时候默认为`push`
3. 如何开启`replace`模式：`<router-link replace .......>News</router-link>`

### 9.编程式路由导航

1. 作用：不借助`<router-link> `实现路由跳转，让路由跳转更加灵活

2. 具体编码：

   ```
   //$router的两个API
   this.$router.push({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退（传递数字，根据正负前进和后退）
   ```

   

### 10.缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。

2. 具体编码：

   ```
   <keep-alive include="News"> 
       <router-view></router-view>
   </keep-alive>
   ```

   

- `<keep-alive>`是一个抽象组件，会将其包裹的内容存储在内存中，并在需要时缓存或销毁它们。
- `include="News"`表示只有名称为"News"的组件才应该被缓存。如果不指定`include`属性，则所有组件都将被缓存。
- `<router-view>`用于渲染当前路由匹配到的组件。

因此，这段代码的作用是：当页面切换到名称为"News"的组件时，它会被缓存起来，当用户再次浏览到该组件时，直接从缓存中读取，提高了页面的响应速度和用户体验。

------

如果要缓存多个组件，可以在`<keep-alive>`的`include`属性中指定一个数组来包含多个组件的名称。例如：

```
<keep-alive :include="['News', 'Article', 'Comment']">
  <router-view></router-view>
</keep-alive>
```



在这个例子中，会将名为"News"、"Article"和"Comment"的三个组件都缓存起来。如果需要缓存更多的组件，只需要将它们的名称放入数组即可。

注意：当使用数组形式进行多个组件的缓存时，Vue.js会根据它们在数组中的顺序依次匹配，如果找到匹配的组件，则会缓存它并停止继续匹配，因此，组件的顺序是有影响的，需要根据实际需求进行调整。

### 11.两个新的生命周期钩子

1. 作用：`activated`和`deactivated`是Vue.js中的两个生命周期钩子函数，它们在`<keep-alive>`组件中使用，用于控制被缓存的组件的激活和停用。
2. 功能分别是：
   1. `activated`: 被缓存的组件激活时调用，可以在这里执行一些需要在组件被重新渲染前进行的操作，比如获取最新数据、更新状态等。（激活钩子）
   2. `deactivated`: 被缓存的组件停用时调用，可以在这里执行一些需要在组件被缓存前进行的操作，比如保存当前状态、清空数据等。（失活钩子）

> 具体来说，当一个被缓存的组件被切换到时，会触发`activated`钩子函数；当一个被缓存的组件离开时，会触发`deactivated`钩子函数。

------

使用场景：`<keep-alive>`组件通常用于缓存页面中经常切换的组件，以提高页面的响应速度和用户体验。但是有些情况下，缓存的组件可能需要在每次被重新渲染前或者被缓存前执行一些特定的操作，例如：

- 在页面切换到某个组件时，需要从服务器获取最新的数据。
- 当一个组件被缓存时，需要保存当前选中的状态，以便下次缓存时可以恢复。
- 当一个组件被停用时，需要将一些数据清空或重置。

在这些情况下，就可以使用`activated`和`deactivated`钩子函数来实现这些操作。

### 12.路由守卫

作用：路由守卫的作用是对即将发生的路由变化或已经发生的路由变化进行控制和管理。Vue Router 提供了全局守卫、独享守卫和组件内守卫三种类型的路由守卫。

通过使用路由守卫，我们可以实现以下功能：

- 权限验证：在用户访问某些页面时，需要判断用户是否有访问权限。如果用户没有权限访问该页面，可以通过路由守卫拦截路由跳转，并弹出提示信息。
- 记录浏览历史：在用户浏览网站时，需要记录用户的浏览历史。通过路由守卫，在每次路由变化时记录浏览历史。
- 异步组件处理：在使用异步组件时，需要在组件加载完成之前显示一些占位信息。通过路由守卫，在异步组件加载完成之前显示占位信息。
- 路由重定向：在用户访问某个路径时，需要将用户重定向到其他路径。通过路由守卫，可以在路由跳转之前进行重定向操作。

| 守卫类型   | 使用方法                                                     | 使用场景                                                     |
| ---------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 全局守卫   | 通过 `router.beforeEach()` 方法注册回调函数、`router.afterEach()` 方法注册后置守卫、`router.beforeResolve()` 方法解析异步路由组件 | 可以用于验证用户是否已经登录、记录用户浏览记录等全局操作     |
| 独享守卫   | 在具体的路由配置中使用 `beforeEnter` 方法注册回调函数        | 仅对该路由生效，可以用于验证当前用户的权限是否能够访问该路由 |
| 组件内守卫 | 在组件内部使用 `beforeRouteEnter`、`beforeRouteUpdate` 和 `beforeRouteLeave` 方法注册回调函数 | 可以用于在组件内部做一些路由相关的处理操作                   |

Vue Router 提供了全局守卫、独享守卫和组件内守卫三种路由守卫。

- 全局守卫: 适用于全局性的路由验证和处理操作。可通过 `router.beforeEach()` 方法注册前置守卫回调函数，在路由跳转之前进行验证或者全局处理操作；可通过 `router.afterEach()` 方法注册后置守卫回调函数，在路由跳转之后进行操作；可通过 `router.beforeResolve()` 方法解析异步路由组件。
- 独享守卫: 适用于对某个具体路由做权限验证和特殊处理等操作。可在具体的路由配置中使用 `beforeEnter` 方法注册回调函数。
- 组件内守卫: 适用于在组件内部做一些路由相关的处理操作。可在组件内部使用 `beforeRouteEnter`、`beforeRouteUpdate` 和 `beforeRouteLeave` 方法注册回调函数，分别对应组件被创建之前、组件复用时和组件离开时执行的回调函数。

需要注意的是，在全局守卫和独享守卫中，需要调用 `next()` 方法，否则路由会一直停留在当前页面；在组件内守卫中，可以通过回调函数中的 `next()` 方法来控制路由跳转，并且在 `beforeRouteLeave` 钩子函数中无法阻止路由跳转。

下面是各个守卫的使用示例：

1. 全局守卫

```
router.beforeEach((to, from, next) => {
  // 在这里进行路由验证或者全局处理操作
  next(); // 调用 next() 方法，继续路由跳转
});

router.afterEach((to, from) => {
  // 在这里进行路由跳转之后的操作
});

router.beforeResolve((to, from, next) => {
  // 在这里进行异步路由组件的解析
  next(); // 调用 next() 方法，继续路由跳转
});
```



1. 独享守卫

```
{
  path: '/user/:id',
  component: User,
  beforeEnter: (to, from, next) => {
    // 在这里进行路由验证或者特殊处理操作
    next(); // 调用 next() 方法，继续路由跳转
  }
}
```



1. 组件内守卫

```
export default {
  beforeRouteEnter(to, from, next) {
    // 在组件还没有被渲染出来时执行，无法访问 this 实例
    next();
  },
  beforeRouteUpdate(to, from, next) {
    // 在组件复用时执行，可以访问 this 实例
    next();
  },
  beforeRouteLeave(to, from, next) {
    // 在组件离开时执行，可以访问 this 实例，但是无法阻止路由跳转
    next();
  }
}
```



除了上述守卫之外，还有两种全局守卫。

- `beforeResolve`: 在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后调用。这可以用来确保在渲染组件之前，所有的异步组件都已经加载完毕。
- `onError`: 当导航过程中出现未捕获的错误时调用。需要注意的是，如果在一个路由守卫中抛出了一个错误，此错误将会被传递到最后一个激活的全局错误处理程序。

#### 数据存储位置

- 存储在 Vuex 中：适用于需要共享变量的情况，可以让不同组件之间共享变量，并且可以在全局守卫、独享守卫和组件内守卫中进行访问。由于需要安装和配置 Vuex，因此相对麻烦一些。

```
// 首先，在 Vuex 中定义一个状态
const state = {
  isAuthenticated: false // 是否已经登录
}
...
// 在需要进行变量判断的地方，通过 mutations 修改状态
this.$store.commit('setAuthenticated', true);
...
// 在路由守卫中访问状态
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.state.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
});
```



- 存储在当前组件数据中：适用于只需要在当前组件进行变量判断的情况，可以在组件内部直接进行访问和修改，但是无法在其他组件和路由中共享变量。

```
// 在组件的 data 选项中定义一个变量
data() {
  return {
    isAuthenticated: false // 是否已经登录
  }
},
...
// 在需要进行变量判断的地方，修改变量的值
this.isAuthenticated = true;
...
// 在组件内守卫中访问变量
beforeRouteEnter(to, from, next) {
  if (!this.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
}
```



- 存储在路由中：适用于只需要在当前路由进行变量判断的情况，可以在独享守卫和组件内守卫中进行访问。但是会导致路由配置变得臃肿，不易于维护。

```
// 在路由配置中定义一个变量
const routes = [
  {
    path: '/home',
    component: Home,
    meta: {
      requiresAuth: true // 是否需要登录权限
    }
  },
  // ...
]
...
// 在需要进行变量判断的地方，通过 meta 属性修改变量的值
this.$router.push({
  path: '/home',
  meta: {
    requiresAuth: true,
    isAuthenticated: true
  }
})
// 在独享守卫和组件内守卫中访问变量
beforeEnter(to, from, next) {
  if (!to.meta.isAuthenticated) {
    next('/login');
  } else {
    next();
  }
}

beforeRouteEnter(to, from, next) {
  if (!to.meta.isAuthenticated) {
    next('/login');
  } else {
    next(vm => {
      vm.isAuthenticated = to.meta.isAuthenticated;
    });
  }
}
```



需要注意的是，在进行路由跳转之前，需要根据变量的值决定是否进行路由跳转，并且在组件内守卫中访问变量时，需要使用 `next` 方法的回调函数来更新组件的数据。另外，将变量存储在路由中会导致路由配置变得臃肿，不易于维护，因此建议在需要共享变量的情况下使用 Vuex 状态管理中心。

### 13.路由器的两种工作模式

Vue Router 有两种工作模式：`hash` 模式和 `history` 模式。

#### 1.`hash` 模式

在 `hash` 模式中，URL 中的路径部分以 `#` 开头，并且后面紧跟着一个由路由器管理的字符串，hash值不会包含在 HTTP 请求中。例如，下面的 URL 表示访问 `/home` 路径：

```
http://localhost:8080/#/home
```



通过 `hash` 模式可以实现单页应用程序（SPA）的核心功能：在网页内部跳转而不需要刷新整个页面。当用户点击链接或者触发事件时，Vue Router 会解析 URL 中的 `hash` 部分，然后根据匹配的路由规则进行组件的渲染和显示。

#### 2.`history` 模式

在 `history` 模式中，URL 中的路径部分不再使用 `#` 符号，而是直接使用正常的路径。例如，下面的 URL 表示访问 `/home` 路径：

```
http://localhost:8080/home
```



通过 `history` 模式可以实现更加友好的 URL，同时也可以在浏览器历史记录中记录用户浏览的页面，从而使用户可以使用“前进”、“后退”按钮进行导航。

要使用 `history` 模式，需要在创建 Vue Router 实例时配置 `mode: 'history'`，如下所示：

```
const router = new VueRouter({
  mode: 'history',
  routes: [
    ...
  ]
})
```



需要注意的是，在使用 `history` 模式时，需要后端服务器进行配置，以保证在刷新页面时能够正确地返回对应的页面。否则，可能会出现 404 错误或者其他问题。

#### 两种模式比较

1. 对于一个url来说，什么是hash值？—— #及其后面的内容就是hash值。
2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。
3. hash模式：
   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。
4. history模式：
   1. 地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。

## 14 vue的打包命令

使用 `npm` 工具的 `vue` 命令可以方便地创建和管理 Vue 项目。

### 创建项目

要创建一个新的 Vue 项目，可以使用以下命令：

```
# 全局安装 vue-cli
npm install -g @vue/cli

# 创建新项目
vue create my-project
```



在上面的命令中，首先需要全局安装 `vue-cli` 工具。然后，在命令行中输入 `vue create my-project`，其中 `my-project` 是项目名称，会自动创建一个新的 Vue 项目，并且会提示选择一些配置项，比如 Babel、ESLint、CSS 预处理器等。

### 运行项目

创建完 Vue 项目后，可以使用以下命令来运行项目：

```
# 进入项目目录
cd my-project

# 启动开发服务器
npm run serve
```



在上面的命令中，`npm run serve` 用于启动开发服务器，并在浏览器中自动打开网页进行预览。每次修改代码后，开发服务器都会自动重新编译并刷新浏览器，以方便开发调试。

### 打包项目

在完成项目开发后，可以使用以下命令将项目打包成静态资源文件：

```
# 打包项目
npm run build
```



在上面的命令中，`npm run build` 用于将项目打包成静态资源文件，并保存到 `dist` 目录中。可以将该目录下的文件上传到服务器进行部署，从而让用户访问你的应用程序。

需要注意的是，在打包项目之前，可以通过修改 `vue.config.js` 文件来进行一些配置，比如自定义构建目录、设置代理、添加插件等。

## 15 项目上传到服务器

在使用 Vue CLI 打包项目后，可以将生成的静态资源文件部署到后端服务器上。下面以 Nginx 为例，介绍如何部署 Vue 项目：

1. 将打包生成的 `dist` 目录中的所有文件上传到服务器上。

2. 安装 Nginx，并创建一个新的 Nginx 配置文件 `/etc/nginx/sites-available/my-project`，其中 `my-project` 是你的项目名称。可以使用以下命令创建该文件：

   ```
   sudo nano /etc/nginx/sites-available/my-project
   ```

   

3. 在该配置文件中添加以下内容：

   ```
   server {
       listen 80;
       server_name my-project.com; # 修改为你的域名或者 IP 地址
   
       root /var/www/my-project; # 修改为你的项目目录
       index index.html;
   
       location / {
           try_files $uri $uri/ /index.html;
       }
   }
   ```

   

   在上面的配置中，`server_name` 表示你的项目对应的域名或者 IP 地址。`root` 表示你的项目所在的目录，如果需要使用别名或者子目录，可以修改为相应的路径。`location` 表示请求的 URL 对应的本地文件路径。由于 Vue Router 是基于 HTML5 History API 实现的，因此需要将所有请求都指向 `index.html` 文件，从而保证能够正确地渲染页面。

4. 创建符号链接 `/etc/nginx/sites-enabled/my-project`，并重启 Nginx：

   ```
   sudo ln -s /etc/nginx/sites-available/my-project /etc/nginx/sites-enabled/
   sudo systemctl restart nginx
   ```

   

   在上面的命令中，`ln -s` 表示创建符号链接，将 `sites-available` 目录下的配置文件链接到 `sites-enabled` 目录中。`systemctl restart nginx` 用于重启 Nginx 服务器，以使新的配置生效。

5. 最后，在浏览器中输入你的域名或者 IP 地址访问应用程序即可。如果一切正常，应该能够看到 Vue 应用程序的页面。

需要注意的是，在部署 Vue 项目时，需要确保后端服务器正确配置了跨域请求，并且在进行 API 请求时需要将请求路径设置为相对路径，比如 `/api/user`。同时，要确保静态资源可以被访问到，并且需要进行安全性、性能等方面的优化和调整。

## 16 Vue UI 组件库

### 1.移动端常用 UI 组件库

Vant https://youzan.github.io/vant

Cube UI https://didi.github.io/cube-ui

Mint UI [http://mint-ui.github.io](http://mint-ui.github.io/)

### 2. PC 端常用 UI 组件库

Element UI [https://element.eleme.cn](https://element.eleme.cn/)

IView UI [https://www.iviewui.com](https://www.iviewui.com/)
