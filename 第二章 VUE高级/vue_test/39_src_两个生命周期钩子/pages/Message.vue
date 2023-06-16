<template>
  <div>
    <ul>
      <li v-for="msg in messageList" :key="msg.id">
        <!-- 跳转路由并携带params参数 字符串写法-->
        <!-- <router-link :to="`/home/message/detail/${msg.id}/${msg.title}`">{{
          msg.title
        }}</router-link
        >-->
        <!-- 跳转路由并携带query参数 对象写法-->
        <router-link
          replace
          :to="{
            // path: '/home/message/detail',
            //使用params参数时，必须指定name属性 不能使用path属性
            name: 'xiangqing', // 通过命名路由跳转
            // params: { id: msg.id, title: msg.title },
            query: { id: msg.id, title: msg.title },
          }"
          >{{ msg.title }}</router-link
        >;
        <button @click="pushShow(msg)">push查看</button>
        <button @click="replaceShow(msg)">replace查看</button>
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
  methods: {
    pushShow(msg) {
      this.$router.push({
        name: "xiangqing",
        query: { id: msg.id, title: msg.title },
      });
    },
    replaceShow(msg) {
      this.$router.replace({
        name: "xiangqing",
        query: { id: msg.id, title: msg.title },
      });
    },
  },
  beforeDestroy() {
    console.log("Message即将被销毁");
  },
};
</script>