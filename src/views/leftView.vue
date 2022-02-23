<template>
  <div class="wrapper">
    <!-- <div class="menuItem" :data-type="item.type" :date-name="item.name" v-for="(item,index) in menus" :key="index"
			draggable="true" @dragstart="dragStart">
			{{item.name}}
    </div>-->
    
    <el-row class="tac">
      <el-col :span="24">
        <el-menu default-active="2" class="el-menu-vertical-demo" unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <span>系统组件</span>
            </template>
            <el-menu-item-group>
              <template slot="title">基本组件</template>
              <el-menu-item  v-for="(item,index) in menus" :key="index">
                <span
                  draggable="true"
                  @dragstart="dragStart"
                  :date-name="item.name"
                  :data-type="item.type"
                >{{item.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <span>特殊组件</span>
            </template>
            <el-menu-item-group>
              <el-menu-item  v-for="(item,index) in menus" :key="index">
                <span
                  draggable="true"
                  @dragstart="dragStart"
                  :date-name="item.name"
                  :data-type="item.type"
                >{{item.name}}</span>
              </el-menu-item>
            </el-menu-item-group>
            
          </el-submenu>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import menus from "./menuList.js";
export default {
  components: {},
  props: {},
  data() {
    return {
      menus: menus,
    };
  },
  computed: {},
  watch: {},
  methods: {
    dragStart(e) {
      let info = {
        name: e.target.getAttribute("data-name"),
        type: e.target.getAttribute("data-type"),
      };
      e.dataTransfer.setData("info", JSON.stringify(info));
    },
  },
};
</script>

<style scoped lang="less">
.wrapper {
  width: 150px;
  padding: 8px;

  // .menuItem {
  //   height: 30px;
  //   margin: 10px;
  //   cursor: pointer;
  //   margin-left: 15%;
  //   list-style: none;
  // }
}
</style>
