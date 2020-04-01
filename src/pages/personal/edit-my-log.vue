<template>
  <div class="content-box">
    <div class="content">
      <van-cell :title="editParams.createTime | dateYMD" :value="11" @click="show = true" />
      <!-- <van-calendar v-model="show" @confirm="onConfirm" /> -->
      <van-calendar
        v-model="show"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="onConfirm"
      />
      <div class="log-list">
        <ul>
          <li>今日完成工作
            <p><input type="text" v-model="editParams.todayContent"></p>
          </li>
          <li>明日工作计划
            <p><input type="text" v-model="editParams.tomorrowPlan"></p>
          </li>
          <li>未完成工作
            <p><input type="text" v-model="editParams.incompleteContent"></p>
          </li>
          <li>需要协调的工作
            <p><input type="text" v-model="editParams.coordinateContent"></p>
          </li>
          <li class="annex">附件
            <div>
              <van-uploader
                :after-read="afterRead"
                :before-read="beforeRead"
                v-model="fileList"
                multiple
                :max-count="1"
              />
            </div>
          </li>
        </ul>
      </div>
      <div class="line">
      </div>
      <div class="submit">
        <van-button round type="info" @click="submitMyLog">提交</van-button>
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
      show: false,
      minDate: new Date(2020, 1, 25),
      maxDate: new Date('2020', '2', '2'),
      editParams: {
        createTime: '',
        todayContent: '',
        tomorrowPlan: '',
        incompleteContent: '',
        coordinateContent: '',
        attachmentIds: ''
      },
      fileList: [
        // { url: 'https://img.yzcdn.cn/vant/leaf.jpg' },
      ]
    }
  },
  created() {
    this.editParams.createTime = Date.parse(new Date())
    this.getDateTimeHanderle(Date.parse(new Date()))
    this.getTopWeekTimeHanderle(Date.parse(new Date()) - 518400000)
  },
  methods: {
    //  获取当天时间进行处理
    getDateTimeHanderle(time) {
      const dt = new Date(time)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      this.maxDate = new Date(`${y},${m},${d}`)
    },
    //  对一周前的时间进行处理‘
    getTopWeekTimeHanderle(time) {
      const dt = new Date(time)
      const y = dt.getFullYear()
      const m = (dt.getMonth() + 1 + '').padStart(2, '0')
      const d = (dt.getDate() + '').padStart(2, '0')
      this.minDate = new Date(`${y},${m},${d}`)
    },
    //  日期选择器的方法
    formatDate(date) {
      return `${date.getMonth() + 1}/${date.getDate()}`
    },
    onConfirm(date) {
      this.show = false
      this.getTimeStamp(date)
      this.date = this.formatDate(date)
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
    },
    // 编辑个人日志
    submitMyLog() {
      myLogApi.editMyLog(this.editParams).then((res) => {
        if (res.data.code === 10000) {
          this.$toast.success('提交日志成功!')
          this.editParams.createTime = Date.parse(new Date())
          this.editParams.todayContent = ''
          this.editParams.tomorrowPlan = ''
          this.editParams.incompleteContent = ''
          this.editParams.coordinateContent = ''
          this.$router.push({
            path: '/my_log'
          })
        }
      })
    },
    //  标准时间转时间戳
    getTimeStamp(time) {
      let timeStamp = new Date(time).getTime()
      this.editParams.createTime = timeStamp
      return timeStamp
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
.log-list {
  ul {
    padding: 0 1rem;
    li {
      width: 100%;
      height: 2.8125rem;
      font-size: .875rem;
      padding-top: .625rem;
      color: #333;
      border-bottom:.0625rem solid #F6F6F6;
      font-weight: bold;
      p {
        margin: 0;
        input {
          width: 100%;
          border: 0;
          font-size: .75rem;
          color: #ccc
        }
      }
    }
    .annex {
      height: 9.375rem;
      border-bottom: none;
      div {
        margin-top: .3125rem;
      }
    }
  }
}
.line {
  width: 100%;
  height: .625rem;
  background-color: #F3F3F3;
}
.submit {
  display: flex;
  justify-content: center;
  /deep/.van-button {
    width: 80%;
    margin-top: 1.25rem;
    font-size: 1rem;
  }
}
/deep/.van-cell__value {
  span {
    font-size: 0;
  }
}
</style>
