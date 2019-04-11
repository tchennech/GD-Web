<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside style="border-right: solid 1px #e6e6e6;">
        <el-menu default-active="1-4-1"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-menu-item index="0"
                        @click="controlIndex = '0'">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">数据/模型管理</span>
            </template>
            <el-menu-item-group>
              <span slot="title">数据</span>
              <el-menu-item index="1-1"
                            @click="newData">上传新数据</el-menu-item>
              <el-menu-item index="1-2"
                            @click="openData">管理已有数据</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="模型">
              <el-menu-item index="1-3"
                            @click="openModel">管理现有模型</el-menu-item>
            </el-menu-item-group>
            <!-- <el-submenu index="1-4">
              <span slot="title">选项4</span>
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu> -->
          </el-submenu>
          <el-menu-item index="2"
                        @click="trainModel">
            <i class="el-icon-menu"></i>
            <span slot="title">训练模型</span>
          </el-menu-item>
          <el-menu-item index="3"
                        @click="predict">
            <i class="el-icon-document"></i>
            <span slot="title">预测结果</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <div id="mainContent"
             class="line"
             v-if="controlIndex == '0'">
          <div class="line grayBack">
            <h1 class="titleH1">病理图分类实验平台</h1>
            <p class="titleP">癌症病理图实验平台，集识别、分类、检测、数据管理一体</p>
          </div>
          <div class="line">
            <!-- <img src="../assets/back.jpg"
                  id="imgBack"> -->
          </div>
        </div>
        <div v-if="controlIndex == 1">
          <upload></upload>
        </div>
        <div v-if="controlIndex == 2">
          <d-view></d-view>
        </div>
        <div v-if="controlIndex == 3">
          <m-view></m-view>
        </div>

        <!-- 训练 -->
        <div v-if="controlIndex == 4">
          <el-steps :active="active"
                    finish-status="success">
            <!-- 第一步 -->
            <el-step title="选择数据"> </el-step>
            <!-- 第二步 -->
            <el-step title="输入参数"> </el-step>
            <!-- 第三步 -->
            <el-step title="训练"></el-step>
          </el-steps>
          <!-- 按钮 -->
          <el-button style="margin-top: 12px;"
                     @click="back"
                     v-if="!firstStep">上一步</el-button>
          <el-button style="margin-top: 12px;"
                     @click="next"
                     v-if="!lastStep">下一步</el-button>
          <!-- 页面 -->
          <!-- 选择数据部分 -->
          <d-view v-show="active == 0"></d-view>
          <!-- 参数部分 -->
          <div v-show="active == 1">
            <!-- 学习率 weight batch_size 标识 图片大小-->
            <el-form :model="trainForm"
                     :rules="trainRules"
                     ref="trainForm"
                     label-width="100px"
                     class="demo-trainForm">
              <el-form-item label="唯一标识"
                            prop="name"
                            required>
                <el-input v-model="trainForm.name"></el-input>
              </el-form-item>
              <el-form-item label="图片大小"
                            required>
                <el-col :span="11">
                  <el-form-item prop="imgSize1">
                    <el-input v-model="trainForm.imgSize1"></el-input>
                  </el-form-item>
                </el-col>
                <el-col class="line"
                        :span="2">*</el-col>
                <el-col :span="11">
                  <el-form-item prop="imgSize2">
                    <el-input v-model="trainForm.imgSize2"></el-input>
                  </el-form-item>
                </el-col>
              </el-form-item>
              <el-form-item style="font-size: 18px;"
                            label="选填参数">
              </el-form-item>
              <el-form-item prop="learnRate"
                            label="学习率">
                <el-input v-model="trainForm.learnRate"></el-input>
              </el-form-item>
              <el-form-item prop="learnRate">
                <el-input v-model="trainForm.learnRate"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="submitTrainForm('trainForm')">提交</el-button>
                <el-button @click="resetTrainForm('trainForm')">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
          <!-- 训练 -->
          <div v-show="active == 2">第3步
            <el-button @click="startTrain"
                       v-if="lastStep">开始训练</el-button>
          </div>
        </div>

        <!-- 预测 -->
        <div v-if="controlIndex == 5">
          <!-- <keep-alive> -->
          <el-steps :active="active"
                    finish-status="success">
            <!-- 选择数据部分 -->
            <el-step title="选择数据"> </el-step>
            <!-- 选择模型部分 -->
            <el-step title="选择模型"> </el-step>
            <!-- 预测 -->
            <el-step title="预测"></el-step>
          </el-steps>
          <el-button style="margin-top: 12px;"
                     @click="back"
                     v-if="!firstStep">上一步</el-button>
          <el-button style="margin-top: 12px;"
                     @click="next"
                     v-if="!lastStep">下一步</el-button>

          <!-- 页面 -->
          <!-- 选择数据部分 -->
          <d-view v-show="active == 0"></d-view>
          <!-- 选择模型部分 -->
          <div v-show="active == 1">
            <m-view></m-view>
          </div>
          <!-- 预测 -->
          <div v-show="active == 2">第3步
            <el-button @click="startPredict"
                       v-if="lastStep">开始预测</el-button>
          </div>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import upload from '@/components/upload'
import dView from '@/views/graduate/dataView'
import mView from '@/views/graduate/modelView'
export default {
  name: 'gi',
  components: {
    upload,
    dView,
    mView
  },
  data () {
    return {
      controlIndex: '0',
      dialogVisible: false,
      phoneNum: '17730226403',
      mailbox: '1729796645@qq.com',
      /* 步骤条参数复用 */
      active: 0,
      lastStep: false,
      firstStep: true,
      /* ------------ */
      /* 训练 */
      trainForm: {},
      trainRules: {}
      /* ------------ */
    }
  },
  mounted () {
    this.personVisibal = false
  },
  methods: {
    handleOpen () { },
    handleClose () { },
    newData () {
      this.controlIndex = 1
    },
    openData () {
      this.controlIndex = 2
    },
    openModel () {
      this.controlIndex = 3
    },
    trainModel () {
      this.lastStep = false
      this.firstStep = true
      this.active = 0
      this.controlIndex = 4
    },
    predict () {
      this.lastStep = false
      this.firstStep = true
      this.active = 0
      this.controlIndex = 5
    },
    // 下一步
    next () {
      this.active++
      if (this.active === 2) {
        this.lastStep = true
      } else if (this.active > 0) {
        this.firstStep = false
      }
    },
    // 上一步
    back () {
      this.active--
      if (this.active === 0) {
        this.firstStep = true
      } else if (this.active < 2) {
        this.lastStep = false
      }
    },
    // 训练
    submitTrainForm () { },
    resetTrainForm () {
      this.trainForm = {}
    },
    // 预测
    startPredict () { },
    startTrain () { }
  }
}
</script>

<style>
* {
  text-decoration: none;
  margin: 0;
  padding: 0;
}
#mainContent {
  width: 100%;
  height: 100%;
  background: url("../assets/back.jpg");
  background-size: 100% 100%;
  text-align: center;
  border-radius: 9px;
  display: flex;
  justify-content: center;
  align-items: Center;
}
#imgBack {
  width: 100%;
  height: 100%;
}
.el-menu {
  border-right: none !important;
}
.line {
  text-align: center;
}
.grayBack {
  background-color: rgba(146, 130, 111, 0.548);
  width: 100%;
  padding: 20px;
}
.titleH1 {
  font-size: 34px;
  margin: 0;
  margin-bottom: 10px;
  line-height: 48px;
  color: rgb(255, 245, 233);
}
.titleP {
  font-size: 18px;
  line-height: 28px;
  color: rgb(255, 238, 230);
  margin: 10px 0 5px;
}
.ioc {
  padding-top: 30px;
  padding-left: 60px;
  /* text-align: center; */
}
.ioc > .el-button {
  margin: 0;
}
.footer {
  /* background-color: rgb(161, 161, 161); */
  padding-top: 20px;
  height: 200px;
  margin-left: 0;
}

.footTitle {
  background-color: rgba(194, 220, 243, 0.548);
  font-size: 20px;
  padding: 3px;
  text-align: center;
  border-radius: 30px;
  margin-bottom: 10px;
}
img {
  width: 100%;
}
</style>
