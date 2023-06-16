<template>
  <ul>
    <li :style="{ opacity }">欢迎━(*｀∀´*)ノ亻!</li>
    <li>news001<input type="text" /></li>

    <li>news002<input type="text" /></li>

    <li>news003<input type="text" /></li>
  </ul>
</template>

<script>
export default {
  name: "News",
  data() {
    return {
      opacity: 1,
    };
  },
  // beforeDestroy() {
  //   console.log("News即将被销毁");
  //   clearInterval(this.timer);
  // },
  // mounted() {
  //   this.timer = setInterval(() => {
  //     console.log("@");
  //     this.opacity = this.opacity - 0.1;
  //     if (this.opacity <= 0) {
  //       this.opacity = 1;
  //     }
  //   }, 16);
  // },
  activated() {
    console.log("News组件被激活");
    this.timer = setInterval(() => {
      console.log("@");
      this.opacity = this.opacity - 0.1;
      if (this.opacity <= 0) {
        this.opacity = 1;
      }
    }, 16);
  },
  deactivated() {
    console.log("News组件被停用");
    clearInterval(this.timer);
  },
};
</script>