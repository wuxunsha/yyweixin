<template>
  <div class="content-box">
    <div class="top">
    </div>
    <div class="dataNull" v-if="hidden">
      当前没有指标
    </div>
    <div class="indicato-item-card" v-for="(item, index) in dataList" :key="index" >
        <p class="firstLevel">
            <span>一级指标: {{item.indexOneName}}</span>
            <span>{{item.score}}分</span>
        </p>
        <p class="secondary">
            <span>
                二级指标: {{item.indexTwoName}}
            </span>
        </p>
        <p class="thirdGrade">
            <span>三级指标: {{item.indexThreeName}}</span>
        </p>
        <p class="assessmentPoints">
            <span>考核要点:{{item.perDesc}}</span>
            <span>分值: {{item.score}}分</span>
        </p>
        <p class="taskContent">
            <span>
                任务内容：{{item.targetValue }}
            </span>
        </p>
    </div>
  </div>
</template>

<script>
import * as homeApi from 'api/home-api'
export default {
  data () {
    return {
      params: {},
      dataList: [],
      hidden: false
    }
  },
  created() {
    console.log(this.$route.query)
    this.paramas = this.$route.query
  },
  mounted() {
    this.getIndexInfo()
  },
  methods: {
    getIndexInfo() {
      homeApi.getIndexListByOrgId(this.paramas).then((res) => {
        if (res.data.data === null) {
          this.hidden = true
        }
        this.dataList = res.data.data
      })
    }
  },
  components: {
  },
  computed: {
  }
}
</script>

<style scoped lang="less">
@import url('../../styles/personal.less');
.indicato-item-card{
    padding: .625rem .625rem 1.25rem .625rem;
    margin: .9375rem;
    background-color: #fff;
    border-radius: .625rem;
    box-shadow:0px 3px 6px rgba(0,0,0,0.16);
    p {
        margin: .9375rem 0 0 0;
        display: flex;
        justify-content: space-between;
        font-size: .75rem;
        color: #333;
    }
    .thirdGrade{
        margin-left: 3.5rem;
    }
    .taskContent{
        line-height: 1.25rem;
    }
}
.dataNull {
  text-align: center;
  color: #989898;
}
</style>
