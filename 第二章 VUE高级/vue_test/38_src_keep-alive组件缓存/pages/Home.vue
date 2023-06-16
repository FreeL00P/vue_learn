<template>
  <div>
    <h2>Home组件内容</h2>
    <div>
      <ul class="nav nav-tabs">
        <li>
          <router-link
            class="list-group-item"
            active-class="active"
            to="/home/news"
            >News</router-link
          >
        </li>
        <li>
          <router-link
            class="list-group-item"
            active-class="active"
            to="/home/message"
            >Message</router-link
          >
        </li>
      </ul>
      <!-- 让不展示的组件保持挂载，不被销毁，如果不指定include组件名默认缓存全部 -->
      <keep-alive include="News">
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  beforeDestroy() {
    console.log("Home即将被销毁");
  },
  mounted() {
    console.log("Home组件挂载完毕");
    window.homeRoute = this.$route;
    window.homeRouter = this.$router;
  },
};
</script>