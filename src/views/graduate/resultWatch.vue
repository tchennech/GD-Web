<template>
  <div style="height: 100%">
    <el-container style="height: 100%">
      <el-aside style="border-right: solid 1px #e6e6e6;">
        <el-menu default-active="3"
                 class="el-menu-vertical-demo"
                 @open="handleOpen"
                 @close="handleClose">
          <el-menu-item index="3"
                        @click="controlIndex='3'">
            <i class="el-icon-menu"></i>
            <span slot="title">基本信息</span>
          </el-menu-item>
          <el-menu-item index="0"
                        @click="openIndex">
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
              <el-menu-item index="1-2"
                            @click="singleCat">查看详细</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <div v-if="controlIndex == '0'">
          <h2 class="titleM">检测结果</h2>
          <viewImgs :imgType="1"
                    :path="imgInfo.detectorPath"
                    :datas="datas"
                    v-if="controlIndex == '0'"></viewImgs>
        </div>

        <!-- 总览 -->
        <div v-if="controlIndex == '1'">
          <h2 class="titleM">结果一览</h2>
          <div>
            <p>
              <span>预测的数据集id：{{imgInfo.id}}</span>
            </p>
            <p>
              <span>识别细胞数：{{imgInfo.goodNum + imgInfo.badNum}}</span>
            </p>
            <p>
              <span>坏细胞个数：{{imgInfo.badNum}}</span>
            </p>
            <p>
              <span>好细胞数：{{imgInfo.goodNum}}</span>
            </p>

          </div>
          <pieChart :name="'结果总览'"
                    :id="imgInfo.id"
                    :data="pieData"></pieChart>
        </div>
        <!-- 详情 -->
        <div v-if="controlIndex == '2'">
          <h2 class="titleM">查看详情</h2>
          <div>
            <p>
              <span>图片名：{{datas[chooseIndex].name}}</span>
            </p>
            <p>
              <span>识别细胞数：{{datas[chooseIndex].num}}</span>
            </p>
            <p>
              <span>坏细胞个数：{{datas[chooseIndex].badNum}}</span>
            </p>
            <p>
              <span>好细胞数：{{datas[chooseIndex].goodNum}}</span>
            </p>
          </div>
          <el-row>
            <el-col :span="12">
              <pieChart :name="datas[chooseIndex].name"
                        :id="datas[chooseIndex].name"
                        :data="pieData"></pieChart>
            </el-col>
            <el-col :span="12">
              <el-card class="img-card"
                       :body-style="{ padding: '0px' }">
                <img :src="'/api/'+imgInfo.resultPath+datas[chooseIndex].name"
                     class="image">
                <div style="padding: 14px;">
                  <span>{{datas[chooseIndex].name}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
          <el-button-group>
            <el-button type="primary"
                       icon="el-icon-arrow-left"
                       @click="before">上一个</el-button>
            <el-button type="primary"
                       @click="next">下一个<i class="el-icon-arrow-right el-icon--right"></i></el-button>
          </el-button-group>
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
  name: 'rw',
  components: {
    viewImgs,
    pieChart
  },
  data () {
    return {
      controlIndex: '3',
      // 默认8中类别对应的颜色
      colors: ['#6CFF9F', '#6CFFF5', '#6CC2FF', '#6C7DFF', '#FF3A3A', '#FF6F3A', '#FFAD3A', '#FFF53A'],
      datas: [],
      pieData: [],
      imgInfo: {},
      chooseIndex: 0,
      chooseId: ''
      /* ------------ */
    }
  },
  mounted () {
    this.initData()
  },
  methods: {
    initData () {
      this.pieData = [
        { value: 0,
          name: '正常表层细胞',
          itemStyle: {
            color: this.colors[0]
          } },
        { value: 0,
          name: '正常中底层细胞',
          itemStyle: {
            color: this.colors[1]
          } },
        {
          value: 0,
          name: '粒细胞',
          itemStyle: {
            color: this.colors[2]
          } },
        { value: 0,
          name: '腺细胞',
          itemStyle: {
            color: this.colors[3]
          } },
        {
          value: 0,
          name: '非典型鳞状细胞',
          itemStyle: {
            color: this.colors[4]
          } }, {
          value: 0,
          name: '挖空细胞',
          itemStyle: {
            color: this.colors[5]
          } }, {
          value: 0,
          name: '高核浆比细胞',
          itemStyle: {
            color: this.colors[6]
          } }, {
          value: 0,
          name: '垃圾',
          itemStyle: {
            color: this.colors[7]
          } }]
      let data = this.$route.query.data
      data = JSON.parse(data)
      this.datas = data.pictures
      delete data.pictures
      this.imgInfo = data
      this.imgInfo['goodNum'] = 0
      this.imgInfo['badNum'] = 0
      console.log(this.imgInfo)
      for (let i = 0; i < 3; i++) {
        this.imgInfo.goodNum += this.datas[i].goodNum
        this.imgInfo.badNum += this.datas[i].badNum
      }
      for (let index = 0; index < 8; index++) {
        this.pieData[index].value = this.datas[0].typeNum[index]
      }
    },
    handleOpen () { },
    handleClose () { },
    openIndex () {
      this.controlIndex = '0'
    },
    allCat () {
      console.log(this.datas)
      for (let j = 0; j < 8; j++) {
        let num = 0
        for (let index in this.datas) {
          num += this.datas[index].typeNum[j]
        }
        this.pieData[j].value = num
      }
      console.log(this.pieData)
      this.controlIndex = '1'
    },
    singleCat () {
      this.controlIndex = '2'
      console.log(this.controlIndex)
    },
    before () {
      if (this.chooseIndex === 0) {
        this.openMessage('提示', '已经到达第一个')
        return
      }
      this.chooseIndex--
    },
    next () {
      if (this.chooseIndex === 2) {
        this.openMessage('提示', '已经到达最后一个')
        return
      }
      this.chooseIndex++
    },
    openMessage (title, content) {
      this.$alert(content, title, {
        confirmButtonText: '确定',
        callback: action => {
          this.$message({
            type: 'info',
            message: `action: ${action}`
          })
        }
      })
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
.img-card {
  height: 600px !important;
  width: 70%;
}
.img-card > .el-card__body {
  height: 100%;
  width: 100%;
}
.img-card > img {
  height: 90%;
}
</style>
