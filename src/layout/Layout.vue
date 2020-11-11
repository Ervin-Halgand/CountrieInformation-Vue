<template>
  <div
  class="layout"
    :class="{
      darkModeBackground: $store.getters.theme,
      lightModeBackground: !$store.getters.theme,
    }"
  >
    <Header title="Where in the world?" />
    <Countries />
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import Countries from "../views/Countries";

export default {
  components: {
    Header,
    Countries,
  },
};
</script>

<style lang="scss">
@import "../scss/variable.scss";

.layout {
  min-height: 100vh;
}

.darkModeElements,
.lightModeElements {
  transition: background-color $animationTime $animationCurve;
}
.darkModeElements {
  background-color: $darkBlue;
}
.lightModeElements {
  background-color: $white;
}

.lightModeBackground,
.darkModeBackground {
  transition: background-color $animationTime $animationCurve;
}

.darkModeBackground {
  background-color: $veryDarkBlue;
}
.lightModeBackground {
  background-color: $veryLightGray;
}
.darkModeBackground * {
  color: $white;
}

.lightModeBackground * {
  color: $veryDarkBlueTexte;
}
</style>
