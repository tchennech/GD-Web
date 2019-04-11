<template>
  <!-- 个人主页的导航 -->
  <el-menu :default-active="activeIndex"
           class="el-menu-demo"
           active-text-color="#4D7BE2"
           mode="horizontal"
           id="he">
    <el-row type="flex"
            justify="center">
      <el-col :span="3"
              class="hidden-sm-and-down parent">
        <img id="headImg"
             class="child"
             src="../assets/head.png"
             @click="jumpToGraduate">
      </el-col>
      <el-col :span="2"
              :xs="8">
        <el-menu-item @click="toIndex"
                      index="1">首页</el-menu-item>
      </el-col>
      <el-col :span="3"
              :xs="8">
        <el-submenu index="2">
          <template slot="title">
            <a>学习资料</a>
          </template>
          <el-menu-item @click="toLearn"
                        index="2-1">全部</el-menu-item>
          <el-menu-item index="2-2">linux服务器</el-menu-item>
          <el-menu-item index="2-3">人工智能相关</el-menu-item>
          <el-menu-item index="2-4">后端相关</el-menu-item>
          <el-submenu index="2-5">
            <template slot="title">
              前端相关
            </template>
            <el-menu-item index="2-4-1">vue</el-menu-item>
            <el-menu-item index="2-4-2">js</el-menu-item>
          </el-submenu>
          <el-menu-item index="2-5">gitHub</el-menu-item>
        </el-submenu>
      </el-col>
      <el-col :span="2"
              :xs="8">
        <el-menu-item @click="toSI"
                      index="3">个人简历</el-menu-item>
      </el-col>
      <el-col :span="2"
              class="hidden-sm-and-down">
        <el-menu-item @click="toAdmin"
                      index="4">
          <a>管理员</a>
        </el-menu-item>
      </el-col>
      <el-col :span="7"
              class="hidden-sm-and-down parent">
        <el-input class="child"
                  placeholder="请输入内容"
                  v-model="inputs"
                  clearable>
          <el-button slot="append"
                     icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
    </el-row>
  </el-menu>
</template>

<script>
import "../assets/headLeader.css"

export default {
  name: 'pHead',
  data () {
    return {
      activeIndex: '1',
      inputs: '',
    }
  },
  methods: {
    toIndex () {
      this.$router.push({
        path: "/",
        name: "/"
      });
    },
    toLearn () {
      this.$router.push({
        path: "/le",
        name: "le"
      });
    },
    toSI () {
      this.$router.push({
        path: "/pe",
        name: "pe"
      });
    },
    toAdmin () {
      this.$router.push({
        path: "/handsome/",
        name: "adindex"
      });
    },
    jumpToGraduate () {
      this.$router.push({
        path: "/graduateIndex",
        name: "graduateIndex"
      });
    }
  }

}
</script>