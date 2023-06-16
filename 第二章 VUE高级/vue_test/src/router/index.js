// 该文件专门用于创建整个应用的路由器
import VueRouter from "vue-router";
//引入组件
import About from "../pages/About";
import Home from "../pages/Home";
import Message from "../pages/Message";
import News from "../pages/News";
import Detail from "../pages/Detail";

//创建并暴露一个路由器
const router = new VueRouter({
  routes: [
    {
      name: "guanyu",
      path: "/about",
      component: About,
      meta: { isAuth: false },
    },
    {
      path: "/home",
      component: Home,
      children: [
        {
          path: "news", //不需要加/
          component: News,
        },
        {
          path: "message",
          component: Message,
          children: [
            {
              name: "xiangqing",
              // path: "detail/:id/:title",
              path: "detail",
              component: Detail,
              //props的第一种写法，值为对象，该对象中的所有key-value都会以props的形式传给Detail组件
              //props: { a: 1, b: "hello" },
              //props的第二种写法，值为布尔值，若布尔值为真，则把该路由收到的所有params参数，以props的形式传给Detail组件
              props: true,
              //props的第三种写法，值为函数
              props($route) {
                return {
                  id: $route.query.id,
                  title: $route.query.title,
                };
              },
            },
          ],
        },
      ],
      meta: { isAuth: true },
    },
  ],
});
//全局前置路由守卫
//参数1：to，即将要进入的目标路由对象
//参数2：from，当前导航正要离开的路由对象
//参数3：next，调用该方法后，才能进入下一个钩子
// router.beforeEach((to, from, next) => {
//   console.log("beforeEach", to, from);
//   //什么时候放行
//   // if (localStorage.getItem("school") === "湖南工程学院") {
//   //   next();
//   // }
//   if (to.meta.isAuth) {
//     if (localStorage.getItem("school") === "湖南工程学院") {
//       next();
//     } else {
//       alert("学校名不对，无权限查看");
//     }
//   } else {
//     next();
//   }
// });

// //全局后置路由守卫 -- 初始化的时候被调用，每次路由切换之后被调用
// router.afterEach((to, from) => {
//   console.log("afterEach", to, from);
// });
//独享路由守卫
// beforeEnter: (to, from, next) => {
//   console.log("beforeEach", to, from);
//   //什么时候放行
//   // if (localStorage.getItem("school") === "湖南工程学院") {
//   //   next();
//   // }
//   if (to.meta.isAuth) {
//     if (localStorage.getItem("school") === "湖南工程学院") {
//       next();
//     } else {
//       alert("学校名不对，无权限查看");
//     }
//   } else {
//     next();
//   }
// };
export default router;
