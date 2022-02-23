<template>
  <div class="wrapper">
    <headTab :checkIndex="checkIndex" @checkTabChange="checkTabChange"></headTab>
    <div v-if="myCurrComp">
      <!-- 样式 -->
      <div v-if="checkIndex===0">
        <div class="styleItem" v-for="(item,index) in myCurrComp.attribute" :key="index">
          <span class="label">{{item.name}}:</span>
          <!-- type = input -->
          <input
            class="inputStyle"
            v-if="item.type==='input'"
            type="text"
            v-model="item.value"
            @blur="updateComp"
          />
          <!-- type = color -->
          <input
            class="inputStyle"
            v-if="item.type==='color'"
            type="color"
            v-model="item.value"
            @change="updateComp"
          />
        </div>
      </div>
      <div v-if="checkIndex===1">
        <textarea class="dataBox" v-model="dataStr" @change="updateComp"></textarea>
      </div>
    </div>
    <div v-else style="padding:15px">当前没有正在编辑的组件</div>
    <!-- 数据 -->
  </div>
</template>

<script>
import getComponent from "../templates/index";
import { mountedComponent } from "../utils/index";
import headTab from "./comps/headTab.vue";
export default {
  components: {
    headTab,
  },
  props: {
    myCurrComp: {
      type: Object,
    },
  },
  data() {
    return {
      checkIndex: 0,
      dataStr: "",
    };
  },
  computed: {},
  watch: {
    myCurrComp(val) {
      if (val) {
        this.dataStr = JSON.stringify(val.data);
      }
    },
  },
  methods: {
    //更新组件
    updateComp() {
      //获取组件数据
      let component = getComponent(
        this.myCurrComp.info,
        this.myCurrComp.attribute,
        this.dataStr
      );
      // console.log(this.myCurrComp);
      //设置组件的位置
      component.position = this.myCurrComp.position;

      //重新挂在组件
      mountedComponent(component);
      this.$emit("updateComp", component);
    },
    checkTabChange(index) {
      this.checkIndex = index;
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  width: 350px;
  .styleItem {
    margin: 10px;
    display: flex;
    .label {
      display: inline-block;
      width: 80px;
    }
    .inputStyle {
      flex: 1;
    }
  }
  .dataBox {
    min-height: 300px;
    margin: 15px;
    width: 90%;
  }
}
</style>
