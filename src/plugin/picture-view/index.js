import * as createView from "./createView.js";

const install = (Vue) => {
  if (install.installed) return;
  install.installed = true;
  // Vue.extends();
  console.log(createView);
  Vue.prototype.$pictureView = createView.render;
};

export default {
  install,
};
