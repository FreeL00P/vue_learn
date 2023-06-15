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
};
</script>