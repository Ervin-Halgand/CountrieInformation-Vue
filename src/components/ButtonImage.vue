<template>
  <button
    @click="$emit('click')"
    :class="{
      darkModeBorder: $store.getters.theme,
      lightModeBorder: !$store.getters.theme,
    }"
  >
    <img :src="require(`@/assets/${imageUrl}`)" />
    {{ title }}
  </button>
</template>

<script>
export default {
  name: "ButtonImage",
  props: {
    title: String,
    imageUrl: String,
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable.scss";

button {
    background-color: transparent;
    padding: 10px 10px;
    display: flex;
    align-items: center;
    margin-left: auto;
    border-radius: 20px;
    outline: none;
    font-weight: 600;
    &:hover {
      cursor: pointer;
    }
  }
  button img {
    margin-right: 10px;
    height: 17px;
  }

.darkModeBorder {
  border: 1px solid $white;
  &:hover {
    /* filter: drop-shadow(0px 0px 10px $white); */
  }
}

.lightModeBorder {
  border: 1px solid $darkGray;
  &:hover {
    /* filter: drop-shadow(0px 0px 10px black); */
  }
}
</style>
