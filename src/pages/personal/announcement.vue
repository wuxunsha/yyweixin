<template>
  <div class="content-box">
    <div class="content">
        <div class="announcement-item" @click="goNoticeDetail(item.id, item.noticeBusyType, item.busyId)" v-for="(item, index) in dataList" :key="index">
           <p class="title" v-if="item.noticeType === 0">机构通知<span> ({{item.title}})</span></p>
           <p class="title" v-if="item.noticeType === 1">流程通知<span> ({{item.title}})</span></p>
           <p class="title" v-if="item.noticeType === 2">超时提醒<span> ({{item.title}})</span></p>
           <p class="title" v-if="item.noticeType === 3">扣分提醒<span> ({{item.title}})</span></p>
           <p class="title" v-if="item.noticeType === 4">审核结果通知<span> ({{item.title}})</span></p>
           <p class="title" v-if="item.noticeType === 5">回复通知<span> ({{item.title}})</span></p>
           <p class="title" v-if="item.noticeType === 6">日志提交通知<span> ({{item.title}})</span></p>
           <p class="announcement-content" v-html="item.content"></p>
           <p class="time">
               <span>{{item.createTime | dateYMDHMS}}</span>
           </p>
        </div>
        <!-- <div class="announcement-item" @click="goAnnouncementMyIndicator">
           <p class="title">流程通知</p>
           <p>(绩效反馈)安化县对2019年年度考核数据存在异议，提出反馈，内容：财政收入数据与实际不符，正确应该是67839万元。</p>
           <p class="time">
               <span>15.23</span>
           </p>
        </div>
        <div class="announcement-item" @click="goSocialEvaluation">
           <p class="title">流程通知</p>
           <p>(社会评价)安化县对2019年年度考核数据存在异议，提出反馈，内容：财政收入数据与实际不符，正确应该是67839万元。</p>
           <p class="time">
               <span>15.23</span>
           </p>
        </div>
        <div class="announcement-item" @click="goSocialEvaluation">
           <p class="title">流程通知</p>
           <p>(绩效改进)安化县对2019年年度考核数据存在异议，提出反馈，内容：财政收入数据与实际不符，正确应该是67839万元。</p>
           <p class="time">
               <span>15.23</span>
           </p>
        </div> -->
    </div>
  </div>
</template>

<script>
import * as myAnnouncement from 'api/announcement'
export default {
  data () {
    return {
      annParams: {
        page: 1,
        size: 40
      },
      dataList: []
    }
  },
  created() {
    this.getAnnouncement()
  },
  methods: {
    //  去绩效反馈
    goAnnouncementMyIndicator() {
      this.$router.push({path: '/announcement_mechanism'})
    },
    //  点击去通知详情页
    goNoticeDetail (id, noticeBusyType, busyId) {
      console.log(1111)
      if (noticeBusyType === 0) {
        this.$router.push({
          path: '/announcement_myIndicator',
          query: {
            id: id,
            busyId: busyId,
            type: 0
          }
        })
      } else if (noticeBusyType === 4) {
        this.$router.push({
          path: '/notice_detail',
          query: {
            id: id,
            type: 4
          }
        })
      } else if (noticeBusyType === 3) {
        this.$router.push({
          path: '/social_evaluation',
          query: {
            id: id,
            busyId: busyId,
            type: 3
          }
        })
      } else if (noticeBusyType === 2) {
        this.$router.push({
          path: '/announcement_mechanism',
          query: {
            id: id,
            busyId: busyId,
            type: 2
          }
        })
      } else if (noticeBusyType === 1) {
        this.$router.push({
          path: '/announcement_myIndicator',
          query: {
            id: id,
            busyId: busyId,
            type: 1
          }
        })
      }
    },
    //  去社会评价
    goSocialEvaluation () {
      this.$router.push({path: '/social_evaluation'})
    },
    // 获取我的所有日志
    getAnnouncement() {
      myAnnouncement.getAnnouncement(this.annParams).then((res) => {
        console.log(res.data.data.dataList, res.data.code)
        this.dataList = res.data.data.dataList
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
    .announcement-item{
      .title  {
        border-bottom: .125rem dotted #f3f3f3;
        font-size: .875rem;
        font-weight: bold;
        padding: 0 0 .5rem 0;
        margin-bottom: .5rem;
        span {
          font-size: .75rem;
          color: #989898;
          font-weight: 100;
        }
      }
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
.announcement-content {
  /deep/p {
    margin: 0 !important;
  }
}
</style>
