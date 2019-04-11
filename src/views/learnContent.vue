<template>
  <div id="learnMain">
    <el-container>
      <el-header id="learnHead"
                 height="220px">
        <el-breadcrumb id="tag"
                       separator-class="el-icon-arrow-right">
          <el-breadcrumb-item>
            <a @click="select(0)">全部</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="indexTab != ''">
            <a @click="secondData='';select(nowChoose1)">{{indexTab}}</a>
          </el-breadcrumb-item>
          <el-breadcrumb-item v-if="secondTag != ''">{{secondTag}}</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row type="flex"
                :gutter="10"
                class="headTitle">
          <el-col :span="3"
                  class="vfather"
                  :xs="5">
            <div class="leadTitle vcenter">方向：</div>
          </el-col>
          <el-col :span="2"
                  class="vfather"
                  v-for="x in menu1"
                  :key="x.id"
                  :xs="5">
            <el-button type="text"
                       class="vcenter butt"
                       v-bind:class="x.id==nowChoose1?'buttonon':''"
                       @click="indexTab=x.name;select(x.id)">{{x.name}}</el-button>
          </el-col>
        </el-row>
        <el-row type="flex"
                :gutter="10"
                class="headTitle">
          <el-col :span="3"
                  class="vfather"
                  :xs="5">
            <div class="leadTitle vcenter ">类别：</div>
          </el-col>
          <el-col :span="2"
                  class="vfather"
                  v-for="x in menu2"
                  :key="x.id"
                  :xs="5">
            <el-button type="text"
                       class="vcenter butt"
                       v-bind:class="x.id==nowChoose2?'buttonon':''"
                       @click="secondData=x.name;secondTag = x.name;select(x.id)">{{x.name}}</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-main id="learnMain">
        <el-row :gutter="30"
                justify="space-around">
          <el-col :span="8"
                  :xs="24"
                  v-for="index in 4"
                  :key="index">
            <el-card>
              <img v-bind:src="imgs[index-1]">
              <div style="padding: 14px;">
                <span>{{titles[index-1]}}</span>
                <div class="bottom clearfix">
                  <el-button type="text"
                             @click="toArticle(index)"
                             class="button">点击查看</el-button>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <div id="page">
          <el-pagination :page-size="6"
                         @current-change="handleCurrentChange"
                         :pager-count="5"
                         :current-page="currentPage"
                         layout="prev, pager, next"
                         :total="totalNum">

          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import '../assets/font.css'
import '../assets/tools.css'

export default {

  data () {
    return {
      indexTab: '',
      menu1: [{ 'name': 'linux', 'id': 1 }, { 'name': '人工智能', 'id': 2 }, { 'name': '后端', 'id': 3 }, { 'name': '前端', 'id': 4 }],
      menu2: [],
      secondData: '',
      secondTag: '',
      nowChoose1: 0,
      nowChoose2: 0,
      imgs: ['static/t1.jpg', 'static/t2.jpg', 'static/t3.jpg', 'static/t4.jpg'],
      titles: ['搭建第一个vue项目', 'javascript注意事项', 'python入门', '使用python学习人工智能'],
      currentPage: 1,
      totalNum: 5
    }
  },
  mounted () {
    this.activeIndex = '2'
  },
  methods: {
    select (index) {
      if (index == 0) {
        if (this.indexTab != '') {
          //访问主页
          this.nowChoose1 = 0;
          this.nowChoose2 = 0;
          this.secondTag = ''
        }
        this.indexTab = ''
        this.secondData = ''
      } else if (this.secondData == '') {
        //访问后台，index为大类
        if (index == 1) {
          this.menu2 = [{ 'name': '环境配置', 'id': 1 }, { 'name': '常见命令', 'id': 2 }, { 'name': '服务器部署', 'id': 3 }]
        } else if (index == 2) {
          this.menu2 = [{ 'name': '分类', 'id': 1 }, { 'name': '聚类', 'id': 2 }, { 'name': '特征提取', 'id': 3 }]
        } else if (index == 3) {
          this.menu2 = [{ 'name': 'java', 'id': 1 }, { 'name': 'node.js', 'id': 2 }, { 'name': 'maven使用', 'id': 3 }]
        } else {
          this.menu2 = [{ 'name': 'javascript', 'id': 1 }, { 'name': 'vue.js', 'id': 2 }, { 'name': 'css', 'id': 3 }]
        }
        this.nowChoose1 = index;
        this.nowChoose2 = 0;
        this.secondTag = ''
      } else {
        //访问后台，index和二级类secondData
        this.nowChoose2 = index;
        this.secondData = '';
      }
    },
    handleCurrentChange (val) {
      //后台请求分页数据
      this.currentPage = val
    },
  },
}
</script>
<style>
#learnMain {
  background-color: white !important;
}

.leader {
  border-bottom: none !important;
  font-size: 17px;
}
.headTitle {
  border-bottom: solid 1px #ededed;
  margin: 20px;
  height: 60px;
}

#page {
  width: 100%;
  text-align: center;
}
</style>
