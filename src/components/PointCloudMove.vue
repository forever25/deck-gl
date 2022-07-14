<template>
  <div></div>
</template>

<script>
import { Deck } from "@deck.gl/core";
import {
  COORDINATE_SYSTEM,
  OrbitView,
  LinearInterpolator,
} from "@deck.gl/core";
import { PointCloudLayer } from "@deck.gl/layers";

import { LASWorkerLoader } from "@loaders.gl/las";

// const LAZ_SAMPLE = "/data/indoor.0.1.laz";

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  rotationX: 0,
  rotationOrbit: 0,
  // minZoom: 0,
  // maxZoom: 10,
  zoom: 5,
};

const transitionInterpolator = new LinearInterpolator(["rotationOrbit"]);

const SAMPLE_SIZE = 100;
const points = [];

for (let x = 0; x < SAMPLE_SIZE; x++) {
  for (let y = 0; y < SAMPLE_SIZE; y++) {
    for (let z = 0; z < SAMPLE_SIZE; z++) {
      points.push({
        position: [
          x - SAMPLE_SIZE / 2,
          y - SAMPLE_SIZE / 2,
          z - SAMPLE_SIZE / 2,
        ],
        color: [0, 0, 0],
      });
    }
  }
}

console.log(points.length);

export default {
  name: "PointCloud",
  data() {
    return {
      loading: false,
      INITIAL_VIEW_STATE: {
        target: [0, 0, 0],
        rotationX: 0,
        rotationOrbit: 0,
        minZoom: 0,
        maxZoom: 10,
        zoom: 1,
      },
      viewState: INITIAL_VIEW_STATE,
      deck: null,
      index: 0,
    };
  },
  props: {},
  components: {},
  computed: {},
  watch: {
    loading(val) {
      if (!val) {
        return;
      }
      const rotateCamera = () => {
        this.viewState = {
          ...this.viewState,
          rotationOrbit: this.viewState.rotationOrbit + 120,
          transitionDuration: 2400,
          transitionInterpolator,
          onTransitionEnd: rotateCamera,
        };
      };
      rotateCamera();
    },
  },
  created() {},
  mounted() {
    this.createdLayer();
    this.initPointCloud();
    this.createSetTime();
  },
  methods: {
    createdLayer() {
      this.layers = [
        new PointCloudLayer({
          id: "laz-point-cloud-layer1",
          data: points,
          onDataLoad: this.onDataLoad,
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          getNormal: [0, 1, 0],
          getColor: [255, 255, 255],
          opacity: 1,
          pointSize: 6,
          getPosition: (d) => d.position,
          // Additional format support can be added here
          // loaders: [LASWorkerLoader],
        }),
      ];

      window.la = this.layers;
    },
    initPointCloud() {
      this.deck = new Deck({
        views: new OrbitView({ fov: 30, orbitAxis: "Y" }),
        // initialViewState: this.viewState,
        initialViewState: {
          target: [0, 0, 0],
          distance: 1,
          fov: 50,
          rotationX: 45,
          rotationOrbit: 30,
          zoom: 0.05,
        },
        controller: true,
        onViewStateChange: (v) => {
          // debugger;
        },
        layers: this.layers,
        parameters: { clearColor: [0, 0, 0, 1] },
      });
    },
    onDataLoad({ header }) {
      if (header.boundingBox) {
        const [mins, maxs] = header.boundingBox;
        // File contains bounding box info
        this.viewState = {
          ...INITIAL_VIEW_STATE,
          target: [
            (mins[0] + maxs[0]) / 2,
            (mins[1] + maxs[1]) / 2,
            (mins[2] + maxs[2]) / 2,
          ],
          zoom: Math.log2(window.innerWidth / (maxs[0] - mins[0])) - 1,
        };

        this.loading = true;
      }

      // if (onLoad) {
      //   onLoad({ count: header.vertexCount, progress: 1 });
      // }
    },
    createSetTime() {
      setInterval(() => {
        if (this.index > points.length - 1) {
          return;
        }
        this.layers = [
          new PointCloudLayer({
            id: "laz-point-cloud-layer2" + this.index,
            data: points.slice(0, this.index),
            onDataLoad: this.onDataLoad,
            coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
            getNormal: [0, 1, 0],
            getColor: [255, 255, 255],
            opacity: 1,
            getPosition: (d) => d.position,
            pointSize: 0.5,
            // Additional format support can be added here
            // loaders: [LASWorkerLoader],
          }),
        ];
        this.deck.setProps({
          layers: this.layers,
          // viewState: {
          //   target: [0, 0, 0],
          //   distance: 1,
          //   fov: 50,
          //   rotationX: 45,
          //   rotationOrbit: 30,
          //   zoom: 0.05,
          // },
        });
        this.index += 100000;
      }, 17);
    },
  },
};
</script>
