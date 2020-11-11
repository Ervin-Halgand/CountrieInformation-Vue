<template>
  <div id="app">
    <Layout />
  </div>
</template>

<script>
import Layout from "./layout/Layout.vue";

export default {
  name: "App",
  components: {
    Layout,
  },
};
</script>
<style lang="scss">

::-webkit-scrollbar {
    width: 0px;
    background: transparent;
}
* {
  background-color: transparent;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Nunito Sans", sans-serif;
}
</style>
