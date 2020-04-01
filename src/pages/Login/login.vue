<template>
  <div class="content-box">
    <div class="login">
        <div class="title">
            绑定绩效考核账户
        </div>
        <div class="accountPassword">
            <span>账户:</span>
            <input type="text" placeholder="请输入绩效考核账户" v-model="userParams.userName">
        </div>
        <div class="accountPassword">
            <span>密码:</span>
            <input type="password" placeholder="请输入密码"  v-model="jmpassword">
        </div>
        <div class="confirm">
            <van-button type="info" @click="bind">确认绑定</van-button>
        </div>
    </div>
  </div>
</template>

<script>
import * as homeApi from 'api/home-api'
export default {
  data () {
    return {
      jmpassword: '',
      userParams: {
        userName: '',
        password: ''
      }
    }
  },
  created() {},
  methods: {
    bind() {
      const MD5 = require('crypto-js/md5')
      this.userParams.password = MD5(this.jmpassword).toString()
      homeApi.loginUser(this.userParams).then((res) => {
        if (res.data.code === 10000) {
          let access = JSON.stringify(res.data.data['Access-Token'])
          localStorage.setItem('Access-Token', access)
          this.$toast('绑定成功')
          this.$router.push({
            path: '/personal_center'
          })
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
.login{
    padding: .9375rem;
    .title{
        height: 2.8125rem;
        font-size: 1.125rem;
        font-weight: bold;
        text-align: center;
        line-height: 2.8125rem;
        margin-bottom: .9375rem;
    }
    .accountPassword{
        display: flex;
        height: 2.8125rem;
        justify-content: center;
        align-items: center;
        margin-bottom: .9375rem;
        span{
            margin: 0 .75rem;
            font-size: .875rem;
            font-weight: bold;
        }
        input{
            flex: 1;
            border: .0625rem solid #E4E4E4;
            font-size: .875rem;
            padding: .5rem .625rem;;
            border-radius: .9375rem;
            background-color: #E4E4E4;
        }
    }
    .confirm{
        display: flex;
        justify-content: center;
        padding: 0 3.75rem;
        margin-top: 1.875rem;
        /deep/.van-button{
            flex: 1;
            border-radius: 1.25rem;
        }
        /deep/.van-button__text{
            font-size: 1.125rem;
        }
    }
}
</style>
