<template>
  <header class="header element" :class="{
    elevation: scrollPosition > 10 }">
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
  data() {
    return {
      scrollPosition: Number,
    };
  },
  methods: {
    updateScroll() {
      this.scrollPosition = window.scrollY;
      console.log(this.scrollPosition);
    },
  },
  mounted() {
    window.addEventListener("scroll", this.updateScroll);
  },
  destroy() {
    window.removeEventListener("scroll", this.updateScroll);
  },
};
</script>

<style lang="scss">
@import "../scss/variable.scss";
.elevation {
  box-shadow: 0px 2px 5px 0px rgba(0,0,0,0.75);
}
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
  transition: $transition, box-shadow 300ms ease;
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
