<template>
  <div class="content-box">
    <div class="focus">
      <img src="../../static/image/personal-center/banner.png" alt="">
    </div>
    <div class="checklist">
      <ul>
        <li @click="goMyProfile">
          <div class="icon myProfile">
          </div>
          <span>我的资料</span>
        </li>
        <li  @click="goMyindicato">
          <div class="icon myIndicator">
          </div>
          <span>我的指标</span>
        </li>
        <li @click="goAddressBook">
          <div class="icon addressBook" >
          </div>
          <span>通讯录</span>
        </li>
        <li @click="goPending">
          <div class="icon pending">
          </div>
          <span>待处理</span>
        </li>
        <li @click="goAnnouncement">
          <div class="icon notice">
          </div>
          <span>通知通告</span>
        </li>
        <li @click="goMyLog">
          <div class="icon myLog">
          </div>
          <span>我的日志</span>
        </li>
      </ul>
    </div>
    <van-tabbar v-model="active" @change="onChange">
      <van-tabbar-item icon="newspaper-o
      ">绩效益阳</van-tabbar-item>
      <van-tabbar-item icon="friends-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
// import commonHeader from 'common/common-header'
import * as homeApi from 'api/home-api'
export default {
  data() {
    return {
      tittle: '详情',
      data: 0,
      active: 1,
      //  控制进入个人指标还是领导指标页面
      status: 1
    }
  },
  components: {
  },
  created () {
    this.getMyIndexStatus()
  },
  computed: {
  },
  methods: {
    // tabbar切换处理
    onChange(index) {
      if (index === 0) {
        this.$router.push({path: '/home'})
      } else {
      }
    },
    // 点击去往我的资料
    goMyProfile() {
      this.$router.push({path: '/my_profile'})
    },
    // 点击去往我的指标
    goMyindicato() {
      console.log(this.status)
      if (this.status === 1 || this.status === 2) {
        this.$router.push({path: '/leadership_indicator'})
      } else {
        this.$router.push({path: '/my_indicator'})
      }
    },
    // 点击去通讯录
    goAddressBook() {
      this.$router.push({path: '/address_book'})
    },
    // 点击去往待处理
    goPending() {
      this.$router.push({path: '/pending'})
    },
    //  获取我的指标判断要进哪个页面
    getMyIndexStatus() {
      homeApi.getMyIndex().then((res) => {
        if (res.data.code === 10000) {
          console.log(res)
          this.status = res.data.data.types
        }
      })
    },
    //  去往通知公告页面
    goAnnouncement() {
      this.$router.push({path: '/announcement'})
    },
    //   点击去我的日志
    goMyLog() {
      this.$router.push({path: '/my_log'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.focus{
  width: 80%;
  height: 9.875rem;
  border-radius: .75rem;
  margin: 0 auto;
  margin-top: 1.875rem;
}
.checklist{
  width: 80%;
  margin: 0 auto;
  margin-top: 1.875rem;
  ul{
    display: flex;
    flex-wrap: wrap;
    li{
      width: 33%;
      text-align: center;
      margin-bottom: .75rem;
      .icon{
        width: 3rem;
        height: 3rem;
        background-color: aquamarine;
        margin: 0 auto;
        margin-bottom: .9375rem;
        border-radius: 50%;
      }
      span{
        font-size: .875rem;
        color: #333;
        font-weight: bold;
      }
    }
  }
}
.myProfile{
  background: url(../../static/image/personal-center/myProfile.png) no-repeat;
  background-size: 3rem 3rem;
}
.myIndicator{
  background: url(../../static/image/personal-center/myIndicator.png) no-repeat;
  background-size: 3rem 3rem;
}
.addressBook{
  background: url(../../static/image/personal-center/addressBook.png) no-repeat;
  background-size: 3rem 3rem;
}
.pending{
  background: url(../../static/image/personal-center/pending.png) no-repeat;
  background-size: 3rem 3rem;
}
.notice{
  background: url(../../static/image/personal-center/notice.png) no-repeat;
  background-size: 3rem 3rem;
}
.myLog{
  background: url(../../static/image/personal-center/myLog.png) no-repeat;
  background-size: 3rem 3rem;
}
.focus{
  img{
    width: 100%;
    height: 100%;
  }
}
</style>
