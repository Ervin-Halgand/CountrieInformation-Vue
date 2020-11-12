<template>
  <div
    class="container"
    :class="{
      openInformation: open,
      closeInformation: closeInfo,
      darkModeBackground: $store.getters.theme,
      lightModeBackground: !$store.getters.theme,
    }"
  >
    <div
      class="action"
      style="flex-direction: row; justify-content: flex-start;"
    >
      <button
        @click="close"
        :class="{
          darkModeBorder: $store.getters.theme,
          lightModeBorder: !$store.getters.theme,
        }"
      >
        <img v-if="!$store.getters.theme" src="../assets/arrow-left-dark.svg" />
        <img v-else src="../assets/arrow-left-light.svg" />
        Back
      </button>
      <h3>
        {{ countrie.name ? countrie.name : "none" }}
      </h3>
    </div>
    <div>
      <img ref="img" :src="countrie.flag" :alt="`flag-${countrie.name}`" />
      <div class="desc" ref="description">
        <div>
          <ul>
            <li><span>Native Name :</span> {{ countrie.nativeName }}</li>
            <li>
              <span> Population :</span>
              {{ countrie.population.toLocaleString().replaceAll(",", " ") }}
            </li>
            <li><span> Region :</span> {{ countrie.region }}</li>
            <li><span>Sub Region :</span> {{ countrie.subregion }}</li>
            <li><span> Capital :</span> {{ countrie.capital }}</li>
          </ul>
          <ul>
            <li>
              <span> Top level Domain:</span>
              <template v-for="(domain, i) in countrie.topLevelDomain">
                {{ domain }}
                {{ i != countrie.topLevelDomain.length - 1 ? ", " : "" }}
              </template>
            </li>
            <li>
              <span> Currencies :</span>
              <template v-for="(currencie, i) in countrie.currencies">
                {{ currencie.name }}
                {{ i != countrie.currencies.length - 1 ? ", " : "" }}</template
              >
            </li>
            <li>
              <span> Languages:</span>
              <template v-for="(language, i) in countrie.languages">
                {{ language.name }}
                {{ i != countrie.languages.length - 1 ? ", " : "" }}
              </template>
            </li>
            <li><span> Area:</span> {{ countrie.area }}</li>
            <li>
              <span> Lat/Lng: </span>
              <a
                target="_blank"
                :href="`https://www.openstreetmap.org/#map=${zoomRatio}/${countrie.latlng[0]}/${countrie.latlng[1]}`"
                >{{ `${countrie.latlng[0]}/${countrie.latlng[1]}` }}</a
              >
            </li>
          </ul>
        </div>
        <div
          class="bordersContainer"
          style="justify-content: flex-end; flex-direction: column;"
          v-if="countrie.borders.length > 0"
        >
          <div
            style="display: flex; justify-content: center; width: 100%;"
            class="label"
          >
            <strong> Border countries :</strong>
          </div>
          <div
            style="
              display: flex;
              justify-content: center;
              flex-direction: row;
              width: 100%;
              margin-top: 5px;
              flex-wrap: wrap;
            "
          >
            <template v-for="(border, i) in countrie.borders">
              <BorderCountrieCard :item="border" :key="i" />
            </template>
          </div>
        </div>
      </div>
    </div>
    <div
      ref="map"
      class="mapView lightModeBackground"
      style="background-color: transparent;"
    >
      <MapView
        :latitute="{ x: countrie.latlng[0], y: countrie.latlng[1] }"
        :zoomRatio="zoomRatio"
      />
    </div>
  </div>
</template>

<script>
import MapView from "@/components/map/MapView";
import BorderCountrieCard from "@/components/BorderCountrieCard";
export default {
  name: "CountrieInformations",
  props: ["open", "countrie"],
  components: {
    MapView,
    BorderCountrieCard,
  },
  data() {
    return {
      closeInfo: false,
      zoomRatio: Number,
    };
  },
  mounted() {
    this.$refs.map.style.marginTop = `${
      this.$refs.img.clientHeight - this.$refs.description.clientHeight
    }px`;
  },
  updated() {
    this.$refs.map.style.marginTop = `${
      this.$refs.img.clientHeight - this.$refs.description.clientHeight
    }px`;
  },
  watch: {
    open: {
      immediate: true,
      handler(val) {
        if (val) {
          document.querySelector("body").style.overflowY = "hidden";
          this.zoomRatio = this.initRatioZoom(this.countrie.area);
        } else document.querySelector("body").style.overflowY = "visible";
      },
    },
  },
  methods: {
    initRatioZoom(area) {
      if (area >= 10000000) return 3;
      else if (area >= 1000000) return 4;
      else if (area >= 10000) return 5;
      else if (area >= 1000) return 8;
      else if (area >= 100) return 8;
      else if (area >= 10) return 9;
    },
    close() {
      this.closeInfo = true;
      setTimeout(() => {
        this.$emit("close");
        this.closeInfo = false;
      }, 1000);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../scss/variable.scss";
.mapView {
  margin: 10px;
  justify-content: flex-end;
  display: flex;
  flex-grow: 1;
}

.bordersContainer {
  margin-top: 20px;
  flex-direction: row;
  flex-grow: 1;
  font-size: 14px;
  flex-wrap: wrap;
  align-items: center;
}

button {
  width: 80px;
  padding: 10px 0px;
  box-shadow: $boxShadow;
  display: flex;
  margin-right: auto;
  justify-content: center;
  margin: auto;
  border-radius: 5px;
  outline: none;
  flex-grow: 0;
  &:hover {
    cursor: pointer;
  }
  > img {
    height: 17px;
    width: 17px;
    margin-right: 5px;
  }
}

ul {
  font-size: 14px;
  list-style: none;
  font-weight: 300;
  > li span {
    font-weight: 600;
  }
}
ul li {
  padding: 10px;
}
img {
  width: 700px;
  object-fit: scale-down;
  box-shadow: $boxShadow;
}
.desc {
  display: flex;
  flex-direction: column;
  font-size: 14px;
  > div {
    display: flex;
    flex-direction: row;
  }
}

h3 {
  display: flex;
  justify-content: center;
  font-size: 34px;
  margin: 10px 0;
  box-shadow: $boxShadow;
  flex-grow: 1;
}
.container {
  overflow: hidden;
  transform: scale(0);
  height: calc(100vh - 77px);
  width: 100%;
  position: fixed;
  top: 77px;
  left: 0px;
  padding: 0px;
  display: flex;
  flex-direction: column;
  > div {
    align-items: center;
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    padding: 0px 50px;
    > img {
      width: 30%;
      min-width: 250px;
    }
  }
}

.openInformation {
  transform: scale(0);
  animation: openModalAnim 1s ease forwards;
  @keyframes openModalAnim {
    0% {
      transform: scale(0);
    }
    10% {
      transform: scale(0.1, 0);
    }
    50% {
      transform: scale(0.1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
}

.closeInformation {
  animation: closeModalAnim 1s ease reverse forwards;
  @keyframes closeModalAnim {
    0% {
      transform: scale(0);
    }
    10% {
      transform: scale(0.1, 0);
    }
    50% {
      transform: scale(0.1, 1);
    }
    100% {
      transform: scale(1, 1);
    }
  }
}
@media only screen and (max-width: 1000px) {
  .desc * {
    font-size: 12px;
  }
}
@media only screen and (max-width: 600px) {
  .bordersContainer .label {
    margin-top: 12px;
  }
  .action {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
  }
  button {
    width: 40px;
    padding: 5px 0px;
    margin-bottom: 5px;
    font-size: 9px;
    align-items: center;
    > img {
      height: 10px;
      width: 10px;
    }
  }
  .container {
    .desc {
      width: 100%;
      align-items: center;
    }
    > div {
      align-items: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 0 5px;
      > img {
        top: 0px;
        position: absolute;
        opacity: 0.2;
        z-index: -1;
        width: 100%;
      }
    }
  }
  ul {
    > li {
      padding: 2px;
    }
  }
  h3 {
    margin: 4px;
    font-size: 14px;
    align-self: center;
  }
}
</style>
