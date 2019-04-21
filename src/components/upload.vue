<template>
  <div>
    <el-form :model="form"
             status-icon
             :rules="rules"
             ref="form">
      <el-row type="flex"
              justify="center">
        <el-col :span="22">
          <el-form-item label="标签:"
                        prop="flodName">
            <el-input v-model="form.flodName"
                      placeholder="请输入这批数据的唯一标识"
                      auto-complete="off"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row type="flex"
              justify="center">
        <el-col :span="22">
          <el-form-item label="上传文件:"
                        prop="files"
                        :label-width="formLabelWidth">
            </br>
            <el-upload :file-list="fileList"
                       :accept="acceptable"
                       ref="upload"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :action="uploadUrl()"
                       :on-change="addFile"
                       :data="realPath"
                       :auto-upload="false"
                       :limit="10"
                       list-type="picture-card"
                       :on-error="uploadError"
                       :on-success="uploadSuccess"
                       multiple>
              <!-- <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__text">大于10个图片请添加为压缩文件再上传
              </div> -->
            </el-upload>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%"
           :src="dialogImageUrl"
           alt="">
    </el-dialog>
    <div slot="footer"
         class="footer">
      </br>
      <el-button type="primary"
                 @click="newData()">上传</el-button>
    </div>
  </div>
</template>

<script>
import 'element-ui/lib/theme-chalk/display.css'
export default {
  name: 'upload',
  data () {
    return {
      acceptable: '.jpg',
      formLabelWidth: '500',
      labelWidth: '500',
      count: 0,
      fileList: [],
      form: {
        flodName: '',
        num: 0,
        author: 'tchennech'
      },
      realPath: { path: '' },
      rules: {},
      dialogVisible: false,
      dialogImageUrl: ''
    }
  },
  mounted () {
    this.personVisibal = false
  },
  methods: {
    addFile (file, fileList) {
      this.count++
      this.fileList = fileList
    },
    uploadUrl () {
      return '/api/upLoadImg.action'
    },
    handleRemove (file, fileList) {
      console.log('移出', file, fileList)
      this.fileList = fileList
    },
    handlePreview (file) {
      console.log('查看', file)
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    newData () {
      if (this.fileList.length === 0) {
        this.$message({
          message: '请添加文件',
          type: 'warning'
        })
        return
      }
      this.$confirm('确认选择完毕全部文件', '是否直接上传 ? ', '提示', {
        confirmButtonText: '上传',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '请求成功，系统正在处理'
        })
        this.uploadInfo()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    uploadInfo () {
      this.form.num = this.fileList.length
      // 请求后台，返回路径
      let posts = {
        datal: JSON.stringify(this.form)
      }
      this.$http.post('/api/upLoadData.action', posts).then(
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
              message: '上传成功',
              type: 'success'
            })
            this.realPath.path = result.path
            this.upLoadFiles()
          }
        }, function (err) {
          this.$message.error('服务器请求错误')
        }
      )
    },
    uploadSuccess (response, file, fileList) {
      this.count++
      console.log('成功上传', this.count)
      if (this.count >= this.fileList.length) {
        this.finishWork(true)
      }
      // response：即为后端传来的数据，这里我返回的是图片的路径
    },
    uploadError (response, file, fileList) {
      console.log('上传文件失败response', response)
      console.log('上传文件失败file', file)
      console.log('上传文件失败fileList', fileList)
    },
    upLoadFiles () {
      this.$refs.upload.submit()
    },
    finishWork (flag) {
      setTimeout(function () {
        this.form.flodName = ''
        this.form.num = 0
        this.fileList = []
        this.$refs.upload.clearFiles()
        console.log('成功')
        this.$emit('showbox', flag)
      }.bind(this),
      500
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
.el-upload-list__item {
  width: 13% !important;
  float: left !important;
  margin-top: 0 !important;
  margin-bottom: 5px;
}
.footer {
  /* text-align: center; */
  margin-left: 50px;
}
</style>
