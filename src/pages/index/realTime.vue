<template>
  <div class="content-box">
    <div class="realTime orgName">
        <p class="first">责任机构</p>
        <p class="name">{{list.orgName}}</p>
    </div>
    <div class="line">
    </div>
    <div class="realTime orgName">
        <p class="first">实事项目名称</p>
        <p class="name">{{list.projectName}}</p>
    </div>
    <div class="line">
    </div>
    <div class="realTime orgName">
        <p class="first">项目描述</p>
        <p class="name">{{list.projectContent}}</p>
    </div>
    <div class="line">
    </div>
    <div class="realTime orgName">
        <p class="first">完成情况</p>
        <p class="name">{{list.remarks}}</p>
    </div>
    <div class="line">
    </div>
    <div class="realTime orgName ">
        <p class="first">数据图</p>
        <div id="main" style="width: 21.875rem;height:12.5rem;margin: 0 auto;"></div>
    </div>
  </div>
</template>

<script>
import * as homeApi from 'api/home-api'
import echarts from 'echarts'
export default {
  data () {
    return {
      //  首页带过来的id,类型
      detailParams: {
        id: '',
        type: ''
      },
      list: [],
      options: {
        color: ['#3398DB'],
        title: {
          text: ''
        },
        grid: {
          x: '20%'
        },
        tooltip: {},
        legend: {
        },
        xAxis: {
          data: ['目标值', '完成情况']
        },
        yAxis: {},
        series: [{
          type: 'bar',
          barWidth: '30%',
          data: [5, 20]
        }]
      }
    }
  },
  created() {
    this.detailParams.id = this.$route.query.id
    this.detailParams.type = this.$route.query.type
    this.detailInquire()
  },
  mounted() {
  },
  methods: {
    // 获取事实项目的详情
    detailInquire() {
      homeApi.detail(this.detailParams).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 10000) {
          this.list = res.data.data
          this.options.series[0].data[0] = res.data.data.targetValue
          this.options.series[0].data[1] = res.data.data.compValue
          var myChart = echarts.init(document.getElementById('main'))
          myChart.setOption(this.options)
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
.realTime {
  p {
      margin: 0;
      margin-bottom:  .3125rem;
  }
  .first {
    font-size: 1rem;
    color: #333;
    font-weight: bold;
  }
  .name {
    text-indent: .625rem;
    font-size: .875rem;
    color: #989898;
    line-height: 1.375rem;
  }
}
.line {
  width: 100%;
  height: .625rem;
  background-color: #F3F3F3;
}
</style>
