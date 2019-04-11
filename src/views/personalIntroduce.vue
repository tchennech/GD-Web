<template>
  <div id="resume">
    <el-container>
      <el-header id="resumeHead"
                 :height="heights">

        <el-row justify="space-around">
          <el-col :span="24"
                  id="rightHead"
                  class="wow fadeInUp">
            <img :src="head">
          </el-col>
          <el-col :span="24"
                  data-wow-delay="0.5s"
                  class="wow fadeInUp">
            <p class="title">你好,我是
              <span class="huge">陈文儒</span>
            </p>

          </el-col>

          <el-col :span="24"
                  class="grid wow fadeInUp"
                  data-wow-delay="0.8s">
            <span class="hidden-xs-only">————</span>
            <el-popover class="qqwx"
                        width="200"
                        trigger="click">
              <img src="../assets/qq.png">
              <el-button type="primary"
                         icon="el-icon-qq"
                         slot="reference"
                         circle></el-button>
            </el-popover>

            <el-popover class="qqwx"
                        width="200"
                        trigger="click">
              <img src="../assets/wx.png">
              <el-button type="primary"
                         slot="reference"
                         icon="el-icon-weixin"
                         circle></el-button>
            </el-popover>
            <el-tooltip effect="dark"
                        content="点击复制邮箱号"
                        placement="top">
              <el-button type="primary"
                         icon="el-icon-message"
                         v-clipboard:copy="mailbox"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError1"
                         circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark"
                        content="点击复制手机号"
                        placement="top">
              <el-button type="primary"
                         icon="el-icon-mobile-phone"
                         v-clipboard:copy="phoneNum"
                         v-clipboard:success="onCopy"
                         v-clipboard:error="onError2"
                         circle></el-button>
            </el-tooltip>
            <el-tooltip effect="dark"
                        content="点击打开gitHub"
                        placement="top">
              <el-button type="primary"
                         @click="openGitHub"
                         icon="el-icon-github"
                         circle>

              </el-button>
            </el-tooltip>
            <span class="hidden-xs-only">————</span>
          </el-col>
          <el-col data-wow-delay="1s"
                  class="wow fadeInUp">
            意向：大数据 人工智能
          </el-col>
        </el-row>
        <div class="arrow"></div>
      </el-header>
      <el-main id="resumeMain">
        <el-row>
          <el-col :span="24"
                  class="grayB wow fadeInUp"
                  data-wow-delay="0.5s">
            <el-row :gutter="30"
                    justify="center"
                    class="normal">
              <el-col :span="24"
                      class="resumtitle">
                <div class="borders">
                  <i class="iconfont  el-icon-baseInfo"></i>
                  基本信息</div>
              </el-col>
              <el-col v-for="index in baseInfo"
                      :key="index.name"
                      :span="12"
                      :xs="24"
                      class="line">
                {{index.name}}: {{index.value}}
              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24"
                  class="grayB wow fadeInUp"
                  data-wow-delay="0.5s">
            <el-row :gutter="30"
                    justify="center"
                    class="normal">
              <el-col :span="24"
                      class="resumtitle">
                <div class="borders">
                  <i class="iconfont  el-icon-jy"></i>
                  教育背景</div>
              </el-col>
              <el-col v-for="index in studyInfo"
                      :key="index.name"
                      :span="24"
                      class="line">
                <el-row class="line">
                  <el-col :span="6"
                          :xs="12"
                          class="studytitle">
                    {{index.name}}
                  </el-col>

                  <el-col :span="18"
                          :xs="24">
                    <div class="card mainInfo">{{index.value}}</div>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
          </el-col>
          <el-col :span="24"
                  class="grayB wow fadeInUp">
            <el-row :gutter="30"
                    justify="center"
                    class="normal">
              <el-col :span="24"
                      class="resumtitle">
                <div class="borders">
                  <i class="iconfont  el-icon-xiangmu"></i>
                  项目经历</div>
              </el-col>
              <el-col v-for="index in proInfo"
                      :key="index.name"
                      :span="24"
                      class="line">
                <el-row class="line">
                  <el-col :span="6"
                          :xs="12"
                          class="studytitle">
                    {{index.name}}
                  </el-col>

                  <el-col :span="18"
                          :xs="24">
                    <div class="card mainInfo">{{index.value}}</div>
                  </el-col>
                </el-row>

              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import '../assets/font.css'
import 'animate.css'
import { WOW } from 'wowjs'
export default {
  data () {
    return {
      heights: '400px',
      phoneNum: '17730226403',
      mailbox: '1729796645@qq.com',
      head: 'static/dancun.png',
      baseInfo: [{ 'name': '性别', 'value': '男' }, { 'name': '民族', 'value': '汉族' }, { 'name': '出生日期', 'value': '1996.10.30' },
      { 'name': '户籍', 'value': '浙江温州' }, { 'name': '目前所在', 'value': '合肥' }, { 'name': '主修专业', 'value': '软件工程' }],
      studyInfo: [{ 'name': '合肥工业大学', 'value': '2015-2019年，211本科，主修课程(技能)：高数、线代、离散、概率论、c++、java、python、机器学习基础、web开发、软件设计模式、uml、需求工程、软件项目管理、数据结构、计算机网络、linux操作系统。' },
      { 'name': '乐清中学', 'value': '2012-2015年，重点高中，社团经历：新闻社社长，成功组织了多场新闻报道，从中学习到了团队管理、团队协作；并因此爱上了摄影。' }],
      proInfo: [{ 'name': '盈佳科技实训', 'value': '2017年6月，从中学习了基于java的web程序开发，后台采用SSM框架，前台采用原生。并接受了大数据培训，了解并使用了hadoop，hive。' },
      { 'name': '需求工程项目', 'value': '2017年12月，在项目期间担任项目经理，学会了统筹规划项目进度，分配任务，管理团队，并在此期间学会了需求调研，以及规范的文档化流程。' },
      { 'name': '教育直播平台开发', 'value': '2018年5月，在此期间学会了前段框架——vue，了解了webpack模块化机制，学会使用了声网的SDK、前后台分离的开发方式、一整套规范化的软件开发流程，git代码版本管理。' },
      { 'name': '软件测试', 'value': '2018年3-6月，在此期间学习了软件测试基本方法，我们对软件功能、性能、安全的测试都有所涉及。' },
      { 'name': '机器学习入门', 'value': '2018年5-6月，在此期间学习了解了几种监督学习方法：分类(fisherIda、perceptron、decisionTree)、聚类等，并制作了一个解决XXX的工具。' }],
    }
  },
  mounted () {
    let wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: -6,
      mobile: true,
      live: true
    });
    wow.init();
    if (document.body.clientWidth < 800) {
      this.heights = '300px';
    }
    window.addEventListener('resize', function () {
      if (document.body.clientWidth < 800) {
        this.heights = '300px';
      } else {
        this.heights = '400px';
      }
    }.bind(this)
    )
  },
  methods: {
    onCopy () {
      this.$notify({
        title: '成功复制',
        type: 'success'
      });
    },
    onError1 () {
      this.$notify.error({
        title: '复制失败',
        message: '请您手动复制邮箱号' + this.mail,
        duration: 0
      });
    },
    onError2 () {
      this.$notify.error({
        title: '复制失败',
        message: '请您手动复制手机号' + this.phoneNum,
        duration: 0
      });
    },
    openGitHub () {
      window.open('https://github.com/tchennech')
    }
  }
}
</script>
<style>
#resumeHead {
  background: url('../assets/resume.jpg');
  background-size: 100% 100%;
  position: relative;
  padding: 0;
  border-radius: 9px;
}
.studytitle {
  font-weight: bold;
  font-size: 20px;
}
.mainInfo {
  text-align: left;
}
.line {
  margin: 10px 0;
  font-size: 17px;
  font-family: 'youyuan';
}
#aside {
  height: 600px;
  padding: 10px 0;
  overflow: hidden;
}

#resumeHead .el-col {
  text-align: center;
  margin-top: 20px;
}
.qqwx {
  margin-right: 8px;
}
img {
  max-width: 100%;
}
#rightButtom {
  margin-top: 30px;
  margin-left: 30px;
}
#rightHead img {
  width: 100px;
}
#resumeMain {
  text-align: center;
}

.el-row {
  height: 100%;
}
.formal {
  text-align: center;
}
.resumtitle {
  font-weight: bold;
  font-size: 22px;
  font-family: 'youyuan';
  padding: 10px 0;
}
.borders {
  border-bottom: solid 1px rgb(138, 170, 212);
  padding-bottom: 10px;
  color: rgb(62, 138, 236);
}
</style>
