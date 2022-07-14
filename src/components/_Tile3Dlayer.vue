<template>
  <div></div>
</template>

<script>
// import { Deck } from "@deck.gl/core";
// import { GeoJsonLayer } from "@deck.gl/layers";
// import { Tile3DLayer } from "@deck.gl/geo-layers";
// import { CesiumIonLoader } from "@loaders.gl/3d-tiles";

// const INITIAL_VIEW_STATE = {
//   latitude: 40,
//   longitude: -75,
//   pitch: 45,
//   maxPitch: 60,
//   bearing: 0,
//   minZoom: 2,
//   maxZoom: 30,
//   zoom: 17,
// };

// const onTilesetLoad = (tileset) => {
//   // Recenter view to cover the new tileset
//   const { cartographicCenter, zoom } = tileset;
//   const a = {
//     ...INITIAL_VIEW_STATE,
//     longitude: cartographicCenter[0],
//     latitude: cartographicCenter[1],
//     zoom,
//   };

//   if (updateAttributions) {
//     updateAttributions(tileset.credits && tileset.credits.attributions);
//   }
// };

export default {
  name: "HelloWorld",
  props: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // source: Natural Earth http://www.naturalearthdata.com/ via geojson.xyz
      const ION_ASSET_ID = 1;
      const COUNTRIES =
        "https://d2ad6b4ur7yvpq.cloudfront.net/naturalearth-3.3.0/ne_50m_admin_0_scale_rank.geojson"; //eslint-disable-line
      const ION_TOKEN =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJlYWMxMzcyYy0zZjJkLTQwODctODNlNi01MDRkZmMzMjIxOWIiLCJpZCI6OTYyMCwic2NvcGVzIjpbImFzbCIsImFzciIsImdjIl0sImlhdCI6MTU2Mjg2NjI3M30.1FNiClUyk00YH_nWfSGpiQAjR5V2OvREDq1PJ5QMjWQ";
      const TILESET_URL = `https://assets.cesium.com/${ION_ASSET_ID}/tileset.json`;
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
        // gl: "#deck",
        layers: [
          new GeoJsonLayer({
            id: "base-map",
            data: COUNTRIES,
            // Styles
            stroked: true,
            filled: true,
            lineWidthMinPixels: 2,
            opacity: 0.4,
            getLineColor: [60, 60, 60],
            getFillColor: [200, 200, 200],
          }),
          new Tile3DLayer({
            id: "tile-3d-layer",
            pointSize: 2,
            data: TILESET_URL,
            loader: CesiumIonLoader,
            loadOptions: { "cesium-ion": { accessToken: ION_TOKEN } },
            // onTilesetLoad,
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
