<template>
  <div id="deck"></div>
</template>

<script>
import { Deck } from "@deck.gl/core";
import { GeoJsonLayer } from "@deck.gl/layers";

export default {
  name: "HelloWorld",
  props: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
      const COUNTRIES =
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson"; //eslint-disable-line

      const INITIAL_VIEW_STATE = {
        latitude: 51.47,
        longitude: 0.45,
        zoom: 4,
        bearing: 0,
        pitch: 30,
      };

      const de = new Deck({
        initialViewState: INITIAL_VIEW_STATE,
        controller: true,
        container: document.deck,
        // gl: "#deck",
        layers: [
          new GeoJsonLayer({
            id: "base-map",
            data: COUNTRIES,
            stroked: true,
            filled: true,
            lineWidthMinPixels: 2,
            opacity: 0.4,
            getLineColor: [60, 60, 60],
            getFillColor: [200, 200, 200],
          }),
          // new GeoJsonLayer({
          //   id: "airports",
          //   data: AIR_PORTS,
          //   // Styles
          //   filled: true,
          //   pointRadiusMinPixels: 2,
          //   pointRadiusScale: 2000,
          //   getPointRadius: (f) => 11 - f.properties.scalerank,
          //   getFillColor: [200, 0, 80, 180],
          //   // Interactive props
          //   pickable: true,
          //   autoHighlight: true,
          //   onClick: (info) =>
          //     // eslint-disable-next-line
          //     info.object &&
          //     alert(
          //       `${info.object.properties.name} (${info.object.properties.abbrev})`
          //     ),
          // }),
          // new ArcLayer({
          //   id: "arcs",
          //   data: AIR_PORTS,
          //   dataTransform: (d) =>
          //     d.features.filter((f) => f.properties.scalerank < 4),
          //   // Styles
          //   getSourcePosition: (f) => [-0.4531566, 51.4709959], // London
          //   getTargetPosition: (f) => f.geometry.coordinates,
          //   getSourceColor: [0, 128, 200],
          //   getTargetColor: [200, 0, 80],
          //   getWidth: 1,
          // }),
        ],
      });
      console.log(de);
    },
  },
};
</script>

<style scoped lang="less">
#deck {
  height: 100vh;
}
</style>
