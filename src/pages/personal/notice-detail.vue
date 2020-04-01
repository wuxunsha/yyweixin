<template>
  <div class="content-box">
        <div class="box">
            <div class="theme">
                <p class="title">{{dataList.title}}</p>
                <p class="text" v-html="dataList.content"></p>
                <p class="time">
                    日期：{{dataList.createTime | dateYMD}}
                </p>
            </div>
            <div class="line">
            </div>
        </div>
        <div class="box">
            <div class="theme">
                <p class="title">附件</p>
                <div v-if="dataList.attamentIds !== 'null'">
                    <van-uploader v-model="fileList" multiple :max-count="1" />
                </div>
                <div class="null" v-else>
                    暂无可查看附件
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
      fileList: [
        { url: '' }
      ],
      //  详情信息id
      annParams: {
        id: ''
      },
      //  数据集合
      dataList: []
    }
  },
  created() {
    this.annParams.id = this.$route.query.id
    this.getAnnouncementDetail()
  },
  methods: {
    // 根据id查询详情
    getAnnouncementDetail() {
      myAnnouncement.getAnnouncementDetail(this.annParams).then((res) => {
        console.log(res.data.data, res.data.code)
        if (res.data.code === 10000) {
          this.dataList = res.data.data
          this.fileList[0].url = res.data.data.attamentIds
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
.null {
  font-size: .875rem;
  color: #989898;
}
.box {
    width: 100%;
    .theme {
        padding: 0 .75rem;
        p {
            margin: 0;
        }
        .title {
            font-size: .875rem;
            color: #333;
            font-weight: bold;
            padding: .5rem 0;
        }
        .text {
            font-size: .75rem;
            color: #333;
            text-indent:1.25rem;
            letter-spacing: .125rem;
            line-height: 1.25rem;
            padding-bottom: .75rem;
            /deep/p {
                margin: 0px !important;
            }
        }
        .time {
            font-size: .75rem;
            color: #333;
            display: flex;
            justify-content: flex-end;
            padding: 0 0 .9375rem 0;
        }
    }
    .line {
        width: 100%;
        height: .75rem;
        background-color: #f3f3f3;
    }
}
/deep/.van-icon-clear::before {
  content: '';
}
</style>
