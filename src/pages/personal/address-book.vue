<template>
  <div class="content-box">
    <!-- tab栏 -->
    <van-tabs v-model="tabIndex" sticky swipeable @click="tabClick">
    <van-tab v-for="(item,index) in tab" :title="item" :key="index">
      <!-- 所在机构 -->
      <div class="mine" v-show="tabStatus">
        <div class="header">
          <van-search placeholder="搜索" v-model="searchValue" @input="searchHanderle" />
          <p>当前机构: 益阳市.{{myPosition}}</p>
        </div>
        <div class="content" v-for="(item,index) in myAllData" :key="index">
          <p>{{item.initialLetter}}</p>
          <ul>
            <li v-for="items in item.userinfoEntities" :key="items.id">
              {{items.nickName}}
              <span>{{items.mobPhone}}</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 其他机构 -->
      <div class="other" v-show="!tabStatus">
        <ul>
          <li @click="economicPark(item.userType,item.orgId,item.orgType)" v-for="item in otherAllData" :key="item.orgId">{{item.orgName}}</li>
        </ul>
      </div>
    </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import * as addressBookApi from 'api/address-book.js'
export default {
  data () {
    return {
      tabIndex: 0,
      //  tab栏标题
      tab: {
        title1: '所在机构',
        title2: '其他机构'
      },
      // 控制tab栏切换状态
      tabStatus: true,
      // 当前所在单位
      myPosition: '',
      // 当前所在单位的所有数据
      myAllData: [],
      // 其他机构所在单位的有数据
      otherAllData: [],
      addressBoosParams: {
        condStr: ''
      },
      // 搜索框的值
      searchValue: ''
    }
  },
  created() {
    this.getMyaddressBook()
  },
  methods: {
    // 获取所在机构的通讯录
    getMyaddressBook () {
      addressBookApi.getUserListByUserOrgId(this.addressBoosParams).then((res) => {
        if (res.data.code === 10000) {
          this.myAllData = res.data.data.data
          this.myPosition = res.data.data.orgName
        }
      })
    },
    // 获取其他构的通讯录
    getOtheraddressBook () {
      addressBookApi.getOrgTypeListForRest().then((res) => {
        if (res.data.code === 10000) {
          this.otherAllData = res.data.data
        }
      })
    },
    // tab栏点击触发
    tabClick (name, title) {
      if (name === 0) {
        this.tabStatus = true
      } else {
        this.getOtheraddressBook()
        this.tabStatus = false
      }
    },
    // 点击去市委
    goMunicipalUnit () {
      this.$router.push('/municipal_unit')
    },
    // 点击去往区县
    goDistrict () {
      this.$router.push('/district')
    },
    // 点击去往职能机构
    goCityFunction () {
      this.$router.push('/city_function')
    },
    //  点击去往经济园区
    economicPark (userType, orgid, orgType) {
      if (userType === 1) {
        this.$router.push({
          path: '/municipal_unit',
          query: {
            orgid: orgid
          }
        })
      } else {
        this.$router.push({
          path: '/economic_park',
          query: {
            orgid: orgid,
            orgType: orgType
          }
        })
      }
    },
    // 触发搜索
    searchHanderle() {
      this.addressBoosParams.condStr = this.searchValue
      addressBookApi.getUserListByUserOrgId(this.addressBoosParams).then((res) => {
        if (res.data.code === 10000) {
          this.myAllData = res.data.data.data
          this.myPosition = res.data.data.orgName
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
@import url('../../styles/personal.less');
/deep/.van-tabs__line{
  width: 5.75rem !important;
  height: .125rem;
  background-color: #0A72E6;
}
/deep/.van-tab--active{
  color: #333333;
  font-weight: bold;
}
/deep/.van-tab{
  line-height: 2.8125rem;
}
/deep/.van-tab__text{
  font-size: .875rem;
}
/deep/.van-tabs__wrap{
  height: 2.8125rem;
}
/deep/.van-search{
  margin-top: .625rem;
  padding: 0;
}
/deep/.van-search__content{
  border-radius: .5rem;
}
/deep/.van-cell{
  background-color: #f6f6f6;
  border-radius:  .5rem;
}
/deep/.van-field__control{
  text-align: center;
}
.header{
  border-top: .0625rem solid #f6f6f6;
  background-color: #fff;
  p{
    height: 2.5rem;
    font-size: 1rem;
    color: #333;
    font-weight: bold;
    background-color: #fff;
    line-height: 2.5rem;
    margin: 0;
    margin-left: .9375rem;
  }
}
.content{
  p{
    margin: 0;
    padding-left: .9375rem;
    font-size: .875rem;
    color: #989898;
  }
  ul{
    li{
      height: 2.8125rem;
      padding-left: .9375rem;
      line-height: 2.8125rem;
      font-size: .875rem;
      color: #333;
      font-weight: bold;
      border-bottom: .0625rem solid #f6f6f6;
      background-color: #fff;
      span{
        margin-left: 1.25rem;
        color: #989898;
        font-weight: 400;
      }
    }
  }
}
.other{
  ul{
    li{
      height: 2.8125rem;
      border-top: 1px solid #f6f6f6;
      line-height: 2.8125rem;
      color: #333;
      font-size: .875rem;
      padding-left: .9375rem;
      font-weight: bold;
      background-color: #fff;
    }
  }
}
</style>
