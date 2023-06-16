<template>
  <h2>我是About的内容</h2>
</template>

<script>
export default {
  name: "About",
  beforeDestroy() {
    console.log("About即将被销毁");
  },
  mounted() {
    console.log("About组件挂载完毕");
    window.aboutRoute = this.$route;
    window.aboutRouter = this.$router;
  },
  //进入该组件时被调用
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter", to, from);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log("beforeRouteUpdate", to, from);
    next();
  },
  //离开该组件时被调用
  beforeRouteLeave(to, from, next) {
    console.log("beforeRouteLeave", to, from);
    next();
  },
};
</script>