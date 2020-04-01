<template>
  <div class="content-box">
    <!-- 社会评价 -->
    <div v-if="type === 3 || type === '3'">
      <div class="content" v-for="(item, index) in socialList" :key="index">
          <div class="feed">
              <p class="left">
                  <span class="department">{{item.orgName}}</span>
                  <span class="name">{{item.instruOrgName}}</span>
                  <span class="number">{{item.mobPhone}}</span>
                  <span class="time">{{item.createTime | dateYMD}}</span>
              </p>
              <p class="right">
                  <span class="back" @click="socialBack(item.instruOrgName, item.id)">回复</span>
              </p>
          </div>
          <div class="feedContent">
              {{item.content}}
          </div>
          <div class="backContent" v-for="(items, index) in item.childList" :key="index" @click="socialBack(items.instruOrgName, items.id)">
              {{items.instruOrgName}}：{{items.content}}
              <p v-for="(itemsChildren, index) in items.childList" :key="index">{{items.instruOrgName}} 回复 {{item.instruOrgName}}：{{itemsChildren.content}}</p>
          </div>
      </div>
      <div class="bottom">
          <van-cell-group>
              <van-field v-model="socialParams.content" :placeholder="placeholder"/>
          </van-cell-group>
          <span class="submit" @click="socialSubmit">提交</span>
      </div>
    </div>
    <!-- 绩效改进 -->
    <div v-if="type === 2 || type === '2'">
      <div class="content" v-for="(item, index) in improveParamsList" :key="index">
          <div class="feed">
              <p class="left">
                  <span class="department">{{item.orgName}}</span>
                  <span class="name">{{item.instruOrgName}}</span>
                  <span class="number">{{item.mobPhone}}</span>
                  <span class="time">{{item.createTime | dateYMD}}</span>
              </p>
              <p class="right">
                  <span class="back" @click="improveBack(item.instruOrgName, item.id)">回复</span>
              </p>
          </div>
          <div class="feedContent">
              {{item.content}}
          </div>
          <div class="backContent" v-for="(items, index) in item.childList" :key="index" @click="improveBack(items.instruOrgName, items.id)">
              {{items.instruOrgName}}：{{items.content}}
              <p v-for="(itemsChildren, index) in items.childList" :key="index">{{items.instruOrgName}} 回复 {{item.instruOrgName}}：{{itemsChildren.content}}</p>
          </div>
      </div>
      <div class="bottom">
          <van-cell-group>
              <van-field v-model="improveParams.content" :placeholder="placeholder" />
          </van-cell-group>
          <span class="submit" @click="wechatInformProveSubSurvey">提交</span>
      </div>
    </div>
    <!-- 绩效考核 -->
    <div v-if="type === 1 || type === '1'">
      <div class="content" v-for="(item, index) in assessmentList" :key="index">
          <div class="feed">
              <p class="left">
                  <span class="department">{{item.instruOrgName}}</span>
                  <span class="time">{{item.createTime | dateYMD}}</span>
              </p>
              <p class="right">
                  <span class="back" @click="assessmentBack(item.instruOrgName, item.id)">回复</span>
              </p>
          </div>
          <div class="feedContent">
              {{item.content}}
          </div>
          <div class="backContent" v-for="(items, index) in item.children" :key="index">
              {{items.instruOrgName}}：{{items.content}}
          </div>
      </div>
      <div class="bottom">
          <van-cell-group>
              <van-field v-model="feedParams.content" :placeholder="placeholder" />
          </van-cell-group>
          <span class="submit" @click="submit">提交</span>
      </div>
    </div>
    <!-- 绩效反馈 -->
    <div v-if="type === 0 || type === '0'">
      <div class="content" v-for="(item, index) in indicatorManagementList" :key="index">
          <div class="feed">
              <p class="left">
                  <span class="department">{{item.instruOrgName}}</span>
                  <span class="time">{{item.createTime | dateYMD}}</span>
              </p>
              <p class="right">
                  <span class="back" @click="indicatorManagementback(item.instruOrgName, item.id)">回复</span>
              </p>
          </div>
          <div class="feedContent">
              {{item.content}}
          </div>
          <div class="backContent" v-for="(items, index) in item.children" :key="index">
              {{items.instruOrgName}}：{{items.content}}
          </div>
      </div>
      <div class="bottom">
          <van-cell-group>
              <van-field v-model="indicatorManagementParams.content" :placeholder="placeholder" />
          </van-cell-group>
          <span class="submit" @click="indicatorManagement">提交</span>
      </div>
    </div>
  </div>
</template>

<script>
import * as myAnnouncement from 'api/announcement'
export default {
  data () {
    return {
      show: false,
      // 拿到上个页面的类型
      type: '',
      data: {},
      //  绩效考核参数
      feedParams: {
        content: '',
        indexId: '',
        replyId: '',
        replyType: 1
      },
      surveyId: '',
      // 绩效改进的评论
      improveParams: {
        answerType: 1,
        content: '',
        replyId: '',
        themeId: ''
      },
      // 社会评价的反馈批示
      socialParams: {
        answerType: 1,
        content: '',
        replyId: '',
        themeId: ''
      },
      // 绩效改进数据
      improveParamsList: [],
      placeholder: '请输入批示/反馈内容',
      // 社会评价
      socialList: [],
      busyId: '',
      // 绩效反馈数据
      indicatorManagementList: [],
      // 绩效反馈参数
      indicatorManagementParams: {
        content: '',
        indexId: '',
        replyId: '',
        replyType: 1
      },
      // 绩效考核数据
      assessmentList: []
    }
  },
  created() {
    this.type = this.$route.query.type
    this.busyId = this.$route.query.busyId
    this.feedParams.indexId = this.$route.query.busyId
    this.indicatorManagementParams.indexId = this.$route.query.busyId
    this.surveyId = this.$route.query.surveyId
    this.improveParams.themeId = this.$route.query.surveyId
    this.socialParams.themeId = this.$route.query.surveyId
    if (this.type === '1' || this.type === 1) {
      this.performanceAppraisal()
    } else if (this.type === '2' || this.type === 2) {
      this.getFeedBack()
    } else if (this.type === '3' || this.type === 3) {
      this.socialEvaluation()
    } else if (this.type === '0' || this.type === 0) {
      this.queryIndexByINdexId()
    }
  },
  methods: {
    // 绩效考核批示
    submit() {
      myAnnouncement.batchInstruction(this.feedParams).then((res) => {
        if (res.data.code === 10000) {
          this.$toast.success('批示成功/回复成功')
          this.feedParams.content = ''
          this.placeholder = '请输入批示/反馈内容'
          this.feedParams.replyType = 1
          this.performanceAppraisal()
        }
      })
    },
    // 绩效考核回复
    assessmentBack(instruOrgName, id) {
      this.placeholder = `回复${instruOrgName}`
      this.feedParams.replyId = id
      this.feedParams.replyType = 2
    },
    // 绩效考核列表
    performanceAppraisal() {
      myAnnouncement.queryBatchByBatchId(this.busyId).then((res) => {
        if (res.data.code === 10000) {
          this.assessmentList = res.data.data.indexBatchInstructionListVOList
        }
      })
    },

    // 绩效反馈列表
    queryIndexByINdexId() {
      myAnnouncement.queryIndexByINdexId(this.busyId).then((res) => {
        if (res.data.code === 10000) {
          this.assessmentList = res.data.data.indexBatchInstructionListVOList
        }
      })
    },
    // 绩效反馈的批示
    indicatorManagement() {
      myAnnouncement.indexInstruction(this.indicatorManagementParams).then((res) => {
        if (res.data.code === 10000) {
          this.$toast.success('批示成功/回复成功')
          this.indicatorManagementParams.content = ''
          this.placeholder = '请输入批示/反馈内容'
          this.indicatorManagementParams.replyType = 1
          this.queryIndexByINdexId()
        }
      })
    },
    // 绩效反馈回复
    indicatorManagementback(instruOrgName, id) {
      this.placeholder = `回复${instruOrgName}`
      this.indicatorManagementParams.replyId = id
      this.indicatorManagementParams.replyType = 2
    },
    // 获取绩效改进反馈列表
    getFeedBack() {
      myAnnouncement.wechatInformProveGetInstrucTree(this.surveyId).then((res) => {
        if (res.data.code === 10000) {
          this.improveParamsList = res.data.data
        }
      })
    },
    // 绩效改进批示
    wechatInformProveSubSurvey() {
      myAnnouncement.wechatInformProveSubSurvey(this.improveParams).then((res) => {
        if (res.data.code === 10000) {
          this.$toast.success('批示成功/回复成功')
          this.improveParams.content = ''
          this.placeholder = '请输入批示/反馈内容'
          this.improveParams.answerType = 1
        }
        this.getFeedBack()
      })
    },
    // 绩效改进回复
    improveBack(instruOrgName, id) {
      this.placeholder = `回复${instruOrgName}`
      this.improveParams.replyId = id
      this.improveParams.answerType = 2
    },
    //  社会评价反馈列表
    socialEvaluation() {
      myAnnouncement.wechatSocieGetInstrucTree(this.surveyId).then((res) => {
        if (res.data.code === 10000) {
          this.socialList = res.data.data
        }
      })
    },
    // 社会评价批示
    socialSubmit() {
      myAnnouncement.wechatSocieSubSurvey(this.socialParams).then((res) => {
        if (res.data.code === 10000) {
          this.$toast.success('批示成功/回复成功')
          this.socialParams.content = ''
          this.placeholder = '请输入批示/反馈内容'
          this.socialParams.answerType = 1
        }
        this.socialEvaluation()
      })
    },
    // 社会评价回复
    socialBack(instruOrgName, id) {
      this.placeholder = `回复${instruOrgName}`
      this.socialParams.replyId = id
      this.socialParams.answerType = 2
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
.content-box {
  margin-bottom: 3.125rem;
}
.content{
    padding: 0 .9375rem;
    margin-bottom: .75rem;
    .feed{
        display: flex;
        justify-content: space-between;
        p{
            font-size: .75rem;
            color: #989898;
            .back{
                color: #0A72E6;
            }
        }
    }
    .feedContent{
        font-size: .875rem;
        color: #333;
        padding-bottom: 12px;
    }
    .backContent{
        padding: .75rem;
        background-color: #F3F3F3;
        border-radius: .625rem;
        font-size: .875rem;
        color: #333;
        margin-bottom: .5rem;
        p {
          margin-bottom: 0;
          font-size: .75rem;
          margin-top: .1875rem;
          padding-left: .625rem;
        }
    }
}
.bottom{
    width: 100%;
    border-top: .0625rem solid #f6f6f6;
    height: 2.8125rem;
    position: fixed;
    bottom: 0;
    background-color: #fff;
}
.bottom{
    display: flex;
    align-items: center;
    .van-cell-group{
        flex: 1;
        border: 0;
        padding-left: .9375rem;
    }
    .submit{
        margin-left: .3125rem;
        margin-right: 1.25rem;
        color: #0A72E6;
        font-size: .875rem;
    }
}
/deep/.van-cell{
    border-radius: .8125rem;
    background-color: #F3F3F3;
    padding: .1875rem;
    padding-left: .625rem;
}
/deep/.van-hairline--top-bottom::after, /deep/.van-hairline-unset--top-bottom::after {
    border-width: 0;
}
</style>
