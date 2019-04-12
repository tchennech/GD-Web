<template>
  <div id="login">
    <el-row>
      <el-col :span="24"
              id="loginTitle">用户登录</el-col>
      <el-col :span="24">
        <el-row type="flex"
                justify="center">

          <el-col :span="10"
                  :xs="20">
            <el-form label-width="70px">
              <el-form-item label="用户名">
                <el-input prefix-icon="el-icon-edit"
                          v-model="username"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input prefix-icon="el-icon-edit-outline"
                          type="password"
                          v-model="password"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="login()">登录</el-button>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  mounted: {

  },
  methods: {
    login () {
      if (this.username === '' || this.password === '') {
        this.$message({
          message: '请输入用户名或密码',
          type: 'warning'
        })
      } else {
        // 过滤字符
        let datas = {
          userName: this.username,
          password: this.password
        }
        let posts = {
          datal: JSON.stringify(datas)
        }
        this.$http.post('/api/userlogin.action', posts).then(
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
    }
  }
}
</script>
<style>
#login {
  background-color: white !important;
}
#loginTitle {
  font-size: 30px;
  font-family: "youyuan";
  font-weight: bold;
  margin: 20px 0;
  text-align: center;
}
</style>
