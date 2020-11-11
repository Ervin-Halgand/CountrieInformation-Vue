<template>
  <header
    class="header"
    :class="{
      darkModeElements: $store.getters.theme,
      lightModeElements: !$store.getters.theme,
    }"
  >
    <h1>{{ title }}</h1>
    <button @click="$store.dispatch('toggleTheme')">
      <img v-if="!$store.getters.theme" src="../assets/moon-outline.svg" />
      <img v-else src="../assets/moon.svg" />
      Dark Mode
    </button>
    <!-- <div
      :class="{
        endDarkMode: $store.getters.theme,
        endLightMode: !$store.getters.theme,
      }"
    ></div> -->
  </header>
</template>

<script>
export default {
  name: "Header",
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
.header {
  position: -webkit-sticky; /* Safari */
  position: sticky;
  top: 0;
  width: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 50px;
  * {
    background-color: transparent;
  }
}

.header button {
  padding: 10px 10px;
  display: flex;
  align-items: center;
  margin-left: auto;
  border: none;
  border-radius: 20px;
  outline: none;
  font-weight: 600;
  &:hover {
    cursor: pointer;
  }
}
.header button img {
  margin-right: 10px;
  height: 17px;
}

.endLightMode {
  height: 3px;
  background-color: hsl(0, 0%, 95%);
  transition: background-color 1s ease-in-out;
}
.endDarkMode {
  height: 3px;
  background-color: hsl(203, 22%, 12%);
  transition: background-color 1s ease-in-out;
}

@media only screen and (max-width: 600px) {
  .header {
    padding: 20px 10px;
    * {
      font-size: 14px;
    }
  }
}

@media only screen and (max-width: 300px) {
  .header {
    padding: 20px 10px;
    * {
      font-size: 10px;
    }
  }
}
</style>
