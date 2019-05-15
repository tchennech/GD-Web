<template>
  <div class="look">
    <el-row :gutter="20">
      <el-col :span="8"
              v-for="(file, index) in files"
              :key="index">
        <el-card class="view-img-card"
                 :body-style="{ padding: '0px' }">
          <img :src="'/api/'+path+file"
               class="image">
          <div style="padding: 14px;">
            <span>{{file}}</span>
          </div>
        </el-card>
      </el-col>
    </el-row>
    <!-- <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog> -->
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
export default {
  name: 'viewImgs',
  props: {
    imgId: {
      type: String,
      default: ''
    },
    imgType: {
      type: Number,
      default: 0
    },
    path: {
      type: String,
      default: ''
    },
    datas: {
      type: Array,
      default: []
    }
  },
  data () {
    return {
      files: [],
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  mounted () {
    this.personVisibal = false
    this.getImgs()
    console.log('in...')
    console.log(this.imgType)
    console.log(this.path)
    console.log(this.datas)
  },
  methods: {
    getImgs () {
      let form = {}
      form.id = this.imgId
      // 请求后台，返回路径
      let posts = {
        datal: JSON.stringify(form)
      }
      let url = '/api/getImgs.action'
      if (this.imgType === 1) {
        this.files = []
        for (let x in this.datas) {
          this.files.push(this.datas[x].name)
        }
        return
      }
      this.$http.post(url, posts).then(
        function (res) {
          let result = JSON.parse(res.bodyText)
          console.log(result)
          if (result.status === 1) {
            this.$message({
              message: '服务器请求失败:' + result.msg,
              type: 'warning'
            })
          } else {
            this.$message({
              message: '后台读取数据成功',
              type: 'success'
            })
            this.path = JSON.parse(result.path)
            this.files = JSON.parse(result.files)
          }
        }, function (err) {
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
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.image {
  width: 100%;
  display: block;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.view-img-card {
  height: 600px !important;
}
.view-img-card > .el-card__body {
  height: 100%;
  width: 100%;
}
.view-img-card > img {
  height: 80%;
}
.look {
  height: 80%;
}
</style>
