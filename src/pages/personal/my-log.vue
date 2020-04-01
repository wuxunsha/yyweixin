<template>
  <div class="content-box">
    <div class="content">
      <!-- tab栏 -->
      <van-tabs v-model="tabIndex" sticky swipeable @click="tabClick">
        <van-tab v-for="(item,index) in tab" :title="item" :key="index">
            <div class="my-log" v-show="tabStatus === 0" @click="goLogDetail(logItem.id)" v-for="(logItem, index) in myLogList" :key="index">
                <div class="myLog-item">
                    <p class="completed">
                        <span>今日完成工作</span>
                        <span class="time">{{logItem.createTime | dateYMD}}</span>
                    </p>
                    <p>{{logItem.todayContent}}</p>
                </div>
                <!-- <div class="myLog-item" v-if="index === 0">
                    <p class="completed">
                        <span>今日完成工作21313</span>
                        <span class="time">{{logItem.createTime | dateYMD}}</span>
                    </p>
                    <p>{{logItem.todayContent}}</p>
                </div> -->
            </div>
            <div class="member-log" v-show="tabStatus === 1" @click="goLogDetail(item.id)" v-for="(item, index) in myMemberDataList" :key="index">
                <div class="myLog-item">
                    <p class="completed">
                        <span>今日完成工作</span>
                    </p>
                    <p>{{item.todayContent}}</p>
                    <p class="member">
                        <span class="department">{{item.orgName}} {{item.nickName}}</span>
                        <span class="time">{{item.createTime | dateYMD}}</span>
                    </p>
                </div>
            </div>
        </van-tab>
      </van-tabs>
      <div class="edit" @click="editHanderle">
      </div>
    </div>
  </div>
</template>

<script>
import * as myLogApi from 'api/my-log'
export default {
  data () {
    return {
      // tab默认选项
      tabIndex: 0,
      tabStatus: 0,
      // tab栏标题
      tab: {
        title1: '我的日志',
        title2: '成员日志'
      },
      //  获取我的日志列表默认参数
      listParams: {
        page: 1,
        size: 50
      },
      //  我的个人日志
      myLogList: [],
      //  我的成员数据列表
      myMemberDataList: [],
      a: [{
        aa: 1,
        bb: 2
      }]
    }
  },
  created() {
    this.getMyLogList()
  },
  methods: {
    // 获取我的所有日志
    getMyLogList() {
      myLogApi.getMyLogList(this.listParams).then((res) => {
        // console.log(res.data.data.dataList, res.data.code)
        if (res.data.code === 10000) {
          this.myLogList = res.data.data.dataList
        }
      })
    },
    //  获取我的成员日志
    getMyMemberLogList() {
      myLogApi.getMyMemberLogList(this.listParams).then((res) => {
        // console.log(res.data.data.dataList, res.data.code)
        if (res.data.code === 10000) {
          this.myMemberDataList = res.data.data.dataList
        }
      })
    },
    // tab栏切换时候触发
    tabClick (name, title) {
      if (name === 0) {
        this.getMyLogList()
        this.tabStatus = 0
      } else {
        this.getMyMemberLogList()
        this.tabStatus = 1
      }
    },
    //  点击去编写日志
    editHanderle () {
      this.$router.push({path: '/edit_my_log'})
    },
    goLogDetail (id) {
      this.$router.push({
        path: '/log_detail',
        query: {
          id: id
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
    overflow: hidden;
    min-height: calc(100vh + 0px);
    .my-log {
        padding: 0 .625rem;
    }
    .member-log {
        padding: 0 .625rem;
    }
    .edit {
        width: 2.1875rem;
        height: 2.1875rem;
        border-radius: 50%;
        background-color: #0A72E6;
        right: 0;
        bottom: 3.125rem;
        position: fixed;
        background: url(../../../static/image/personal-center/edit.png)  no-repeat;
        background-size: 2.1875rem 2.1875rem;
    }
    .myLog-item{
        padding: .9375rem .625rem;
        background-color: #fff;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:.625rem;
        margin-top: .625rem;
        font-size: .75rem;
        color: #333;
        .completed {
            display: flex;
            justify-content: space-between;
            margin-bottom: .3125rem;
            span {
                color: #989898;
                font-size: .75rem;
            }
            .time {
                color: #ccc;
                font-size: .625rem;
            }
        }
        .member {
            display: flex;
            justify-content: space-between;
            margin-top: .3125rem;
            .department {
                color: #989898;
                font-size: .75rem;
            }
            .time {
                color: #ccc;
                font-size: .625rem;
            }
        }
        p{
            margin: 0;
            line-height: 1.25rem;
        }
    }
}
</style>
