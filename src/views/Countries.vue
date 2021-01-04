<template>
  <div class="content background">
    <div>
      <div
        class="filter"
        :class="{
          filterDarkMode: $store.getters.theme,
          filterLightMode: !$store.getters.theme,
        }"
      >
        <autocomplete
          :search="search"
          placeholder="Search for a country..."
          aria-label="Search for a country..."
          auto-select
          @submit="submit"
        >
        </autocomplete>
        <div>
          <Selecte @selectevalue="updateRegionFiltered" />
        </div>
      </div>

      <div class="card__handler" v-if="!loading">
        <template v-for="n in 10">
          <CardLoader :key="n" />
        </template>
      </div>
      <transition-group name="list" class="card__handler" v-else appear>
        <template v-for="(countrieInfo, i) in this.filterCardHandler">
          <Card
            :info="countrieInfo"
            :key="i"
            :load="loadCard"
            :reload="filter"
            @click="countrieclicked"
          />
        </template>
      </transition-group>
    </div>
    <CoutrieInformations
      v-if="itemCountrieSelected"
      :open="showMoreInformation"
      @close="showMoreInformation = false"
      :countrie="itemCountrieSelected"
    />
  </div>
</template>

<script>
import Card from "../components/card";
import Autocomplete from "@trevoreyre/autocomplete-vue";
import "@trevoreyre/autocomplete-vue/dist/style.css";
import Selecte from "../components/SelecteComponent";
import CoutrieInformations from "@/components/CoutrieInformations";
import CardLoader from "@/components/skeletonLoader/CardLoader";
import axios from "axios";

export default {
  name: "Countries",
  components: {
    Card,
    Autocomplete,
    Selecte,
    CoutrieInformations,
    CardLoader,
  },
  mounted() {
    this.loading = false;
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => {
        this.countriesInformations = response.data;
        this.countriesName = response.data.map((item) => {
          return item.name;
        });
      })
      .finally(() => {
        setTimeout(() => {
          this.loading = true;
          this.loadCard = true;
        }, 1500);
      });
  },
  data() {
    return {
      loading: false,
      countriesName: [],
      countriesInformations: [],
      filter: null,
      loadCard: false,
      inputSearch: "",
      inputResults: [],
      showMoreInformation: false,
      itemCountrieSelected: null,
    };
  },
  computed: {
    countrieFilteredByRegion() {
      if (this.filter)
        return this.countriesInformations.filter(
          (country) => country.region === this.filter
        );
      return this.countriesInformations;
    },
    filterCardHandler() {
      return this.inputSearch.length > 0
        ? this.inputResults
        : this.countrieFilteredByRegion;
    },
    countrieNameFilteredByRegion() {
      if (this.filter)
        return this.countriesInformations
          .filter((country) => country.region === this.filter)
          .map((item) => item.name);
      return this.countriesInformations.map((item) => item.name);
    },
    inputSearchOrfilter() {
      return `${this.inputSearch}|${this.filter}`;
    },
  },
  watch: {
    inputSearchOrfilter(newVal, oldVal) {
      const [oldInputSearch, oldFilter] = oldVal.split("|");
      const [newInputSearch, newFilter] = newVal.split("|");
      if (newInputSearch !== oldInputSearch || newFilter !== oldFilter) {
        this.inputResults = [];
        let results = this.countrieNameFilteredByRegion.filter((country) => {
          return country.toLowerCase().startsWith(newInputSearch.toLowerCase());
        });
        results.forEach((value) => {
          this.inputResults.push(
            this.countrieFilteredByRegion.filter(
              (country) => country.name === value
            )[0]
          );
        });
      }
    },
  },
  methods: {
    getBordersFullName(info) {
      let borderCountries = [];
      this.countriesInformations.forEach((code) => {
        let tmp = info.borders.indexOf(code.alpha3Code);
        if (tmp !== -1) borderCountries.push(code.name.split(" ")[0]);
      });
      return borderCountries;
    },
    countrieclicked(info) {
      this.showMoreInformation = true;
      this.itemCountrieSelected = JSON.parse(JSON.stringify(info));
      this.itemCountrieSelected.borders = this.getBordersFullName(
        this.itemCountrieSelected
      );
    },
    submit(countrieSelected) {
      this.inputSearch = countrieSelected;
    },
    search(input) {
      this.inputSearch = input;
      if (!input) return [];
      if (input.length < 1) return [];
      return this.countrieNameFilteredByRegion.filter((country) => {
        return country.toLowerCase().startsWith(input.toLowerCase());
      });
    },
    updateRegionFiltered(newFilter) {
      this.filter = newFilter;
    },
  },
};
</script>

<style lang="scss">
@import "../scss/variable.scss";

.list-enter-active,
.list-leave,
.list-leave-to {
  transform: scale(0);
}

.list-leave-active {
  transition: all 500ms ease;
  transform: scale(0);
}
.list-move {
  transition: transform 1s;
}

.content {
  padding: 1px 50px;
  position: relative;
  transition: $transition;
}

.filterDarkMode > div *,
.filterLightMode > div * {
  box-shadow: var(--boxShadow);
  border: none;
  transition: background-color 1s ease;
}
.filterDarkMode > div * {
  &::placeholder {
    color: $white;
  }
  * {
    &:focus {
      box-shadow: var(--boxShadow);
      background-color: $darkBlue;
    }
    background-color: $darkBlue;
    color: $white;
  }
}

.filterLightMode > div * {
  &::placeholder {
    color: $veryDarkBlueTexte;
  }
  * {
    &:focus {
      box-shadow: var(--boxShadow);
      background-color: $white;
    }
    background-color: $white;
    color: $veryDarkBlueTexte;
  }
}

.filter {
  display: flex;
  flex-wrap: wrap;
  margin: 30px 0px;
}
.filter div:nth-child(2) {
  margin-left: auto;
}

.filter div:nth-child(1) {
  width: 590px;
}

.card__handler {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}
.card__handler > div {
  margin-right: 10px;
  margin-bottom: 40px;
}


@media screen and (max-width: 1250px) {
  .card__handler {
    grid-template-columns: repeat(3, 1fr);
  }
}
@media screen and (max-width: 900px) {
  .card__handler {
    grid-template-columns: repeat(2, 1fr);
  }
  .filter div:nth-child(1) {
    width: 100%;
  }
  .filter div:nth-child(2) {
    margin: 20px 0;
  }
  .filter {
    display: block;
  }
}

@media only screen and (max-width: 600px) {
  .card__handler {
    grid-template-columns: repeat(1, 1fr);
  }
  .content {
    padding: 0px 20px;
  }
}
</style>
