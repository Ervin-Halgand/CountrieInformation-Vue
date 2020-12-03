<template>
  <div class="card background" @click="$emit('click', info)">
    <img ref="img" :alt="`flag-${info.name}`" :src="info.flag" />
    <div v-if="info.flag" class="description element">
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
  transition: background-color 1s ease, color 1s ease;
  height: 150px;
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

.card {
  display: flex;
  flex-direction: column;
  max-width: 340px;
  min-width: 200px;
  min-height: 200px;
  border-radius: 5px;
  box-shadow: var(--boxShadow);
  transition: transform 500ms ease;
  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  &:hover {
    cursor: pointer;
    transform: scale(1.015);
  }
}
</style>
