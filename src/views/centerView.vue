<template>
  
  <div id="canvasBox" class="wrapper" @dragover="dragOver" @drop="drop" @click="checkComp" >
    <div :id="item.info.id" v-for="(item,idnex) in components" :key="idnex"></div>
    <div
      id="borderBox"
      @mousedown="mouseDownStart"
      class="borderStyle"
      v-if="currComp"
      :style="setBorderStyle"
      @contextmenu.prevent="rightClick"
    ></div>
  </div>
</template>

<script>
import { genID } from "../utils/index.js";
import { mountedComponent } from "../utils/index.js";
import getComponent from "../templates/index.js";
export default {
  components: {},
  props: {
    myCurrComp: {
      type: Object,
    },
  },
  data() {
    return {
      components: [],
      zIndex: 0,
      currComp: null,
      startPosistion: {
        x: 0,
        y: 0,
      },
    };
  },
  computed: {
    setBorderStyle() {
      let compWidth = 0;
      let compHeight = 0;
      if (this.currComp) {
        this.currComp.attribute.forEach((item) => {
          if (item.key === "width") {
            compWidth = item.value;
          }
          if (item.key === "height") {
            compHeight = item.value;
          }
        });
        return {
          width: `${compWidth}px`,
          height: `${compHeight}px`,
          left: `${this.currComp.position.left}px`,
          top: `${this.currComp.position.top}px`,
          zIndex: `${this.currComp.position.zIndex}`,
        };
      } else {
        return {};
      }
    },
  },
  watch: {
    myCurrComp(val) {
      if (val) {
        this.currComp = val;
        this.updateArrList(val);
      }
    },
  },
  methods: {
    updateArrList(val) {
      this.components.forEach((item) => {
        if (item.info.id === val.info.id) {
          item.attribute = val.attribute;
          item.data = val.data;
          item.template = val.template;
        }
      });
    },
    //右击回调
    rightClick() {
      if (confirm("确定删除当前这个组件")) {
        document.getElementById(this.currComp.info.id).remove();
      }
      this.currComp = null;
    },
    //鼠标按下回调
    mouseDownStart(e) {
      //记录按下瞬间的位置
      this.startPosistion.x = e.clientX;
      this.startPosistion.y = e.clientY;
      //注册移动和松开鼠标的事件
      document.addEventListener("mousemove", this.mouseMove, true);
      document.addEventListener("mouseup", this.mouseUp, true);
    },
    //鼠标移动的回调
    mouseMove(e) {
      //计算偏移量
      let offsetX = e.clientX - this.startPosistion.x;
      let offsetY = e.clientY - this.startPosistion.y;
      //设置组件当前位置
      let comp = document.getElementById(this.currComp.info.id);
      Object.assign(comp.style, {
        left:
          this.boundaryLimit(
            "x",
            this.currComp.position.left + offsetX,
            this.currComp
          ) + "px",
        // left: this.currComp.position.left + offsetX + "px",
        top:
          this.boundaryLimit(
            "y",
            this.currComp.position.top + offsetY,
            this.currComp
          ) + "px",
        // top: this.currComp.position.top + offsetY + "px"
      });
      //设置选中框的位置
      let borderComp = document.getElementById("borderBox");
      Object.assign(borderComp.style, {
        left:
          this.boundaryLimit(
            "x",
            this.currComp.position.left + offsetX,
            this.currComp
          ) + "px",
        // left: this.currComp.position.left + offsetX + "px",
        top:
          this.boundaryLimit(
            "y",
            this.currComp.position.top + offsetY,
            this.currComp
          ) + "px",
        // top: this.currComp.position.top + offsetY + "px"
      });
    },
    //鼠标松开的回调
    mouseUp(e) {
      //移除事件
      document.removeEventListener("mousemove", this.mouseMove, true);
      document.removeEventListener("mouseup", this.mouseUp, true);
      //更新组件数据
      this.currComp.position.left = this.boundaryLimit(
        "x",
        this.currComp.position.left + (e.clientX - this.startPosistion.x),
        this.currComp
      );
      // this.currComp.position.left = this.currComp.position.left + (e.clientX - this.startPosistion.x);
      // console.log(this.currComp.position.left)
      this.currComp.position.top = this.boundaryLimit(
        "y",
        this.currComp.position.top + (e.clientY - this.startPosistion.y),
        this.currComp
      );
      // this.currComp.position.top = this.currComp.position.top + (e.clientY - this.startPosistion.y);
    },
    //边界限定
    boundaryLimit(type, num, comp) {
      //画布的宽高
      // console.log(num)
      let canvas = document.getElementById("canvasBox");
      let canvasWidth = canvas.clientWidth;
      let canvasHeight = canvas.clientHeight;
      //组件的宽高
      let compWidth = 0;
      let compHeight = 0;
      comp.attribute.forEach((item) => {
        if (item.key === "width") {
          compWidth = item.value;
        }
        if (item.key === "height") {
          compHeight = item.value;
        }
      });
      // console.log(comp)
      //边界值
      let maxX = canvasWidth - compWidth;
      let maxY = canvasHeight - compHeight;
      let lastNum = 0;
      if (type === "x") {
        if (num < 0) {
          lastNum = 0;
        } else if (num > maxX) {
          lastNum = maxX;
        } else {
          lastNum = num;
        }
      } else if (type === "y") {
        if (num < 0) {
          lastNum = 0;
        } else if (num > maxY) {
          lastNum = maxY;
        } else {
          lastNum = num;
        }
        // console.log(lastNum);
      }
      // console.log(comp)
      return lastNum;
    },

    checkComp(e) {
      let reg = /\w{8}-\w{4}/;
      let node = e.target;
      let count = 0;
      //还有node但node的id不是组件的id就继续查找
      while (node && !reg.test(node.id)) {
        count++;
        if (count > 20) {
          return;
        }
        node = node.parentNode;
      }
      //获取匹配到的组件的ID
      if (node && node.id) {
        this.currComp = this.components.find((item) => {
          if (item.info.id === node.id) {
            return item;
          }
        });
      } else {
        this.currComp = null;
      }
      this.$emit("currComp", this.currComp);
      // console.log(this.currComp)
    },
    //拖拽到画布的回调
    dragOver(e) {
      e.preventDefault();
    },
    //鼠标松开的回调
    drop(e) {
      e.preventDefault();
      console.log(e.dataTransfer.getData("info"));
      let info = JSON.parse(e.dataTransfer.getData("info"));
      info.id = genID();
      let component = getComponent(info);
      this.zIndex++;
      //找到组件的宽高
      let compWidth = 0;
      let compHeight = 0;
      component.attribute.forEach((item) => {
        if (item.key === "width") {
          compWidth = item.value;
        }
        if (item.key === "height") {
          compHeight = item.value;
        }
      });

      let left = e.offsetX - compWidth / 2;
      let top = e.offsetY - compHeight / 2;
      if (left < 0) {
        left = 0;
      }
      if (top < 0) {
        top = 0;
      }
      component.position = {
        left,
        top,
        zIndex: this.zIndex,
      };
      this.components.push(component);
      mountedComponent(component);
    },
  },
};
</script>

<style scoped lang="less">
*{ 
 -webkit-touch-callout:none; /*系统默认菜单被禁用*/ 
 -webkit-user-select:none; /*webkit浏览器*/ 
 -khtml-user-select:none; /*早期浏览器*/ 
 -moz-user-select:none;/*火狐*/ 
 -ms-user-select:none; /*IE10*/ 
 user-select:none; 
} 

.wrapper {
  flex: 1;
  background-color: #ccc;
  position: relative;


  .borderStyle {
    border: 1px solid green;
    position: absolute;

  }
  
}
</style>
