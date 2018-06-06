<template>
  <div>
    <div class="channel-bar border-bottom">
      <p class="channel-title" v-cloak>{{ getCurrentChannel.name }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showinfo: '',
      // HTML中使用CONSTSYU
      CONSTSYU: this.$CONSTSYU
    };
  },
  computed: {
    getCurrentChannel() {
      return this.$store.getters.getCurrentChannel;
    },
    getSysData() {
      return this.$store.getters.getSysData;
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getInfo();
    });
  },
  methods: {
    getInfo() {
      if (
        this.getCurrentChannel.info === '' ||
        this.getCurrentChannel.info === null
      ) {
        this.showinfo +=
          this.$CONSTSYU.DEFAULTINFO +
          this.$CONSTSYU.CURRENTVOL +
          this.$CONSTSYU.DEFAULTVOL +
          this.$CONSTSYU.DEFAULTVOLNUM;
      } else {
        this.showinfo = this.getCurrentChannel.info;
      }
    }
  }
};
</script>

<style scoped>
/*字体*/
.channel-title {
  font-size: 20px;
}

/*基本*/
.channel-bar {
  height: 36px;
}
</style>