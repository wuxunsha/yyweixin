<template>
  <div class="content-box">
    <div class="content">
        <div class="box">
          <!-- @click="goNoticeDetail" -->
          <div class="evaluation-item" v-for="(item, index) in dataList" :key="index" >
            <p class="between"><span>采集单位/人</span><span>{{item.dataCollectionOrgName}}</span></p>
            <p class="between">改进状态
              <span style="color: #DAA22A;" v-if="item.status === 0"> 待审核 </span>
              <span style="color: #DAA22A;" v-if="item.status === 1"> 已提交 </span>
              <span style="color: #DAA22A;" v-if="item.status === 0"> 已发布 </span>
              <span style="color: #DAA22A;" v-if="item.status === 0"> 已验收 </span>
            </p>
            <p class="between" @click="goIndicatorManagement(item.improOrgId, item.perBatchCode)"><span>待改进指标</span><span>{{item.ruleProveNum}} ></span></p>
            <p class="between" @click="goFeedBack(item.id)"><span>反馈批示</span><span>{{item.instructionCount}} ></span></p>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import * as myAnnouncement from 'api/announcement'
export default {
  data () {
    return {
      // 传参
      params: {
        orgId: '',
        orgType: ''
      },
      // 数据
      dataList: []
    }
  },
  created() {
    this.params.orgId = this.$route.query.orgId
    this.params.orgType = this.$route.query.orgType
    this.wechatInformProveOrgInproList()
  },
  methods: {
    // 请求获取采集单位等数据
    wechatInformProveOrgInproList () {
      myAnnouncement.wechatInformProveOrgInproList(this.params).then((res) => {
        console.log(res.data.data.dataList, res.data.code)
        if (res.data.code === 10000) {
          this.dataList = res.data.data.dataList
        }
      })
    },
    goIndicatorManagement(orgId, perBatchCode) {
      this.$router.push({
        path: '/announcement_myIndicator',
        query: {
          orgId: orgId,
          perBatchCode: perBatchCode,
          orgType: this.params.orgType,
          improveType: 2
        }
      })
    },
    //  点击去往评论反馈页
    goFeedBack(surveyId) {
      this.$router.push({
        path: '/feedback',
        query: {
          type: 2,
          surveyId: surveyId
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
.content{
    // padding: 0 .9375rem;
    overflow: hidden;
    min-height: calc(100vh + 0px);
    .box {
      padding: 0 .9375rem;
    }
    .evaluation-item {
      padding: .9375rem .625rem;
      padding-bottom: 0;
      background-color: #fff;
      box-shadow:0px 3px 6px rgba(0,0,0,0.16);
      border-radius:.625rem;
      margin-top: .625rem;
      font-size: .75rem;
      color: #333;
    }
    .title  {
      font-size: .875rem;
      font-weight: bold;
      padding: 0 0 .5rem 0;
    }
    p{
        margin: 0;
        line-height: 1.25rem;
        font-size: .75rem;
        font-weight: bold;
        padding-bottom: .5rem;
        color: rgba(102,102,102,1);
    }
    .between {
        display: flex;
        justify-content: space-between;
    }
}
</style>
