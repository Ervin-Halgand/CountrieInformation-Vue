<template>
  <select
    v-model="selected"
    class="selecte element"
    @change="$emit('selectevalue', selected)"
  >
    <option value="">Filter By Region</option>
    <template v-for="region in regions">
      <option :key="region">{{ region }}</option>
    </template>
  </select>
</template>

<script>
export default {
  data() {
    return {
      selected: "",
      regions: ["Africa", "Americas", "Asia", "Europe", "Oceania"],
    };
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable.scss";
.selecte {
  box-shadow: 0px 0px 51px -20px rgba(0, 0, 0, 0.75);
  border-radius: 5px;
  padding: 20px 15px;
  padding-right: 30px;
  font-size: 1em;
  border: none;
  outline: none;
  transition: var(--transition);
}
</style>
