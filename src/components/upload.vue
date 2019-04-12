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
            <el-upload class="upload-demo"
                       ref="upload"
                       :file-list="fileList"
                       :accept="acceptable"
                       :on-preview="handlePreview"
                       :on-remove="handleRemove"
                       :action="uploadUrl()"
                       :on-change="addFile"
                       :auto-upload="false"
                       :drag="true"
                       :limit="10"
                       multiple>
              <div class="el-upload__text">将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <div class="el-upload__text">大于10个图片请添加为压缩文件再上传
              </div>
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
      fileList: [],
      form: {
        flodName: '',
        files: []
      },
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
      this.fileList = fileList
      console.log(file, this.fileList)
    },
    uploadUrl () {
      return 'xxxxxxx'
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
      this.fileList = fileList
    },
    handlePreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    newData () {
      this.form.files = this.fileList
      let posts = {
        datal: JSON.stringify(this.form)
      }
      this.$http.post('/api/upLoadData.action', posts).then(
        function (res) {
          let result = JSON.parse(res.bodyText)
          console.log(result)
          if (result.status === 1) {
            this.$message({
              message: '登录失败:' + result.msg,
              type: 'warning'
            })
          } else {
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            let data = JSON.parse(result.data)
            if (data.role === 1) {
              setTimeout(
                function () {
                  this.$router.push({
                    path: '/handsome',
                    name: 'adindex',
                    params: res
                  })
                }.bind(this),
                1000
              )
            } else {
              setTimeout(
                function () {
                  this.$router.push({
                    path: '/pe',
                    name: 'pe'
                  })
                }.bind(this),
                1000
              )
            }
          }
        },
        function (err) {
          this.$message.error('服务器请求错误')
        }
      )
    }
    /*
    onSubmit(){
         this.form={
            a:1,
            b:2,
            c:3
          }
          let file=''
        for(let x in this.form){

          this.param.append(x,this.form[x])
        }
        for(let i=0;i<this.fileList.length;i++){
          file='file'+this.count
          this.count++
          this.param.append(file,this.fileList[i].raw)
        }
        batchTagInfo(this.param)
          .then(res=>{
            alert(res)
          })
      }
      */
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
  width: 47% !important;
  float: left !important;
  margin-top: 0 !important;
  margin-bottom: 5px;
}
.footer {
  /* text-align: center; */
  margin-left: 50px;
}
</style>
