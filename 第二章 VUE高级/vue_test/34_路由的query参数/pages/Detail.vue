<template>
  <ul>
    <li>消息编号:{{ this.$route.params.id }}</li>
    <li>消息内容:{{ this.$route.params.title }}</li>
  </ul>
</template>

<script>
export default {
  name: "Detail",
};
</script>

<style>
</style>