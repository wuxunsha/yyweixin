<template>
  <div class="content-box">
    <!-- tab栏 -->
    <van-tabs v-model="tabIndex" sticky swipeable @click="tabClick">
    <van-tab v-for="item in indicatorTabList" :title="item.orgtypeName" :key="item.busiType">
      <!-- 市值单位1 -->
      <div class="cityUnit" v-show="tab1" >
        <!-- 如果为一则用这种展示 -->
        <div class="fatherOne" v-for="(item, index) in dataList" :key="index">
          <div class="title" v-if="dataStatus === 1">{{item.busiTypeName}}</div>
          <div class="content-area" v-if="dataStatus === 1">
              <div v-for="(items, index) in item.oranizationEntities" :key="index" @click="getIndexHanderle(item.id)">
                <span>{{items.orgName}}</span>
              </div>
          </div>
        </div>
        <!-- 如果为二则用这种展示 -->
        <div class="fatherTwo" v-if="dataStatus === 0 || userType === 2" >
          <div class="content-area" >
            <div v-for="(item, index) in dataList" :key="index" @click="getIndexHanderle(item.id)">
              <span v-if="userType === 1">{{item.orgName}}</span>
              <span v-else>{{item.nickName}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 市直单位2 -->
      <div class="cityUnit" v-show="tab2" >
        <!-- 如果为一则用这种展示 -->
        <div class="fatherOne" v-for="(item, index) in dataList" :key="index">
          <div class="title" v-if="dataStatus === 1">{{item.busiTypeName}}</div>
          <div class="content-area" v-if="dataStatus === 1">
              <div v-for="(items, index) in item.oranizationEntities" :key="index" @click="getIndexHanderle(item.id)">
                <span>{{items.orgName}}</span>
              </div>
          </div>
        </div>
        <!-- 如果为二则用这种展示 -->
        <div class="fatherTwo" v-if="dataStatus === 0 || userType === 2" >
          <div class="content-area" >
            <div v-for="(item, index) in dataList" :key="index" @click="getIndexHanderle(item.id)">
              <span v-if="userType === 1">{{item.orgName}}</span>
              <span v-else>{{item.nickName}}</span>
            </div>
          </div>
        </div>
      </div>
      <!-- 市直单位3 -->
      <div class="cityUnit" v-show="tab3" >
        <!-- 如果为一则用这种展示 -->
        <div class="fatherOne" v-for="(item, index) in dataList" :key="index">
          <div class="title" v-if="dataStatus === 1">{{item.busiTypeName}}</div>
          <div class="content-area" v-if="dataStatus === 1">
              <div v-for="(items, index) in item.oranizationEntities" :key="index" @click="getIndexHanderle(item.id)">
                <span>{{items.orgName}}</span>
              </div>
          </div>
        </div>
        <!-- 如果为二则用这种展示 -->
        <div class="fatherTwo" v-if="dataStatus === 0 || userType === 2" >
          <div class="content-area" >
            <div v-for="(item, index) in dataList" :key="index" @click="getIndexHanderle(item.id)">
              <span v-if="userType === 1">{{item.orgName}}</span>
              <span v-else>{{item.nickName}}</span>
            </div>
          </div>
        </div>
      </div>
    </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import * as homeApi from 'api/home-api'
export default {
  data () {
    return {
      tabIndex: 0,
      //  tab栏标题
      tab: {
        title1: '区县(市)',
        title2: '市直单位',
        title3: '经济园区'
      },
      // 控制tab栏显示的状态码
      tab1: true,
      tab2: false,
      tab3: false,
      // 保存tab的数据
      indicatorTabList: [],
      // 保存指标的数据
      dataList: [],
      datachildrenList: [],
      // 控制标题的显示
      dataStatus: '',
      // 去往指标详情页面需要带的userType
      userType: ''
    }
  },
  created() {
    this.$nextTick(() => {
      this.getMyIndex()
    })
  },
  methods: {
    // tab栏点击触发
    tabClick (name, title) {
      if (name === 0) {
        this.tab1 = true
        this.tab2 = false
        this.tab3 = false
        this.getOrgListByOrgType(0)
      } else if (name === 1) {
        this.tab1 = false
        this.tab2 = true
        this.tab3 = false
        this.getOrgListByOrgType(1)
      } else {
        this.tab1 = false
        this.tab2 = false
        this.tab3 = true
      }
      // homeApi.getOrgListByOrgType(title).then((res) => {
      //   console.log(res)
      // })
    },
    // 获取数据
    getMyIndex() {
      homeApi.getMyIndex().then((res) => {
        if (res.data.code === 10000) {
          this.indicatorTabList = res.data.data.data
        }
        this.getOrgListByOrgType(0)
      })
    },
    //  获取各个指标
    getOrgListByOrgType(type) {
      let orgType = this.indicatorTabList[type].orgType
      homeApi.getOrgListByOrgType(orgType).then((res) => {
        console.log(res)
        if (res.data.code === 10000) {
          this.dataList = res.data.data.data
          console.log(this.dataList)
          this.dataStatus = res.data.data.dataType
          console.log(this.dataStatus)
          this.userType = res.data.data.userType
        }
      })
    },
    //  点击每个指标
    getIndexHanderle(id) {
      console.log(id)
      this.$router.push({
        path: '/my_indicator',
        query: {
          orgId: id,
          uerType: this.userType
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
@import url('../../styles/personal.less');
.title{
  padding:.625rem 0 0 .9375rem;
  font-size: 1rem;
  font-weight: bold;
  color: #333;
}
/deep/.van-tab--active{
  color: #333333;
  font-weight: bold;
}
/deep/.van-tabs__line{
  width: 5.75rem !important;
  height: .125rem;
  background-color: #0A72E6;
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
.content-area{
  padding: .625rem 0 0 .9375rem;
  display: flex;
  flex-wrap: wrap;
  div{
    min-width: 5.9375rem;
    max-width: 5.9375rem;
    min-height: 2.8125rem;
    margin-right: .75rem;
    margin-bottom: .625rem;
    text-align: center;
    background-color: #fff;
    // margin: 0 .625rem .625rem 0;
    border-radius: .5rem;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    font-size: .875rem;
    color: #333;
    padding: 0 .3125rem;
    display: flex;
    justify-content: center;
    align-items: center;
    span{
      display: inline-block;
      line-height: 1.25rem;
    }
  }
}
</style>
