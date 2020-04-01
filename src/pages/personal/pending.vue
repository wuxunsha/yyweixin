<template>
  <div class="content-box">
    <div class="content">
        <div class="pending-item" @click="goPendingMyIndicator(item.busyType)" v-for="item in pendingList" :key="item.id" >
           <p>{{item.title}}</p>
           <p class="time">
               <span v-show="item.createTime !== null">{{item.createTime | dateYMD }}</span>
           </p>
        </div>
        <div class="null" v-if="pendingList.length === 0">
          当前没有待处理事件
        </div>
    </div>
  </div>
</template>

<script>
import * as pendingApi from 'api/pending'
export default {
  data () {
    return {
      //  请求待处理的列表需要的默认参数
      listParams: {
        pageIndex: 1,
        pageSize: 50
      },
      pendingList: []
    }
  },
  created() {
    this.geToDoList()
  },
  methods: {
    //  获取待处理的列表
    geToDoList () {
      pendingApi.getToDoList(this.listParams).then((res) => {
        console.log(res.data.data)
        if (res.data.code === 10000) {
          this.pendingList = res.data.data
          console.log(this.pendingList)
        }
      })
    },
    goPendingMyIndicator (busyType) {
      if (busyType === 5) {
        this.$router.push({path: '/innovation'})
      } else {
        this.$toast('请登录电脑后台管理系统进行操作')
      }
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
.null {
  color: #989898;
  font-size: .875rem;
  text-align: center;
}
.content{
    padding: 0 .9375rem;
    overflow: hidden;
    min-height: calc(100vh + 0px);
    .pending-item{
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
</style>
