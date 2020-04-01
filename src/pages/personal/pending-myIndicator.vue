<template>
  <div class="content-box">
    <div class="top">
        <span>
                    登录电脑操作后台才可录入指标内容
        </span>
    </div>
    <div class="indicato-item-card">
        <p class="firstLevel">
            <span>一级指标：高质量发展</span>
            <span></span>
        </p>
        <p class="secondary">
            <span>
                二级指标：民生保障
            </span>
        </p>
        <p class="thirdGrade">
            <span>三级指标：城乡居民收入</span>
        </p>
        <p class="assessmentPoints">
            <span>考核要点:目标值</span>
            <span>分值：1.5分</span>
        </p>
        <p class="taskContent">
            <span>
                任务内容：绝对值达到全市平均水平计1分，高（低）全市平均水平的，加（减）（本地区居民人均可支配收入-全市平均水平）／全市平均水平×0.1分，最多加0.2分
            </span>
        </p>
    </div>
    <div class="bottom" @click="goFeedback">
        共N条反馈与批示
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  created() {},
  methods: {
    goFeedback () {
      this.$router.push({path: '/feedback'})
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
    margin-top: 0;
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
.top{
    width: inherit;
    height: 1.875rem;
    font-size: .75rem;
    color: #F94E4E;
    line-height: 1.875rem;
    span{
      padding-left: 1.125rem;
    }
}
.bottom{
    width: inherit;
    height: 2.8125rem;
    background-color: #fff;
    position: fixed;
    bottom: 0;
    color: #0A72E6;
    line-height: 2.8125rem;
    font-size: .75rem;
    text-align: center;
    font-weight: bold;
}
</style>
