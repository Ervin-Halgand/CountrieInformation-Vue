<template>
  <header class="header element">
    <h1>{{ title }}</h1>
    <ButtonImage
      title="Dark Mode"
      @click="$store.dispatch('toggleTheme')"
      :imageUrl="!$store.getters.theme ? 'moon-outline.svg' : 'moon.svg'"
    />
  </header>
</template>

<script>
import ButtonImage from "@/components/ButtonImage";
export default {
  name: "Header",
  components: { ButtonImage },
  props: {
    title: String,
  },
};
</script>

<style lang="scss">
@import "../scss/variable.scss";

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
  transition: $transition;
  * {
    transition: $transition;
  }
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
  button {
    transform: scale(0.7);
  }
}

@media only screen and (max-width: 300px) {
  .header {
    padding: 20px 10px;
    * {
      font-size: 10px;
    }
  }
  button {
    transform: scale(0.5);
  }
}
</style>
