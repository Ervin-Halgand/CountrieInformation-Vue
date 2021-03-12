<template>
  <section class="card background" @click="$emit('click', info)">
    <img ref="img" :alt="`flag-${info.name}`" width="380" height="200" :src="info.flag" />
    <div v-if="info.flag" class="description element">
      <h4>
        {{ info.name }}
      </h4>
      <ul>
        <li>
          <h6 class="heading">Population:</h6>
          {{ info.population.toLocaleString().replaceAll(",", " ") }}
        </li>
        <li><h6 class="heading">Region:</h6> {{ info.region }}</li>
        <li><h6 class="heading">Capital:</h6> {{ info.capital }}</li>
      </ul>
    </div>
  </section>
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

.heading {
  display: inline-block;
  font-weight: bold;
}
.description {
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: flex-start;
  padding: 10px 20px;
  padding-bottom: 30px;
  transition: $transition;
  height: 150px;
  h4 {
    font-size: 20px;
    font-weight: 800;
    margin-bottom: 10px;
  }
  h6 {
    font-size: 14px;
    font-weight: 800;
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
  width: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 5px;
  box-shadow: var(--boxShadow);
  transition: transform 500ms ease;
  img {
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    width: 100%;
    height: 200px;
    object-fit: cover;
    border-bottom: solid 1px rgba(0, 0, 0, 0.1);
  }
  &:hover {
    cursor: pointer;
    transform: translateY(-.35em) scale(1.01);
  }
}
</style>
