<template>
  <div></div>
</template>

<script>
import { ScatterplotLayer } from "@deck.gl/layers";
export default {
  name: "HelloWorld",
  props: {},
  mounted() {
    const layer = new ScatterplotLayer({
      id: "bart-stations",
      data: [
        {
          name: "Colma",
          passengers: 4214,
          coordinates: [-122.466233, 37.684638],
        },
        {
          name: "Civic Center",
          passengers: 24798,
          coordinates: [-122.413756, 37.779528],
        },
      ],
      stroked: false,
      filled: true,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.passengers),
      getFillColor: [255, 200, 0],
    });

    console.log(layer);
  },
};
</script>

<style scoped lang="less"></style>
