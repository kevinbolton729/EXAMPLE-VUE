<template>
  <div>
    <div class="menu" :class="[{'menu-fix-left':left},{'menu-fix-right':right}]" v-if="!getLayoutStatus.isClose">
      <div class="menu-right yu-theme-menu">
        <div class="menu-right-main yu-theme-menu-el">
          <div class="menu-name" :class="{'yu-theme-menu-active':menu.isChecked}" v-for="(menu, index) in menulists" :key="index" @mouseover.prevent.stop="overMenu(menu)" @mouseout.prevent.stop="outMenu">
            <i class="iconfont" v-cloak>{{ menu.icon }}</i>
            <div class="menu-child">
              <a href="javascript:;" :class="[{'yu-theme-color':child.isChecked},{'yu-theme-link':!child.isChecked}]" v-for="(child, index) in menu.child" :key="index" v-show="menu.isChecked && menu.child.length != 0" @click.prevent.stop="toggleMenu(child)" v-cloak>
                {{ child.name }}
              </a>
            </div>
          </div>
        </div>
        <span class="iconfont" @click.prevent.stop="toggleClose('.menu')">&#xe60c;</span>
      </div>
    </div>
    <div class="menu" :class="[{'menu-fix-left':left},{'menu-fix-right':right}]" v-else>
      <div class="menu-left yu-theme-menu">
        <div class="menu-logo yu-theme-bgcolor" v-cloak>
          <p>{{ CONSTSYU.DEFAULTSYSNAME }}</p>
          <p class="w3-tiny">{{ CONSTSYU.DEFAULTVOL + CONSTSYU.DEFAULTVOLNUM }}</p>
        </div>
        <div class="menu-left-main">
          <div v-for="(menu, index) in menulists" :key="index">
            <p @click.prevent.stop="toggleMenu(menu)" v-cloak>
              <i class="iconfont">{{ menu.icon }}</i>{{ menu.name }}
            </p>
            <a href="javascript:;" :class="{'yu-theme-menu-active':child.isChecked}" v-for="(child, index) in menu.child" :key="index" v-show="menu.isChecked && menu.child.length != 0" @click.prevent.stop="toggleMenu(child)" v-cloak>
              {{ child.name }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // DOM初始化赋值
      menu: '.menu',
      menulists: [],
      isShow: false,
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU
    };
  },
  props: {
    left: {
      type: Boolean,
      default() {
        return false;
      }
    },
    right: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  computed: {
    getLayoutStatus() {
      return this.$store.getters.getLayoutStatus;
    },
    getCurrentChannel() {
      return this.$store.getters.getCurrentChannel;
    },
    getChanneLists() {
      return this.$store.getters.getChanneLists;
    },
    getChannelStatus() {
      return this.$store.getters.getChannelStatus;
    }
  },
  mounted() {
    this.$nextTick(() => {
      let that = this;
      let fn = that.$FNSYU;

      that.menulists = that.getChanneLists[0].extData;
      fn.addisChecked.apply(that, [that.menulists]);

      let checked = fn.defaultisChecked(that.menulists, 0);

      fn.gotoMenu.apply(that, [
        { item: that.menulists[checked.i].child[checked.n] }
      ]);
      fn.autoCloseSilder.apply(that);
      fn.toggleWidth($(that.menu), that.getLayoutStatus.isClose);
    });
  },
  methods: {
    toggleClose(node) {
      let that = this;
      let fn = that.$FNSYU;

      that.$store.commit('updateLayoutStatus');
      fn.toggleWidth(node, that.getLayoutStatus.isClose);
    },
    toggleMenu(item) {
      let that = this;
      let fn = that.$FNSYU;
      let index = 0;
      fn.toggleMenu.apply(that, [{ item, index }]);
    },
    overMenu(item) {
      this.isShow = true;
      $('.menu-child').css({ top: 0 + 'px' });
      this.toggleMenu(item);
    },
    outMenu() {
      this.isShow = false;
      $('.menu-child').css({ top: -300 + 'px' });
    }
  }
};
</script>

<style scoped>
/*字体*/
.menu-logo p {
  font-size: 14px;
}
.menu-right span,
.menu-left span,
.menu-name i {
  font-size: 24px;
}
.menu-right-main .menu-name,
.menu-left-main .menu-name {
  font-size: 12px;
}
.menu-left-main a {
  font-size: 15px;
}

/*颜色*/
.menu {
  background-color: #363636;
  z-index: 1000;
}
.menu-logo p,
.menu-right-main div,
.menu-left-main div,
.menu-right span,
.menu-left span,
.menu-name i,
.menu-right-main .menu-name,
.menu-left-main .menu-name {
  color: #fff;
}
.menu-right-main p {
  color: #9e9e9e;
}
.menu-left-main p,
.menu-left-main a {
  color: #999;
}
.menu-left-main a:last-child {
  border-bottom: 1px solid #464646;
}
.menu-child,
.menu-child a,
.menu-child a:hover {
  background-color: #fff;
}

/*基本*/
.menu-fix-left {
  left: 0px;
}
.menu-fix-right {
  right: 0px;
}
.menu {
  z-index: 999;
  width: 36px;
  position: fixed;
  top: 0px;
  bottom: 0px;
  /*overflow: hidden;*/
  /*过渡效果*/
  -webkit-transition: width 500ms ease-out;
  -moz-transition: width 500ms ease-out;
  -ms-transition: width 500ms ease-out;
  -o-transition: width 500ms ease-out;
  transition: width 500ms ease-out;
}
.menu-right,
.menu-left {
  width: 100%;
  height: 100%;
  position: relative;
}
.menu-right span,
.menu-left span {
  position: absolute;
  top: 32px;
  left: 0px;
  right: 0px;
}
.menu-logo {
  padding-left: 12px;
  height: 32px;
  line-height: 32px;
  display: block;
  overflow: hidden;
}
.menu-logo p {
  opacity: 0.6;
  margin-right: 12px;
  display: inline-block;
}
.menu-logo p:last-child {
  margin-right: 0px;
}
.menu-right-main,
.menu-left-main {
  width: 100%;
  margin-top: 90px;
  float: left;
}
.menu-right-main div,
.menu-left-main div {
  text-align: center;
  display: block;
}
.menu-left-main p {
  position: relative;
}
.menu-left-main p i {
  position: absolute;
  top: 0px;
  left: 12px;
  font-size: 20px;
  display: inline-block;
}
.menu-right-main p,
.menu-left-main p,
.menu-left-main a {
  padding: 0px 12px 0px 42px;
  overflow: hidden;
}
.menu-right-main p,
.menu-left-main p {
  height: 36px;
  line-height: 36px;
  display: block;
  text-align: left;
}
.menu-right span,
.menu-left span,
.menu-name i {
  width: 100%;
  height: 36px;
  line-height: 36px;
  text-align: center;
  display: block;
}
.menu-left-main div:hover {
  cursor: pointer;
}
.menu-left-main a {
  height: 44px;
  line-height: 44px;
  display: block;
  text-align: left;
}
.menu-name {
  padding-top: 6px;
  padding-bottom: 3px;
  position: relative;
}
.menu-child {
  width: 100px;
  position: absolute;
  top: -300px;
  left: 36px;
  -webkit-box-shadow: 3px 3px 6px #efefef;
  -moz-box-shadow: 3px 3px 6px #efefef;
  box-shadow: 3px 3px 6px #efefef;

  -webkit-transition: top 500ms ease-out;
  -moz-transition: top 500ms ease-out;
  -ms-transition: top 500ms ease-out;
  -o-transition: top 500ms ease-out;
  transition: top 500ms ease-out;
}
.menu-child a {
  height: 44px;
  line-height: 44px;
  display: block;
  text-align: center;
}
</style>