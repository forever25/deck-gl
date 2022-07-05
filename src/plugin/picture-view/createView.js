let activeIndex = 0; // 当前激活index
let imgSrcList = []; // 图片列表
let pictureViewDome = null; // 最后需要加载到body里的dom节点
let artiveImgSrc = ""; // 当前激活src
let rendered = false;

// ----------------------初始化全局变量 ---------------
/**
 * @description: 初始化
 * @param {Element | String[]} target 图片数据
 * @param {object} options
 * @return {Element}
 */

function init(target) {
  imgSrcList = initImgSrcList(target);
  artiveImgSrc = initArtiveImgSrc();
  pictureViewDome = createImgView();
}

/**
 * @description: 初始化图片列表
 * @param {Element | String[]} target 图片数据
 * @return {*}
 */
function initImgSrcList(target) {
  let imgSrcList = [];
  if (typeof target === "string") {
    imgSrcList[0] = target;
  } else if (Array.isArray(target) && target.length) {
    imgSrcList[0] = target[0];
  } else if (target.nodeName === "IMG" && target.src) {
    imgSrcList = [target.src];
  }
  return imgSrcList;
}

/**
 * @description: 初始化
 * @return {*}
 */
function initArtiveImgSrc() {
  if (imgSrcList.length && typeof imgSrcList[0] === "string") {
    return imgSrcList[activeIndex];
  } else {
    return "";
  }
}

//  -------------------------创建dom层--------------
/**
 * @description: 组合最终dom
 * @return {Element}
 */
function createImgView() {
  const wrapDom = createWrap();
  const imgDom = createImgDom();
  wrapDom.appendChild(imgDom);
  return wrapDom;
}

/**
 * @description: 创建操作遮罩层并创建操作层
 * @return {Element}
 */
function createWrap() {
  const wrapDom = document.createElement("div");
  return wrapDom;
}

/**
 * @description: 创建图片dom
 * @return {*}
 */
function createImgDom() {
  const img = document.createElement("img");
  img.src = artiveImgSrc;
  return img;
}

// 渲染
/**
 * @description: 渲染入口
 * @return {*}
 */
function render(tar) {
  init(tar);
  if (rendered) {
    pictureViewDome.style.display = "block";
  } else {
    document.body.appendChild(pictureViewDome);
  }
}
// /**
//  * @description: 创建imgDom 保证展示的img标签的洁净性，防止出现添加奇怪属性影响图片展示
//  * @param {Element | Array} imgEls 图片数据
//  * @return {Element}
//  */
// function createImgListDom(imgEls) {}

// /**
//  * @description: 创建下方缩略图
//  * @param {}
//  * @return {*}
//  */
// function createThumbnail(imgSrc) {}

// 绑定dom事件交互层
export { render };
