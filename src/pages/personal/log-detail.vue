<template>
  <div class="content-box">
    <div class="content">
    <div v-for="item in dataList" :key="item.id">
        <div class="box">
            <div class="theme">
                <p class="title">当天的工作内容</p>
                <p class="text">
                  {{item.todayContent}}
                </p>
            </div>
            <div class="line">
            </div>
        </div>
        <div class="box">
            <div class="theme">
                <p class="title">未完成的工作</p>
                <p class="text">{{item.incompleteContent}}</p>
            </div>
            <div class="line">
            </div>
        </div>
        <div class="box">
            <div class="theme">
                <p class="title">明天的计划</p>
                <p class="text">{{item.tomorrowPlan}}
                </p>
            </div>
            <div class="line">
            </div>
        </div>
        <div class="box">
            <div class="theme">
                <p class="title">需要协调的工作</p>
                <p class="text">{{item.coordinateContent}}</p>
            </div>
            <div class="line">
            </div>
        </div>
    </div>
        <div class="box">
            <div class="theme annex">
                <p class="title">附件
                    <span>(点击在线预览)</span>
                </p>
                <div >
                  <van-uploader
                    :after-read="afterRead"
                    :before-read="beforeRead"
                    v-model="fileList"
                    multiple
                    :max-count="1"
                  />
                </div>
            </div>
            <div class="line">
            </div>
        </div>
        <div class="box bottom-feed">
            <div class="theme">
                <p class="title">批示详情</p>
                <div v-for="(item, index) in commentList" :key="index">
                    <p class="text" @click="replyHanderle(item.createName,item.id, item.themeId)">{{item.createName}}：{{item.content}}</p>
                    <p class="reply" @click="replyHanderle(items.createName,item.id, items.themeId)" v-for="(items, index) in item.list" :key="index">{{items.createName}}<span style="color:#0A72E6;">回复</span>{{item.createName}}：{{items.content}}</p>
                </div>
            </div>
        </div>
        <!-- 底部批示部分 -->
        <div class="bottom">
            <van-cell-group>
                <van-field v-model="replyParams.content" :placeholder="placeholder" />
            </van-cell-group>
            <span class="submit" @click="replySubmitHanderle">提交</span>
        </div>
    </div>
  </div>
</template>

<script>
import * as myLogApi from 'api/my-log'
import upLoaderImg from 'api/uploaderimg'
export default {
  data () {
    return {
      fileList: [
        {url: ''}
      ],
      // 需要查询日志详情的id
      ListParams: {
        id: ''
      },
      // 详情数据
      dataList: [],
      // 评论列表
      commentList: [],
      // 批示/回复
      replyParams: {
        content: '',
        replyType: 1,
        themeId: '',
        replyId: ''
      },
      // 文本提示
      placeholder: '请输入批示/反馈内容'
    }
  },
  created() {
    this.ListParams.id = this.$route.query.id
    this.replyParams.themeId = this.$route.query.id
    this.findLeaderByKey()
  },
  methods: {
    // 获取日志详情信息
    findLeaderByKey() {
      myLogApi.findLeaderByKey(this.ListParams).then((res) => {
        if (this.dataList.length === 0) {
          this.dataList.push(res.data.data)
        } else {
          return
        }
        this.fileList[0].url = res.data.data.attachmentIds
        console.log(res.data.data.instructionInfoVOS)
        this.commentList = res.data.data.instructionInfoVOS
      })
    },
    replySubmitHanderle() {
      myLogApi.reply(this.replyParams).then((res) => {
        if (this.replyParams.content.trim() === '') {
          this.$toast.fail('请输入批示/要回复的内容')
        } else {
          this.$toast.success('批示/回复成功！')
          this.findLeaderByKey()
          this.replyParams.content = ''
          this.replyParams.replyType = 1
          this.placeholder = '请输入批示/反馈内容'
        }
      })
    },
    //  点击回复消息触发
    replyHanderle(name, id) {
      this.placeholder = '回复' + name
      this.replyParams.replyId = id
      this.replyParams.themeId = id
      this.replyParams.replyType = 2
    },
    //  上传之前校验
    beforeRead (file) {
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.$toast.fail('只允许上传jpg/png格式的图片！')
        return false
      }
      return true
    },
    //  文件读取完成后的回调函数
    async afterRead (file) {
      // 使用上传的方法。file.file
      let uploadImg = await upLoaderImg(file.file)
      console.log(uploadImg.data, uploadImg.code)
      if (uploadImg.code === 10000) {
        this.$toast.success('上传成功')
        this.editParams.attachmentIds = uploadImg.data.absolutePath
      }
    }
  },
  components: {
  },
  computed: {
  }
}
</script>

<style scoped lang="less">
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
            color: #989898;
            padding-left:1.25rem;
            letter-spacing: .125rem;
            line-height: 1.25rem;
            padding-bottom: .5rem;
        }
        .reply {
            font-size: .75rem;
            color: #989898;
            padding-left: 2.5rem;
            letter-spacing: .125rem;
            line-height: 1.25rem;
            padding-bottom: .5rem;
        }
    }
    .line {
        width: 100%;
        height: .75rem;
        background-color: #f3f3f3;
    }
    .annex {
        .title {
            span{
                font-size: .75rem;
                color: #989898;
                letter-spacing: .125rem;
            }
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
.bottom-feed {
    margin-bottom: 2.8125rem;
}
/deep/.van-hairline--top-bottom::after, /deep/.van-hairline-unset--top-bottom::after {
    border-width: 0;
}
/deep/.van-icon-clear::before {
  content: '';
}
</style>
