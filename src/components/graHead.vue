<template>
  <!-- 毕设的导航 -->
  <el-menu :default-active="activeIndex"
           class="el-menu-demo"
           active-text-color="#4D7BE2"
           mode="horizontal"
           id="he">
    <el-row type="flex"
            justify="space-between">
      <el-col :span="4"
              class="hidden-sm-and-down parent">
        <img id="headImg"
             class="child"
             src="../assets/ghead.png"
             @click="jumpToPerson">
      </el-col>
      <el-col>
        <div style="position:absolute;top:30%;">
          <span style="color:#909399;margin-right:15px">|</span>
          病理图分类平台
        </div>
      </el-col>
      <el-col :span="8">
        <el-menu-item index="4">
          <span>{{date}}</span>
          <span class="rightParts">{{loginUser}}, 你好</span>
          <span class="rightParts">
            <el-button type="text">注销</el-button>
          </span>
        </el-menu-item>
      </el-col>

    </el-row>
  </el-menu>
</template>

<script>
import "../assets/headLeader.css"

export default {
  name: 'gHead',
  data () {
    return {
      activeIndex: '1',
      date: '',
      loginUser: 'handsome'
    }
  },
  mounted () {
    this.date = new Date().toLocaleDateString();
  },

  methods: {
    jumpToPerson () {
      this.$router.push({
        path: "/",
        name: "/"
      });
    }
  }

}
</script>