<template>
  <div class="content-box">
    <div class="score">
        <div class="list">
            <div class="left">
                机构
            </div>
            <div class="right">
                社会评价得分
            </div>
        </div>
        <div class="null" v-if="scoreList.length === 0">
          暂时没有机构与评分
        </div>
        <div class="regionalScore" v-for="(item, index) in scoreList" :key="index">
            <div class="left">
                {{item.orgName}}
            </div>
            <div class="right">
                {{item.score}}
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import * as homeApi from 'api/home-api'
export default {
  data () {
    return {
      // 获取分数传参
      scoreParams: {
        parentId: 1,
        orgType: ''
      },
      scoreList: []
    }
  },
  created() {
    this.scoreParams.orgType = this.$route.query.id
    this.sociaEvalList()
  },
  methods: {
    sociaEvalList() {
      homeApi.sociaEvalList(this.scoreParams).then((res) => {
        if (res.data.code === 10000) {
          this.scoreList = res.data.data.data.childreds
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
.list {
  background-color: #fff;
  width: 100%;
  height: 2.5rem;
  display: flex;
  div {
      flex: 1;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      color: #333;
      font-size: .875rem;
      line-height: 2.5rem;
      text-align: center;
      font-weight: bold;
  }
}
.regionalScore {
  background-color: #fff;
  width: 100%;
  height: 2.5rem;
  display: flex;
  div {
      flex: 1;
      border-left: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      color: #989898;
      font-size: .75rem;
      line-height: 2.5rem;
      text-align: center;
  }
}
.null {
  margin-top: 1.25rem;
  font-size: .875rem;
  color: #989898;
  text-align: center;
}
</style>
