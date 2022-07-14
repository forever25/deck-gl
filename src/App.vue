<template>
  <div id="app">
    <ul class="component-list">
      <li
        v-for="it in list"
        :key="it.name"
        @click="activeComponent = it.content"
      >
        {{ it.name }}
      </li>
    </ul>
    <component :is="activeComponent"></component>
    <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
    <!-- <HelloWorld /> -->
  </div>
</template>

<script>
// import HelloWorld from "./components/GeoJSON.vue";
const components = require.context("./components/", false, /\.vue$/);
const list = components
  .keys()
  .map((it) => {
    if (it.indexOf("_") == -1) {
      return { name: it, content: components(it).default };
    }
  })
  .filter((it) => it);

export default {
  name: "App",
  components: {
    // ,
  },
  data() {
    return { list: list, activeComponent: null };
  },
};
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  // margin-top: 60px;
}
ul {
  list-style-type: none;
}

.component-list {
  display: flex;
  cursor: pointer;
}
</style>
