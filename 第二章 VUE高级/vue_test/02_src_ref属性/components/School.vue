<template>
  <div class="school">
    <h2>学校:{{name}}}</h2>
    <p>学校的内容:{{ address }}}</p>
  </div>
</template>

<script>
    export default {
        name: 'School',
        data() {
            return {
                name: '清华大学',
                address: '北京市海淀区'
            }
        }
    }
</script>

<style>
    .school {
        color: gray;
        background-color: azure;
    }
</style>