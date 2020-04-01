<template>
  <div class="content-box">
    <div class="content">
        <div class="announcement-item" v-for="(item, index) in dataList" :key="index" @click="goReview(item.title, item.userOrgName, item.createTime, item.status, item.content, item.id)">
           <p class="title">{{item.title}}</p>
           <p class="organization">
             <span>{{item.userOrgName}}</span>
             <span>申请日期：{{item.createTime | dateYMD}}</span>
           </p>
           <p class="status">
             状态: <span v-if="item.status === 1">待处理</span>
             <span v-else-if="item.status === 0">新建</span>
             <span v-else-if="item.status === 2">审核通过</span>
             <span v-else>驳回</span>
           </p>
           <p class="focus">
            {{item.content}}
           </p>
        </div>
        <div class="dataNull" v-if="dataList.length == 0">
          暂时没有创新创优为待处理状态
        </div>
    </div>
  </div>
</template>

<script>
import * as pendingApi from 'api/pending'
export default {
  data () {
    return {
      //  请求创新创优列表需要的参数
      InnovateParams: {
        pageIndex: 1,
        pageSize: 10
      },
      dataList: []
    }
  },
  created() {
    this.getInnovateToDoList()
  },
  methods: {
    //  获取创新创优列表
    getInnovateToDoList () {
      pendingApi.getInnovateToDoList(this.InnovateParams).then((res) => {
        console.log(res.data.data.data, res.data.code)
        if (res.data.code === 10000) {
          this.dataList = res.data.data.data
        }
      })
    },
    //  去往创新创优审核页
    goReview (title, userOrgName, createTime, status, content, id) {
      this.$router.push({
        path: '/review',
        query: {
          title: title,
          userOrgName: userOrgName,
          createTime: createTime,
          status: status,
          content: content,
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
.content{
    padding: 0 .9375rem;
    overflow: hidden;
    min-height: calc(100vh + 0px);
    .announcement-item{
        padding: .9375rem .625rem;
        background-color: #fff;
        box-shadow:0px 3px 6px rgba(0,0,0,0.16);
        border-radius:.625rem;
        margin-top: .625rem;
        font-size: .75rem;
        color: #333;
        p {
          margin: 0;
          margin-bottom: .3125rem;
        }
        .title {
          font-size: .875rem;
          color: #333;
          font-weight: bold;
        }
        .organization {
          display: flex;
          justify-content: space-between;
          font-size: .75rem;
          color: #989898;
        }
        .status {
          font-size: .75rem;
          color: #989898;
          span {
            color: #FFAA00
          }
        }
        .focus {
          color: #333;
          line-height: 1.25rem;
        }
    }
}
.dataNull {
  margin-top: 80%;
  text-align: center;
  color: #989898;
}
</style>
