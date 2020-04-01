<template>
  <div class="content-box">
    <div class="content">
      <!-- tab栏 -->
      <van-tabs v-model="tabIndex" sticky swipeable @click="tabClick">
        <van-tab v-for="(item,index) in tab" :title="item" :key="index">
            <div class="tabOne">
                <ul>
                    <li @click="goAnnouncementMyIndicator(item.orgId, orgtype)" v-for="(item, index) in orgList" :key="index">{{item.orgName}}</li>
                </ul>
            </div>
            <div class="null" v-if="orgList.length === 0">
              当前没有正在绩效改进的机构
            </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import * as myAnnouncement from 'api/announcement'
export default {
  data () {
    return {
      // tab默认选项
      tabIndex: 0,
      tabStatus: 0,
      // tab栏标题
      tab: {
        title1: ''
      },
      //  页签数据
      dataList: [],
      orgType: {
        orgType: ''
      },
      // 参数
      getListParams: {
        orgId: '',
        orgType: ''
      },
      // 机构的集合
      orgList: [],
      orgtype: ''
    }
  },
  created() {
    this.getPageTags()
  },
  methods: {
    // tab栏切换时候触发
    tabClick (name, title) {
      if (name === 0) {
        this.getListParams.orgId = this.dataList[0].parentId
        this.getListParams.orgType = this.dataList[0].orgType
        this.wechatInformProveOrgList(this.getListParams)
      } else if (name === 1) {
        this.getListParams.orgId = this.dataList[1].parentId
        this.getListParams.orgType = this.dataList[1].orgType
        this.wechatInformProveOrgList(this.getListParams)
      } else if (name === 2) {
        this.getListParams.orgId = this.dataList[3].parentId
        this.getListParams.orgType = this.dataList[3].orgType
        this.wechatInformProveOrgList(this.getListParams)
      }
    },
    //  点击去往指标详情页面
    goAnnouncementMyIndicator(orgId, orgType) {
      this.$router.push({
        path: '/improve_detail',
        query: {
          orgId: orgId,
          orgType: orgType
        }
      })
    },
    // 获取机构
    getPageTags() {
      myAnnouncement.wechatSocieGetOrgType({}).then((res) => {
        if (res.data.code === 10000) {
          this.dataList = res.data.data
          res.data.data.forEach((item, index) => {
            this.tab[`title${index + 1}`] = item.orgtypeName
          })
          this.getListParams.orgId = this.dataList[0].parentId
          this.getListParams.orgType = this.dataList[0].orgType
          this.wechatInformProveOrgList(this.getListParams)
        }
      })
    },
    // 根据页签得到要改进的列表
    wechatInformProveOrgList(getListParams) {
      myAnnouncement.wechatInformProveOrgList(getListParams).then((res) => {
        if (res.data.code === 10000) {
          this.orgList = res.data.data.data
          this.orgtype = res.data.data.orgType
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
.null {
  font-size: 1rem;
  color: #989898;
  text-align: center;
  margin-top: .625rem;
}
.content{
    overflow: hidden;
    min-height: calc(100vh + 0px);
    .pending-item{
        padding: .9375rem .625rem;
        background-color: #fff;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:.625rem;
        margin-top: .625rem;
        font-size: .75rem;
        color: #333;
        p{
            margin: 0;
            line-height: 1.25rem;
        }
        .time{
            display: flex;
            justify-content: flex-end;
            span{
                margin-right: .3125rem;
                color: #CCCCCC;
                font-size: .75rem;
            }
        }
    }
}
.tabOne {
  ul {
      li{
          width: 100%;
          height: 2.8125rem;
          background-color: #fff;
          padding-left: 1.5625rem;
          line-height: 2.8125rem;
          border-bottom: .0625rem solid #f6f6f6;
      }
  }
}
</style>
