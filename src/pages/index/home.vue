<template>
  <div class="content-box">
    <!-- 头部组件 -->
    <common-header :showinput="true" :showback="false"></common-header>
    <!-- tab栏 -->
    <van-tabs v-model="tabIndex"   sticky swipeable @click="tabClick">
    <van-tab v-for="item in tab" :title="item.name" :name="item.id" :key="item.id">
    <!--  列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多数据了"
      @load="onLoad"
    >
    <!-- 列表的内容 -->
    <div v-for="(item, index) in list" :key="index">
      <div class="content-item" @click="goDetail(item.id, item.infoType, item.infoType)">
        <div class="item-img" v-show="item.imgurl ? true : false">
          <img :src="item.imgurl" alt="">
        </div>
        <div class="item-right">
          <p>{{item.title || null}}</p>
          <div class="item-time">
            <span>{{item.sortTypeName || null}}</span>
            <span v-show="item.createTime" >{{item.createTime | dateYMD}}</span>
          </div>
        </div>
      </div>
      <div v-if="socialEvaluationList.length !== 0">
        <div class="content-item socialEvaluation " v-if="index === 1">
          <p>社会评价</p>
          <div class="fatherBox">
            <div class="children" v-for="(items, index) in socialEvaluationList" :key="index" @click="goScore(items.id)">
              {{items.title}}
            </div>
          </div>
        </div>
      </div>
    </div>

    </van-list>
    </van-tab>
    </van-tabs>
    <!-- 底部导航 -->
    <van-tabbar v-model="active" @change="tabbarOnChange">
      <van-tabbar-item icon="newspaper-o">绩效益阳</van-tabbar-item>
      <van-tabbar-item icon="friends-o">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { mapMutations, mapGetters, mapState } from 'vuex'
import commonHeader from 'common/common-header'
import * as homeApi from 'api/home-api'
// import { ERR_OK } from 'config/index'
export default {
  data() {
    return {
      num: 0,
      active: 0,
      tabIndex: 0,
      tab: [],
      //  上拉加载需要的数据
      list: [],
      loading: false,
      finished: false,
      //  列表查询需要传入的参数
      listParams: {
        infoType: 8,
        page: 1,
        size: 5
      },
      // 列表的最大条数
      listTotal: 0,
      theRequest: {},
      // 社会评价数据
      socialEvaluationList: []
    }
  },
  created() {
    this.tabs()
    // this.listRequst()
    let codeUrl = window.location.search
    this.getQueryString(codeUrl)
  },
  methods: {
    ...mapMutations({
      setNum: 'SET_NUM'
    }),
    //  请求社会评价
    getOrgTypeTree() {
      homeApi.getOrgTypeTree(1).then((res) => {
        if (res.data.code === 10000) {
          this.socialEvaluationList = res.data.data
        }
      })
    },
    //  去往社会评价打分页面
    goScore(id) {
      this.$router.push({
        path: '/societyScore',
        query: {
          id: id
        }
      })
    },
    //  请求列表的数据
    listRequst() {
      homeApi.list(this.listParams).then((res) => {
        this.listTotal = res.data.data.total
        this.list = res.data.data.dataList
      })
    },
    //  上拉加载
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        this.listParams.page += 1
        homeApi.list(this.listParams).then((res) => {
          for (let i = 0; i < 5; i++) {
            if (res.data.data.dataList[i] === undefined) {
              return
            }
            this.list.push(res.data.data.dataList[i])
            this.finished = false
          }
        })
        // 加载状态结束
        this.loading = false
        // 数据全部加载完成
        if (this.list.length >= this.listTotal) {
          this.finished = true
          return false
        }
      }, 500)
    },
    tabs () {
      homeApi.tab().then((res) => {
        this.tab = res.data.data.data
        this.listParams.infoType = res.data.data.data[0].id
        this.listRequst()
      })
    },
    // tabbar切换处理
    tabbarOnChange(index) {
      if (index === 1) {
        this.getAuthorized()
        // this.$router.push({path: '/personal_center'})
      } else if (index === 0) {
        this.$router.push({path: '/home'})
      }
    },
    // tab栏点击触发
    tabClick (name, title) {
      if (name === '4') {
        this.getOrgTypeTree()
      } else {
        this.socialEvaluationList = []
      }
      this.listParams.infoType = name
      this.listParams.page = 1
      this.listRequst()
      this.onLoad()
    },
    //  点击去详情页
    goDetail(id, type, infoType) {
      if (infoType === 4) {
        this.$router.push({
          path: '/realTime',
          query: {
            id: id,
            type: type
          }
        })
      } else {
        this.$router.push({
          path: '/detail',
          query: {
            id: id,
            type: type
          }
        })
      }
    },
    //  请求微信授权
    getAuthorized () {
      // window.location.href = 'http://ad.mobwin.me:8085/wechatlogin/getOauth2code?redirect_url=http://ad.mobwin.me:9095/weixin/index.html'
      window.location.href = 'http://ad.mobwin.me:8085/wechatlogin/getOauth2code?redirect_url=http://127.0.0.1/#/'
    },
    //  获取微信授权的code
    getQueryString(url) {
      if (url.indexOf('?') !== -1) {
        var str = url.substr(1)
        var strs = str.split('&')
        for (var i = 0; i < strs.length; i++) {
          this.theRequest[strs[i].split('=')[0]] = (strs[i].split('=')[1])
        }
      }
      this.getLoginId()
      let theCode = JSON.stringify(this.theRequest)
      localStorage.setItem('Login_Code', theCode)
    },
    //  获取微信登录id
    getLoginId() {
      if (JSON.stringify(this.theRequest) === '{}') {
      } else {
        homeApi.loginId(this.theRequest).then((res) => {
          if (res.data.code === 10000) {
            if (res.data.data.code === 0) {
              let openId = JSON.stringify(res.data.data['openid-Token'])
              localStorage.setItem('openid-Token', openId)
              this.$router.push({
                path: '/login'
              })
            } else {
              let access = JSON.stringify(res.data.data['Access-Token'])
              localStorage.setItem('Access-Token', access)
              this.$router.push({
                path: '/personal_center'
              })
            }
          }
        })
      }
    }
  },
  components: {
    commonHeader
  },
  computed: {
    ...mapGetters(['number']),
    ...mapState({
      number: state => state.home.number
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
/deep/.van-list__finished-text{
  margin-bottom: 2.1875rem;
}
.socialEvaluation {
  padding: .125rem .3125rem !important;
  display: block !important;
  p {
    margin: 0;
    font-size: 1rem;
    color: #333;
    font-weight: bold;
    margin-bottom: .625rem;
  }
  .fatherBox {
    display: flex;
    margin-bottom: .625rem;
      .children {
        flex: 1;
        height: 5rem;
        margin: 0 .125rem;
        background:linear-gradient(270deg,rgba(28,108,252,1) 0%,rgba(133,186,255,1) 100%);
        border-radius: .5rem;
        padding: .625rem .625rem;
        color: #fff;
        font-size: .875rem;
        font-weight: bold;
        line-height: 5rem;
        text-align: center;
      }
  }
}
.content-item{
  display: flex;
  padding: .9375rem;
  border-bottom: 1px solid #ccc;
  .item-img {
    width: 6.25rem;
    height: 4.0625rem;
    margin-right: .9375rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .item-right{
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{
      margin: 0;
      font-size: .875rem;
      font-weight: bold;
    }
    .item-time {
      display: flex;
      justify-content: space-between;
      font-size: .75rem;
      color: #CCCCCC;
      margin-top: .3125rem;
    }
  }
}
/deep/.van-tabs__wrap{
  border-bottom: .0625rem solid #ccc;
}
/deep/.van-tabs__line{
  width: 5.75rem !important;
  height: .125rem;
  background-color: #0A72E6;
}
/deep/.van-tab--active{
  color: #333333;
  font-weight: bold;
}
// /deep/.van-tab__pane{
//   height: 1000px;
// }
/deep/.van-sticky{
  position: fixed;
    top: 4rem;
    right: 0;
    left: 0;
    z-index: 99;
}
/deep/.van-tab{
  line-height: 2.8125rem;
}
/deep/.van-tabs{
  margin-top: 2.8125rem;
}
/deep/.van-tab__text{
  font-size: .875rem;
}
/deep/.van-tabs__wrap{
  height: 2.8125rem;
}
</style>
