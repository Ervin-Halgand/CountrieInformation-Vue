<template>
  <div :data-theme="$store.getters.theme && 'dark'" class="layout background">
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
:root {
  --darkBlue: hsl(209, 23%, 22%);
  --veryDarkBlue: hsl(207, 26%, 17%);
  --veryDarkBlueTexte: hsl(200, 15%, 8%);
  --white: hsl(0, 0%, 100%);
  --darkGray: hsl(0, 0%, 52%);
  --veryLightGray: hsl(0, 0%, 98%);
  --animationTime: 1s;
  --animationCurve: ease-in-out;
  --boxShadow: 0px 0px 51px -20px rgba(0, 0, 0, 0.75);

  --element-color: var(--white);
  --text-color: black;
  --container-color: var(--veryLightGray);
  --transition: background-color 1s ease, color 1s ease;

}
[data-theme="dark"] {
  --element-color: var(--darkBlue);
  --text-color: var(--white);
  --container-color: var(--veryDarkBlue);
  --boxShadow: none;
}

.darkModeElements {
  background-color: $darkBlue;
}
.lightModeElements {
  background-color: $white;
}

.background {
  background-color: var(--container-color);
  color: var(--text-color);
  * {
    color: var(--text-color);
  }
}

.element {
  background-color: var(--element-color);
  color: var(--text-color);
  * {
    color: var(--text-color);
  }
}

.lightModeBackground * {
  color: var(--veryDarkBlueTexte)
}
</style>
