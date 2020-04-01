<template>
  <div class="content-box">
    <div class="top">
    </div>
    <div>
        <ul>
            <li>
                <span class="left">姓名</span>
                <span>{{userInfolist.nickName}}</span>
            </li>
            <li>
                <span class="left">性别</span>
                <span>{{userInfolist.sex == 0 ? '男': '女'}}</span>
            </li>
        </ul>
    </div>
    <div class="myProfile">
        <ul>
            <li>
                <span class="left">职位</span>
                <span>{{userInfolist.position}}</span>
            </li>
            <li>
                <span class="left">所在部门</span>
                <span>{{userInfolist.orgName}}</span>
            </li>
        </ul>
    </div>
    <div class="myProfile">
        <ul>
            <li>
                <span class="left">当前绑定微信</span>
                <span>{{userInfolist.wechatNickName}}</span>
            </li>
        </ul>
    </div>
  </div>
</template>

<script>
import * as homeApi from 'api/home-api'
export default {
  data () {
    return {
      userInfolist: []
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    getUserInfo () {
      homeApi.getUserInfo().then((res) => {
        if (res.data.code === 10000) {
          this.userInfolist = res.data.data
          console.log(this.userInfolist)
        }
      })
    }
  },
  components: {
  },
  computed: {
  }
}
</script>

<style scoped lang="less">
.content-box{
    width: 100%;
    min-height: calc(100vh + 0px);
    background-color: #F6F6F6;
}
.myProfile{
    margin-top: .625rem;
}
.top{
    width: 100%;
    height: .625rem;
    background-color: #F6F6F6;
}
li{
    width: 100%;
    height: 2.8125rem;
    background-color: #fff;
    border-bottom: 1px solid #F3F3F3;
    display: flex;
    justify-content: space-between;
    line-height: 2.8125rem;
    .left{
        color: #333333;
        font-weight: 600;
    }
    span{
        color: #989898;
        margin: 0 .9375rem;
        font-size: .875rem;
    }
}
</style>
