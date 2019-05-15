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
            <h1 class="titleH1">病理图像分类平台
            </h1>
            <p class="titleP">人工智能赋能医疗</p>
          </div>
          <div class="line">
            <!-- <img src="../assets/back.jpg"
                  id="imgBack"> -->
          </div>
        </div>
        <div v-if="controlIndex == 1">
          <h2 class="titleM">数据上传</h2>
          <upload></upload>
        </div>
        <div v-if="controlIndex == 2">
          <h2 class="titleM">数据一览</h2>
          <d-view :visi-type="true"></d-view>
        </div>
        <div v-if="controlIndex == 3">
          <h2 class="titleM">模型一览</h2>
          <m-view></m-view>
        </div>

        <!-- 训练 -->
        <div v-if="controlIndex == 4">
          <h2 class="titleM">模型训练</h2>
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
          <d-view :visi-type="false"
                  v-show="active == 0"
                  @showbox="getData"
                  :data="data"
                  :key="1"></d-view>
          <!-- 参数部分 -->
          <div v-show="active == 1">
            <!-- 学习率 weight batch_size 标识 图片大小-->
            <el-form :model="trainForm"
                     :rules="trainRules"
                     ref="trainForm"
                     label-width="100px"
                     class="demo-trainForm">
              <el-form-item label="唯一标识"
                            prop="name">
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
          <div v-show="active == 2">
            <div style="margin-top: 30px">
              <el-button @click="startTrain"
                         v-if="lastStep">开始训练</el-button>
              <el-row type="flex"
                      justify="space-around">
                <el-col :span="10">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>训练数据</span>
                    </div>
                    <div v-for="(value, key) of data"
                         :key="key"
                         class="text item">
                      {{key+': ' + value}}
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="10">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>训练参数</span>
                    </div>
                    <div v-for="(value, key) of trainFormTrue"
                         :key="key"
                         class="text item">
                      {{key+': ' + value}}
                    </div>
                  </el-card>
                </el-col>
              </el-row>

            </div>
          </div>
        </div>

        <!-- 预测 -->
        <div v-if="controlIndex == 5">
          <h2 class="titleM">结果预测</h2>
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
          <d-view :visi-type="false"
                  v-show="active == 0"
                  @showbox="getData"
                  :data="data"
                  :key="2"></d-view>
          <!-- 选择模型部分 -->
          <div v-show="active == 1">
            <m-view :visi-type="false"
                    @showbox="getModel"
                    :model="model"
                    :key="2"></m-view>
          </div>
          <!-- 预测 -->
          <div v-show="active == 2">
            <div style="margin-top: 30px">
              <el-button @click="startPredict"
                         v-if="lastStep">开始预测</el-button>
              <el-row type="flex"
                      justify="space-around">
                <el-col :span="10">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>训练数据</span>
                    </div>
                    <div v-for="(value, key) of data"
                         :key="key"
                         class="text item">
                      {{key+': ' + value}}
                    </div>
                  </el-card>
                </el-col>
                <el-col :span="10">
                  <el-card class="box-card">
                    <div slot="header"
                         class="clearfix">
                      <span>训练参数</span>
                    </div>
                    <div v-for="(value, key) of model"
                         :key="key"
                         class="text item">
                      {{key+': ' + value}}
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </div>
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
      /* 步骤条参数复用 */
      active: 0,
      lastStep: false,
      firstStep: true,
      nextFlag: 0,
      /* ------------ */
      /* 训练 */
      trainForm: {},
      trainFormTrue: {},
      trainRules: { name: [
        { required: true, message: '请输入模型标识', trigger: 'blur' }
      ],
      imgSize1: [{ required: true, message: '请输入图片大小', trigger: 'blur' }],
      imgSize2: [{ required: true, message: '请输入图片大小', trigger: 'blur' }]
      },
      data: {},
      model: {}
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
      this.nextFlag = 0
      this.data = {}
      this.controlIndex = 4
    },
    predict () {
      this.lastStep = false
      this.firstStep = true
      this.active = 0
      this.nextFlag = 0
      this.data = {}
      this.model = {}
      this.controlIndex = 5
    },
    // 下一步
    next () {
      if (this.active + 1 > this.nextFlag) {
        this.$message({
          message: '请完成本步骤',
          type: 'warning'
        })
        return
      }
      if (this.active === 1 && this.controlIndex === 4) {
        if (JSON.stringify(this.trainFormTrue) !== JSON.stringify(this.trainForm)) {
          this.$confirm('您修改的数据尚未提交', '是否直接进行下一步 ? ', '提示', {
            confirmButtonText: '继续',
            cancelButtonText: '返回提交',
            type: 'warning'
          }).then(() => {
            this.nextRight()
          }).catch(() => {

          })
        } else {
          this.nextRight()
        }
      } else {
        this.nextRight()
      }
    },
    nextRight () {
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
    submitTrainForm () {
      this.$refs['trainForm'].validate((valid) => {
        if (valid) {
          this.$message({
            message: '成功提交',
            type: 'success'
          })
          let obj = JSON.stringify(this.trainForm)
          this.trainFormTrue = JSON.parse(obj)
          this.nextFlag = 2
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetTrainForm () {
      let obj = JSON.stringify(this.trainFormTrue)
      this.trainForm = JSON.parse(obj)
    },
    startTrain () {
      this.trainFormTrue.id = this.data.id
      let posts = {
        datal: JSON.stringify(this.trainFormTrue)
      }
      this.$http.post('/api/trainModel.action', posts).then(
        function (res) {
          let result = JSON.parse(res.bodyText)
          console.log(result)
        },
        function (err) {
          this.$message.error('服务器请求错误')
        }
      )
    },
    getData (data) {
      if (data != null) {
        this.nextFlag = 1
        console.log(data)
        delete data.path
        this.data = data
      }
    },
    getModel (model) {
      if (model != null) {
        this.nextFlag = 2
        console.log(model)
        delete model.path
        this.model = model
      }
    },
    // 预测
    startPredict () {
      let form = {}
      form.dataId = this.data.id
      form.modelId = this.model.id
      let posts = {
        datal: JSON.stringify(form)
      }
      const loading = this.openFullScreen()
      this.$http.post('/api/predict.action', posts).then(
        function (res) {
          loading.close()
          let response = JSON.parse(res.bodyText)
          if (response.status == 0) {
            let result = response.result
            console.log(result)
            this.$router.push(
              {
                path: '/resultWatch',
                name: 'resultWatch',
                query: {
                  data: result
                }
              })
          } else {
            console.log(response)
            this.$message.error('后台处理错误')
          }
        },
        function (err) {
          loading.close()
          console.log(err)
          this.$message.error('服务器请求错误')
        }
      )
    },
    openFullScreen () {
      const loading = this.$loading({
        lock: true,
        text: '算法比较耗时，请勿刷新，预计2分钟...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      return loading
    }

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
  background: url("../assets/back.jpeg");
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
  background-color: rgba(21, 126, 175, 0.548);
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
.titleM {
  font-family: Helvetica Neue, Helvetica, PingFang SC, Hiragino Sans GB,
    Microsoft YaHei, SimSun, sans-serif;
  font-weight: 400;
  font-size: 28px;
  margin-bottom: 10px;
}
.ioc {
  padding-top: 30px;
  padding-left: 60px;
  /* text-align: center; */
}
.ioc > .el-button {
  margin: 0;
}
img {
  width: 100%;
}
.demo-trainForm {
  margin-top: 30px;
  width: 80%;
}
.box-card {
  width: 80%;
  min-width: 200px;
}
.toolbar {
  overflow: auto;
}
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.el-card__body {
  height: 200px;
  overflow: auto;
}
.el-card__body::-webkit-scrollbar {
  /*滚动条整体样式*/
  width: 10px; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px;
}
.el-card__body::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(73, 110, 131, 0.589);
  background: #5f5151;
}
.el-card__body::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  -webkit-box-shadow: inset 0 0 5px rgba(46, 46, 46, 0.2);
  border-radius: 10px;
  background: #ffffff;
}
</style>
