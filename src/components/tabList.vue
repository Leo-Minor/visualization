<template>
  <div class="wrapper" :style="setStyle">
    <div
      :style="setItemStyle"
			@click="myindex=index"
      :class="{active:myindex===index}"
      class="itemTab"
      v-for="(item,index) in dataList"
      :key="index"
    >{{item}}
	</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    width: {
      type: [String, Number],
    },
    height: {
      type: [String, Number],
    },

    itemWidth: {
      type: [String, Number],
    },
    data: {
      type: String,
    },
  },
  data() {
    return {
      dataList: JSON.parse(this.data).list,
      myindex: 0,
    };
  },
  computed: {
    setItemStyle() {
      return {
        width: this.itemWidth + "px",
      };
    },
    setStyle() {
      return {
        width: this.width + "px",
        height: this.height + "px",
        fontSize: this.fontSize + "px",
        color: this.color,
      };
    },
  },
  watch: {},
  methods: {},
};
</script>

<style scoped lang = 'less'>
.wrapper {
  display: flex;
  justify-content: space-around;
  align-content: center;
  .itemTab {
    background-color: #b5b6ba;
    color: #444;
    border-radius: 5px;
    text-align: center;
    &.active {
      background-color: #e68342;
      color: #fff;
    }
  }
}
</style>
