<template>
  <div>
    <ul>
      <li v-for="msg in messageList" :key="msg.id">
        <!-- 跳转路由并携带params参数 字符串写法-->
        <!-- <router-link :to="`/home/message/detail/${msg.id}/${msg.title}`">{{
          msg.title
        }}</router-link
        >&nbsp;&nbsp; -->
        <!-- 跳转路由并携带query参数 对象写法-->
        <router-link
          :to="{
            // path: '/home/message/detail',
            //使用params参数时，必须指定name属性 不能使用path属性
            name: 'xiangqing', // 通过命名路由跳转
            params: { id: msg.id, title: msg.title },
          }"
          >{{ msg.title }}</router-link
        >&nbsp;&nbsp;
      </li>
      <hr />
      <router-view></router-view>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Message",
  data() {
    return {
      messageList: [
        { id: 1, title: "消息1" },
        { id: 2, title: "消息2" },
        { id: 3, title: "消息3" },
      ],
    };
  },
};
</script>