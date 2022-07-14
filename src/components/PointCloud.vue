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

const LAZ_SAMPLE = "/data/indoor.0.1.laz";

const INITIAL_VIEW_STATE = {
  target: [0, 0, 0],
  rotationX: 0,
  rotationOrbit: 0,
  minZoom: 0,
  maxZoom: 10,
  zoom: 5,
};

const transitionInterpolator = new LinearInterpolator(["rotationOrbit"]);

// const [viewState, updateViewState] = useState(INITIAL_VIEW_STATE);
// const [isLoaded, setIsLoaded] = useState(false);

// useEffect(() => {

// }, [isLoaded]);

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
  },
  methods: {
    createdLayer() {
      this.layers = [
        new PointCloudLayer({
          id: "laz-point-cloud-layer",
          data: LAZ_SAMPLE,
          onDataLoad: this.onDataLoad,
          coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
          getNormal: [0, 1, 0],
          getColor: [255, 255, 255],
          opacity: 0.5,
          pointSize: 0.5,
          // Additional format support can be added here
          loaders: [LASWorkerLoader],
        }),
      ];
    },
    initPointCloud() {
      new Deck({
        views: new OrbitView({ orbitAxis: "Y", fov: 50 }),
        initialViewState: this.viewState,
        controller: true,
        onViewStateChange: (v) => {
          // debugger;
        },
        layers: this.layers,
        parameters: { clearColor: [0.93, 0.86, 0.81, 1] },
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
  },
};
</script>
