<template>
  <div class="content-box">
    <div class="content">
        <van-tabs v-model="tabIndex" sticky swipeable @click="tabClick">
          <van-tab v-for="(item, index) in tab" :title="item" :key="index">
            <div class="box" v-for="(item, index) in socialList" :key="index">
              <!-- @click="goNoticeDetail" -->
              <div class="evaluation-item" >
                <p class="title">{{item.orgName}}</p>
                <p class="selected">所在流程: <span style="color: #DAA22A;">{{item.remark}}</span></p>
                <p class="between" @click="goQuestionnaire(item.surveyId)"><span>问卷题数</span><span>{{item.quesNum}} ></span></p>
                <p class="between" @click="goFeedBack(item.surveyId)"><span>反馈批示</span><span>{{item.feedback}} ></span></p>
              </div>
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
      // tab栏标题
      tab: {
        title1: ''
      },
      data: {},
      //  页签数据
      dataList: [],
      dataParams: {
        pageIndex: 1,
        pageSize: 50,
        orgType: '',
        parentId: ''
      },
      // 分页查询出来机构的数据
      socialList: []
    }
  },
  created() {
    this.$nextTick(() => {
      this.getByTab()
    })
  },
  methods: {
    getByTab () {
      myAnnouncement.wechatSocieGetOrgType(this.data).then((res) => {
        console.log(res.data.data, res.data.code)
        if (res.data.code === 10000) {
          this.dataList = res.data.data
          res.data.data.forEach((item, index) => {
            this.tab[`title${index + 1}`] = item.orgtypeName
          })
          this.wechatSocieGetList(this.dataList[0].orgType, this.dataList[0].parentId)
        }
      })
    },
    // tab栏切换时候触发
    tabClick (name, title) {
      if (name === 0) {
        this.wechatSocieGetList(this.dataList[0].orgType, this.dataList[0].parentId)
      } else if (name === 1) {
        this.wechatSocieGetList(this.dataList[1].orgType, this.dataList[1].parentId)
      } else if (name === 2) {
        this.wechatSocieGetList(this.dataList[2].orgType, this.dataList[2].parentId)
      }
    },
    //  去反馈页面
    goFeedBack(surveyId) {
      this.$router.push({
        path: '/feedback',
        query: {
          surveyId: surveyId,
          type: 3
        }
      })
    },
    // 去往问卷调查
    goQuestionnaire(surveyId) {
      this.$router.push({
        path: '/questionnaire',
        query: {
          surveyId: surveyId
        }
      })
    },
    //  根据tab去获取对应机构
    wechatSocieGetList (orgType, parentId) {
      this.dataParams.orgType = orgType
      this.dataParams.parentId = parentId
      myAnnouncement.wechatSocieGetList(this.dataParams).then((res) => {
        if (res.data.code === 10000) {
          this.socialList = res.data.data.dataList
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
