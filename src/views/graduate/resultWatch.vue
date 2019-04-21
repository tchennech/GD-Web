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
            <span slot="title">图像检测结果</span>
          </el-menu-item>
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">图像分类结果</span>
            </template>
            <el-menu-item-group>
              <span slot="title">总览</span>
              <el-menu-item index="1-1"
                            @click="allCat">查看一览</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="详情">
              <el-menu-item index="1-2"
                            @click="singleCat">查看详细</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div class="line"
             v-if="controlIndex == 0">
          <viewImgs v-if="controlIndex == 0"
                    :imgId="chooseId"></viewImgs>
        </div>

        <!-- 总览 -->
        <div v-if="controlIndex == '1'">
          <h2 class="titleM">结果一览</h2>
        </div>
        <!-- 详情 -->
        <div v-if="controlIndex == '2'">
          <h2 class="titleM">查看详情</h2>
          <div>
            <p>
              <span>图片名：</span>
            </p>
            <p>
              <span>识别细胞数：</span>
            </p>
            <p>
              <span>坏细胞个数：</span>
            </p>
            <p>
              <span>好细胞数：</span>
            </p>

          </div>
          <pieChart :name="data[chooseIndex].name"
                    :id="data[chooseIndex].name"
                    :data="pieData"
                    v-if="controlIndex == '2'"></pieChart>
          :key="index">
          <el-card class="img-card"
                   :body-style="{ padding: '0px' }">
            <img :src="'/api/'+data[chooseIndex].path+data[chooseIndex].name"
                 class="image">
            <div style="padding: 14px;">
              <span>{{data[chooseIndex].name}}</span>
            </div>
          </el-card>
        </div>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
import viewImgs from '@/components/viewImgs'
import pieChart from '@/components/pieChart.vue'

export default {
  name: 'gi',
  components: {
    viewImgs
  },
  data () {
    return {
      controlIndex: '0',
      dialogVisible: false,
      // 默认8中类别对应的颜色
      colors: ['#6CFF9F', '#6CFFF5', '#6CC2FF', '#6C7DFF', '#FF3A3A', '#FF6F3A', '#FFAD3A', '#FFF53A'],
      data: [],
      pieData: [
        {          value: 0, name: '正常表层细胞', itemStyle: {
            color: this.colors[0]
          }        },
        {          value: 0, name: '正常中底层细胞', itemStyle: {
            color: this.colors[1]
          }        },
        {
          value: 0, name: '粒细胞',
          itemStyle: {
            color: this.colors[2]
          }        },
        {          value: 0, name: '腺细胞', itemStyle: {
            color: this.colors[3]
          }        },
        {
          value: 0, name: '非典型鳞状细胞',
          itemStyle: {
            color: this.colors[4]
          }        }, {
          value: 0, name: '挖空细胞',
          itemStyle: {
            color: this.colors[5]
          }        }, {
          value: 0, name: '高核浆比细胞',
          itemStyle: {
            color: this.colors[6]
          }        }, {
          value: 0, name: '垃圾',
          itemStyle: {
            color: this.colors[7]
          }        },
      ],
      chooseIndex: 0,
      /* 步骤条参数复用 */
      active: 0,
      lastStep: false,
      firstStep: true,
      nextFlag: 0,
      /* ------------ */
      /* 训练 */
      trainForm: {},
      trainFormTrue: {},
      trainRules: {        name: [
          { required: true, message: '请输入模型标识', trigger: 'blur' }
        ],
        imgSize1: [{ required: true, message: '请输入图片大小', trigger: 'blur' }],
        imgSize2: [{ required: true, message: '请输入图片大小', trigger: 'blur' }]
      },
      data: {},
      chooseId: '',
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
    allCat () {
      this.controlIndex = '1'
    },
    singleCat () {
      this.controlIndex = '2'
      console.log(this.controlIndex)
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
      this.$http.post('/api/predict.action', posts).then(
        function (res) {
          let result = JSON.parse(res.bodyText)
          console.log(result)
        },
        function (err) {
          this.$message.error('服务器请求错误')
        }
      )
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
  /* background: url('../assets/back.jpg'); */
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
  content: '';
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
.img-card {
  height: 400px;
}
.img-card > .el-card__body {
  height: 100%;
  width: 100%;
}
.img-card > img {
  height: 80%;
}
</style>
