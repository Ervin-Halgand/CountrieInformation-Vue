<template>
  <div
    class="card"
    :class="{
      animation__pop: reloadCard,
      darkModeElements: $store.getters.theme,
      lightModeElements: !$store.getters.theme,
    }"
    @click="$emit('click', info)"
  >
    <img ref="img" :alt="`flag-${info.name}`" :src="info.flag" />
    <div
      v-if="info.flag"
      class="description"
      :class="{
        darkModeElements: $store.getters.theme,
        lightModeElements: !$store.getters.theme,
      }"
    >
      <h6>
        {{ info.name }}
      </h6>
      <ul>
        <li>
          <strong>Population:</strong>
          {{ info.population.toLocaleString().replaceAll(",", " ") }}
        </li>
        <li><strong>Region:</strong> {{ info.region }}</li>
        <li><strong>Capital:</strong> {{ info.capital }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    info: Object,
    reload: String,
  },
  mounted() {
    this.$watch(
      () => {
        return this.$refs.img;
      },
      (val) => {
        alert("App $watch $refs.complete: " + val);
      }
    );
  },
  data() {
    return {
      reloadCard: Boolean,
      ref: null,
    };
  },
  watch: {
    reload() {
      this.reloadCard = false;
      setTimeout(() => {
        this.reloadCard = true;
      }, 0);
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variable.scss";
.description {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  padding-bottom: 30px;
  h6 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  ul {
    font-size: 14px;
    list-style: none;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  ul li {
    margin-bottom: 4px;
  }
}

.animation__pop {
  animation: pop 1s forwards;
  @keyframes pop {
    to {
      transform: scale(1, 1);
    }
  }
}
.card {
  transform: scale(0, 0);
  display: flex;
  flex-direction: column;
  max-width: 350px;
  min-width: 200px;
  min-height: 200px;
  margin-bottom: 60px;
  border-radius: 5px;
  box-shadow: $boxShadow;
  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  &:hover {
    cursor: pointer;
  }
}
</style>
