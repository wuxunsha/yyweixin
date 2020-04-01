<template>
  <div class="content-box">
        <div class="box">
            <div class="theme">
                <p class="title">{{title}}</p>
                <p class="organization">
                  <span>{{userOrgName}}</span>
                  <span v-if="status == 1" class="status">状态:待处理</span>
                  <span v-else-if="status == 0" class="status">状态:新建</span>
                  <span v-else-if="status == 2" class="status">状态:审核通过</span>
                  <span v-else-if="status == 3"  class="status">状态:驳回</span>
                </p>
                <p class="text">{{content}}</p>
                <p class="time">
                    日期：{{createTime | dateYMD}}
                </p>
            </div>
            <div class="line">
            </div>
        </div>
        <div class="box">
            <div class="theme">
                <p class="titles">附件</p>
                <div>
                    <van-uploader v-model="fileList" multiple />
                </div>
            </div>
            <div class="button" v-show="buttonFlag">
                <div class="buttons">
                    <div class="button-left" @click="updateInnovateStatusPass">
                        通过
                    </div>
                    <div class="button-right" @click="updateInnovateStatusTurn">
                        驳回
                    </div>
                </div>
            </div>
        </div>
  </div>
</template>

<script>
import * as pendingApi from 'api/pending'
export default {
  data () {
    return {
      fileList: [
        { url: 'https://img.yzcdn.cn/vant/leaf.jpg' }
        // Uploader 根据文件后缀来判断是否为图片文件
        // 如果图片 URL 中不包含类型信息，可以添加 isImage 标记来声明
      ],
      title: '',
      userOrgName: '',
      createTime: '',
      status: '',
      content: '',
      id: '',
      //  控制按钮显示隐藏的
      buttonFlag: true
    }
  },
  created() {
    this.title = this.$route.query.title
    this.userOrgName = this.$route.query.userOrgName
    this.createTime = this.$route.query.createTime - 0
    this.status = this.$route.query.status
    console.log(this.status)
    this.content = this.$route.query.content
    this.id = this.$route.query.id
  },
  methods: {
    //  创新创优审核通过
    updateInnovateStatusPass () {
      pendingApi.updateInnovateStatusPass(this.id).then((res) => {
        if (res.data.code === 10000) {
          this.$toast.success('操作审核成功!')
          this.buttonFlag = false
        }
      })
    },
    //  创新创优审核驳回
    updateInnovateStatusTurn() {
      pendingApi.updateInnovateStatusTurn(this.id).then((res) => {
        if (res.data.code === 10000) {
          this.$toast.success('操作驳回成功!')
          this.buttonFlag = false
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
.box {
    width: 100%;
    .button {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        margin-top: .9375rem;
        .buttons {
            width: 15rem;
            height: 2.5rem;
            display: flex;
            border-radius: 1.25rem;
            overflow: hidden;
            margin-right: .625rem;
            .button-left {
                flex: 1;
                background-color: #2A5699;
                line-height: 2.5rem;
                text-align: center;
                color: #fff;
                font-size: 1rem;
                font-weight: bold;
            }
            .button-right {
                flex: 1;
                background-color: #C5E8FC;
                line-height: 2.5rem;
                text-align: center;
                color: #2A5699;
                font-size: 1rem;
                font-weight: bold;
            }
        }
    }
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
            text-align: center;
        }
        .titles {
            font-size: .875rem;
            color: #333;
            font-weight: bold;
            padding: .5rem 0;
        }
        .organization {
            display: flex;
            justify-content: space-between;
            margin-bottom: .5rem;
          span {
              font-size: .75rem;
              color: #666666
          }
          .status {
            color: #0074E6
          }
        }
        .text {
            font-size: .75rem;
            color: #333;
            text-indent:1.25rem;
            letter-spacing: .125rem;
            line-height: 1.25rem;
            padding-bottom: .75rem;
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
</style>
