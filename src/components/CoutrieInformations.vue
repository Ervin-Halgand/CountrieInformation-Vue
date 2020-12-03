<template>
  <div
    class="container background modal"
    :class="{
      openInformation: open,
      closeInformation: closeInfo,
    }"
  >
    <div
      class="action"
      style="flex-direction: row; justify-content: flex-start;"
    >
      <ButtonImage
        title="Back"
        @click="close"
        :imageUrl="
          !$store.getters.theme ? 'arrow-left-dark.svg' : 'arrow-left-light.svg'
        "
      />
      <h3>
        {{ countrie.name ? countrie.name : "none" }}
      </h3>
    </div>
    <div class="countrie__information">
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
    <div ref="map" class="mapView lightModeBackground">
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
import ButtonImage from "@/components/ButtonImage";

export default {
  name: "CountrieInformations",
  props: ["open", "countrie"],
  components: {
    MapView,
    BorderCountrieCard,
    ButtonImage,
  },
  data() {
    return {
      closeInfo: false,
      zoomRatio: Number,
    };
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

.countrie__information {
  flex: 1;
}

.modal {
  transition: background-color 1s ease, color 1s ease;
  z-index: 100;
}

.mapView {
  margin: 10px;
  justify-content: flex-end;
  display: flex;
  flex-grow: 1;
  background-color: transparent;
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
  box-shadow: var(--boxShadow);
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
  box-shadow: var(--boxShadow);
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
  * {
    transition: $transition;
  }
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
  transform: translateY(1000px);
  animation: openModalAnim 1s ease forwards;
  @keyframes openModalAnim {
    to {
      transform: translateY(0);
    }
  }
}

.closeInformation {
  animation: closeModalAnim 1s ease reverse forwards;
  @keyframes closeModalAnim {
    to {
      transform: translateY(0);
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
    transform: scale(0.7);
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
    font-size: 20px;
    align-self: center;
  }
}
</style>
