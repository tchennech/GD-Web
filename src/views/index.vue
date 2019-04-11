<template>
  <div>
    <el-container>
      <el-header height="300px"
                 id="indexB">
        <div>
          <img data-wow-duration="2s"
               class="heads wow flipInX"
               src="../assets/my.png">
          <p data-wow-duration="2s"
             data-wow-delay="0.5s"
             class="title wow fadeInUp">名字太难取了</p>
          <p data-wow-duration="2s"
             data-wow-delay="1s"
             class="mainText wow fadeInUp">这里是名字太难取了的首页，进行一些说明</p>
        </div>
        <div class="arrow"></div>
      </el-header>
      <el-main>
        <div class="introduce">
          <div class="normal wow"
               data-wow-duration="1.5s"
               data-wow-delay="0.3s"
               v-bind:class="index%2==0 ? 'grayB bounceInLeft':'whiteB bounceInRight'"
               v-for="index in listNum">
            <div class="titles">

              <div class="ta">
                <span class="lrImg leImg"></span>{{lists[index-1][0]}}
                <span class="lrImg riImg"></span>
              </div>

              <p class="tb">{{lists[index-1][1]}}</p>
            </div>
            <div class="card">
              {{lists[index-1][2]}}
            </div>
          </div>
        </div>
        <el-alert title="作者推荐"
                  type="success"
                  description="我推荐了一些东西给你们哦，我会尽量更新的！"
                  :closable="false"
                  close-text=" ">
        </el-alert>
        <el-row :gutter="30"
                justify="space-around">
          <el-col :span="8"
                  :xs="24"
                  v-for="index in 4"
                  :key="index"
                  class="wow lightSpeedIn">
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
      title: false,
      listNum: 3,
      lists: [
        ['关于网站声明', '网站用途', '这是一个个人网站，主要是用来记录平时学习的过程，欢迎各位学习交流，可以在右下角悬浮处给我留言！鄙人不才，只是记录学习过程，把难点提出来，如果有同样困惑或者想进行相同学习的同学们可以看一下我踩过的路。传送门在上面的学习资料选项。尽管现在这个小网站啥内容都没有，但是我希望在未来，至少三年时间，它能丰富起来。'],
        ['关于网站说明', '简介网站开发', '本站使用前端框架采用vue.js(2.0，并用了vue-cli)、element-ui；后台还没想好哈哈哈。首先感谢框架开发者们，前人种树，后人乘凉大大便利了开发过程； 如果有对这个小网站感兴趣的同学，可以看一下GitHub的源码。 最后那个管理员只有我自己进去的哦！最后求求大佬们别攻击我的网站。'],
        ['关于个人简历', '说明一下个人简历', '个人简历主要是为了找导师以及求职准备。这个查看是需要密码哦！密码应该随邮件发送了，或者直接写在简历上面了。这里再留一次联系方式1729796645@qq.com，同QQ。']
      ],
      imgs: ['static/t1.jpg', 'static/t2.jpg', 'static/t3.jpg', 'static/t4.jpg'],
      titles: ['搭建第一个vue项目', 'javascript注意事项', 'python入门', '使用python学习人工智能']
    }
  },
  mounted () {
    setTimeout(' ', 3000);
    this.title = true
    let wow = new WOW({
      boxClass: 'wow',
      animateClass: 'animated',
      offset: -6,
      mobile: true,
      live: true
    });
    wow.init();
  },
  methods: {
    toSI () {
      this.$router.push({
        path: "/pe",
        name: "pe"
      });
    },
    toArticle (index) {
      this.$router.push({
        path: "/pe",
        name: "pe"
      });
    }
  }
}
</script>

<style>
#indexB {
  position: relative;
  background: url('../assets/back.jpg');
  background-size: 100% 100%;
  text-align: center;
  border-radius: 9px;
}
.heads {
  margin-top: 30px;
  width: 100px;
  height: 100px;
}
.el-header {
  padding: 0;
}
.leImg {
  background: url('../assets/iconleft.png') no-repeat;
}

.riImg {
  background: url('../assets/iconright.png') no-repeat;
}

.lrImg {
  width: 56px;
  height: 36px;
  display: inline-block;
  vertical-align: top;
  background-size: 100% !important;
  margin-right: 6px;
}

.introduce {
  margin-bottom: 30px;
}

.arrow {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 120px;
  background: url(../assets/arrow-lr.png) center;
  z-index: 1;
  border-radius: 7px;
}
</style>
