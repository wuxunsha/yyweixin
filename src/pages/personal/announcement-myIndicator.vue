<template>
  <div class="content-box">
    <div class="top" v-if="dataList.length !== 0 || improveList.length !== 0">
        <span>
                    登录电脑操作后台才可录入指标内容
        </span>
    </div>
    <!-- 绩效改进 -->
    <div v-if="improveType === 2 || improveType === '2'">
      <div class="indicato-item-card" v-for="(item, index) in improveList" :key="index">
          <p class="firstLevel">
              <span>一级指标：{{item.indexOneName}}</span>
          </p>
          <p class="secondary">
              <span v-if="item.indexTwoName !== null">
                  二级指标：{{item.indexTwoName}}
              </span>
              <span v-else>
                  二级指标：暂无
              </span>
          </p>
          <p class="thirdGrade">
              <span v-if="item.indexThreeName !== null">三级指标：{{item.indexThreeName}}</span>
              <span v-if="item.indexThreeName === null">三级指标：暂无</span>
          </p>
          <p class="assessmentPoints">
              <span class="frist">考核要点: {{item.perDesc}}</span>
              <span>分值：{{item.score}}分</span>
          </p>
          <p class="firstLevel">
              <span>机构名称：  {{item.assessmentOrgName}}</span>
          </p>
          <p class="taskContent">
              <span v-if="item.busiValueStr !== null">
                  任务内容：{{item.busiValueStr}}
              </span>
              <span v-else>
                  任务内容：当前没有任务内容
              </span>
          </p>
          <p class="completion">
              <span>实际完成情况：{{item.busiDesc}}</span>
              <span>实际得分：{{item.resultScore}}</span>
          </p>
      </div>
    </div>
    <!-- 非绩效改进 -->
    <div v-else>
      <div class="indicato-item-card" v-for="(item, index) in dataList" :key="index">
          <p class="firstLevel">
              <span>一级指标：{{item.indexOneName}}</span>
          </p>
          <p class="secondary">
              <span>
                  二级指标：{{item.indexTwoName}}
              </span>
          </p>
          <p class="thirdGrade">
              <span v-if="item.indexThreeName !== null">三级指标：{{item.indexThreeName}}</span>
              <span v-if="item.indexThreeName === null">三级指标：暂无</span>
          </p>
          <p class="assessmentPoints">
              <span class="frist">考核要点: {{item.perDesc}}</span>
              <span>分值：{{item.score}}分</span>
          </p>
          <p class="firstLevel">
              <span>机构名称：  {{item.assessmentOrgName}}</span>
          </p>
          <p class="taskContent">
              <span v-if="item.busiValueStr !== null">
                  任务内容：{{item.busiValueStr}}
              </span>
              <span v-else>
                  任务内容：当前没有任务内容
              </span>
          </p>
          <!-- <p class="completion">
              <span>实际完成情况：245672.5</span>
              <span>增速：5.7%</span>
          </p> -->
      </div>
    </div>
    <div class="null" v-if="dataList.length === 0 && improveList.length === 0">
      当前没有指标内容
    </div>
    <div class="bottom" @click="goFeedback" v-if="type == 0 || type == 1">
        查看反馈与批示
    </div>
  </div>
</template>

<script>
import * as myAnnouncement from 'api/announcement'
export default {
  data () {
    return {
      busyId: '',
      dataList: [],
      // 页面类型
      type: '',
      //  批示回复需要的id
      indexId: '',
      // 绩效改进参数
      improveParams: {
        orgId: '',
        orgType: '',
        perBatchCode: '',
        pageIndex: 1,
        pageSize: 30
      },
      // 判断是不是绩效改进
      improveType: '',
      // 绩效改进指标数据
      improveList: []
    }
  },
  created() {
    console.log(this.dataList.length, this.improveList.length)
    // 获取通知公告详情id
    this.busyId = this.$route.query.busyId
    this.type = this.$route.query.type
    if (this.type === 0 || this.type === '0') {
      this.queryIndexByINdexId()
    } else if (this.type === 1 || this.type === '1') {
      this.performanceAppraisal()
    }
    if (this.$route.query.improveType === 2 || this.$route.query.improveType === '2') {
      this.improveType = this.$route.query.improveType
      this.improveParams.orgId = this.$route.query.orgId
      this.improveParams.orgType = this.$route.query.orgType
      this.improveParams.perBatchCode = this.$route.query.perBatchCode
      this.wechatInformProveGetProveListByOrgId()
    }
  },
  methods: {
    // 获取指标
    queryIndexByINdexId() {
      myAnnouncement.queryIndexByINdexId(this.busyId).then((res) => {
        if (res.data.code === 10000) {
          this.dataList = res.data.data.indexTableVoList
        }
      })
    },
    // 获取绩效考核指标
    performanceAppraisal() {
      myAnnouncement.queryBatchByBatchId(this.busyId).then((res) => {
        if (res.data.code === 10000) {
          this.dataList = res.data.data.batchTableVoList
        }
      })
    },
    // 去批示页面
    goFeedback () {
      this.$router.push({
        path: '/feedback',
        query: {
          type: this.type,
          indexId: this.indexId,
          busyId: this.busyId
        }
      })
    },
    // 获取绩效改进的指标详情
    wechatInformProveGetProveListByOrgId () {
      myAnnouncement.wechatInformProveGetProveListByOrgId(this.improveParams).then((res) => {
        if (res.data.code === 10000) {
          this.improveList = res.data.data.data
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
.content-box {
  margin-bottom: 3.4375rem;
}
.indicato-item-card{
    padding: .625rem .625rem 1.25rem .625rem;
    margin: .9375rem;
    margin-top: 0;
    background-color: #fff;
    border-radius: .625rem;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    p {
        margin: .9375rem 0 0 0;
        display: flex;
        justify-content: space-between;
        font-size: .75rem;
        color: #333;
    }
    .assessmentPoints {
      .frist {
        flex: 1;
        padding-right: .625rem;
      }
    }
    .thirdGrade{
        margin-left: 3.5rem;
    }
    .taskContent{
        line-height: 1.25rem;
    }
    .completion{
        border-top: .0625rem solid #F3F3F3;
        padding-top: .625rem;
    }
}
.top{
    width: inherit;
    height: 1.875rem;
    font-size: .75rem;
    color: #F94E4E;
    line-height: 1.875rem;
    span{
      padding-left: 1.125rem;
    }
}
.bottom{
    width: inherit;
    height: 2.8125rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    color: #0A72E6;
    line-height: 2.8125rem;
    font-size: .75rem;
    text-align: center;
    font-weight: bold;
    // display: none;
}
.null {
  font-size: 1rem;
  text-align: center;
  color: #989898;
}
</style>
