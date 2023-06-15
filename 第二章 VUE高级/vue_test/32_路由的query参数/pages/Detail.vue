<template>
  <ul>
    <li>消息编号:{{ this.$route.query.id }}</li>
    <li>消息内容:{{ this.$route.query.title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
};
</script>

<style>
</style>