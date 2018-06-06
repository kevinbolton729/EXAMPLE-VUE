<template>
  <keep-alive>
    <router-view></router-view>
  </keep-alive>
</template>

<script>
import mixins from '@/common/mixins';

export default {
  mixins
};
</script>

<style>
/*vue设置*/
[v-cloak] {
  display: none;
}

/*全局设置*/
* {
  margin: 0;
  padding: 0;
}

/*样式设置*/
/*字体*/
*,
p,
span,
h1 {
  font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
    Arial, sans-serif;
}
a {
  font-size: 13px;
}
p,
span,
h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: 16px;
}
.yu-theme-icon {
  font-size: 18px;
}
.yu-col-text,
.yu-btn-edit {
  font-size: 14px;
}
.yu-font-num {
  font-size: 20px;
  font-weight: bold;
}

/*颜色*/
body {
  background-color: #efefef;
}
a:hover,
.yu-theme span,
.yu-theme-color {
  color: #0bb;
}
.yu-theme-borderbottom-color {
  border-bottom: 5px solid #0bb;
}
.yu-theme-bgcolor,
.yu-theme-menu span:hover,
.yu-theme-menu-el div:hover,
.yu-theme-menu-el .yu-theme-menu-active {
  background-color: #0bb;
}
.yu-theme-link {
  color: #464646;
  background-color: #fff;
}
.border-bottom {
  border-bottom: 1px solid #dfdfdf;
}
.border-top {
  border-top: 1px solid #dfdfdf;
}
.yu-font-num {
  color: #fa5555;
}

/*基本*/
a {
  text-decoration: none;
  display: block;
}
a:hover {
  text-decoration: none;
}
ul {
  list-style-type: none;
}
.yu-theme-menu span:hover,
.yu-theme-menu-el div:hover,
.yu-theme-menu-el .yu-theme-menu-active {
  cursor: pointer;
}
.lineSpac {
  height: 50px;
}
.relative {
  position: relative;
}
.yu-message {
  margin-top: 30px;
}
.yu-icon-search {
  position: absolute;
  top: 3px;
  right: 7px;
}
</style>