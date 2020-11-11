<template>
  <div id="map"></div>
</template>

<script>
import "ol/ol.css";
import { Map, View } from "ol";
import { fromLonLat } from "ol/proj";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";

export default {
  name: "MapView",
  props: {
    latitute: {
      x: Number,
      y: Number,
    },
    zoomRatio: Number,
  },
  data() {
    return {
      map: null,
      source: null,
      view: null,
      pos: { x: Number, y: Number },
    };
  },
  mounted() {
    this.initMap();
  },
  watch: {
    latitute(newPos) {
      if (newPos.x !== this.pos.x || newPos.y !== this.pos.y) {
        this.pos = newPos;
        this.view.setCenter(fromLonLat([this.pos.y, this.pos.x]));
        this.view.setZoom(this.zoomRatio);
      }
    },
  },
  methods: {
    initMap() {
      console.log(this.zoomRatio);
      this.pos.x = this.latitute.x;
      this.pos.y = this.latitute.y;
      this.source = new OSM();
      this.view = new View({
        center: fromLonLat([this.pos.y, this.pos.x]),
        zoom: this.zoomRatio,
        maxZoom: 14,
      });
      this.map = new Map({
        target: "map",
        layers: [
          new TileLayer({
            source: this.source,
          }),
        ],
        view: this.view,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../scss/variable.scss";
#map {
  width: 100%;
  height: 100%;
}
</style>
