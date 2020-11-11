<template>
  <div
    :class="{
      darkModeElements: $store.getters.theme,
      lightModeElements: !$store.getters.theme,
    }"
  >
    {{ item }}
  </div>
</template>

<script>
export default {
  props: {
    item: String,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable.scss";

div {
  border-radius: 5px;
  flex-wrap: wrap;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100px;
  box-shadow: 0px 0px 2px rgba(0, 0, 0, 1);
  padding: 5px 20px;
  margin: 2px;
}
</style>
