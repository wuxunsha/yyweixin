<template>
  <div class="content-box">
    <div class="content">
        <p class="title">{{dataList.title}}</p>
        <p class="scroe">共计{{dataList.score}}分</p>
        <div class="summary" v-for="(item, index) in dataList.surveySubtitleEntityList" :key="index">
            <p class="firstTitle">
                {{item.orderNum | chinese}}、{{item.title}}（50分）
            </p>
            <div class="topic" v-for="(items, index) in item.questtionEntities" :key="index">
                <p>
                    {{index + 1}}、{{items.title}}？（{{items.totalScore}}分）
                </p>
                <p class="option">
                    A. {{items.a1}}
                </p>
                <p class="option">
                    B. {{items.a2}}
                </p>
                <p class="option" v-if="items.a3 !== null">
                    C. {{items.a3}}
                </p>
                <p class="option" v-if="items.a4 !== null">
                    D. {{items.a4}}
                </p>
                <p class="option" v-if="items.a5 !== null">
                    E. {{items.a5}}
                </p>
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
      surveyId: '',
      //  数据
      dataList: []
    }
  },
  created() {
    this.surveyId = this.$route.query.surveyId
    this.wechatSocieGetSurveyInfo()
  },
  methods: {
    // 根据id查看题目
    wechatSocieGetSurveyInfo() {
      myAnnouncement.wechatSocieGetSurveyInfo(this.surveyId).then((res) => {
        console.log(res.data.data, res.data.code)
        if (res.data.code === 10000) {
          this.dataList = res.data.data
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
.content{
    padding: 0 .9375rem;
    overflow: hidden;
    min-height: calc(100vh + 0px);
    p {
      margin: 0;
    }
    .title {
      font-size: 1.125rem;
      text-align: center;
      margin: 1.25rem 0 .625rem 0;
      color: #333;
      font-weight: bold;
    }
    .scroe {
      font-size: .75rem;
      text-align: center;
      color: #666666;
    }
    .summary {
      .firstTitle {
          font-size: .875rem;
          color: #333;
          font-weight: bold;
          margin-bottom: .625rem;
      }
      p {
          font-size: .75rem;
          color: #666666;
          margin-bottom: .625rem;
      }
      .topic {
          margin-bottom: .9375rem;
        .option {
            margin-left: 1.25rem;
        }
      }
    }
}
</style>
