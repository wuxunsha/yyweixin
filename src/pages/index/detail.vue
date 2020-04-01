<template>
  <div class="content-box">
      <titles titles="文章详情"></titles>
      <div class="box">
        <div class="title">
            <p class="firstLevel">{{list.title}}</p>
            <p class="secondary">{{list.titleSmall}}</p>
        </div>
        <div class="content">
            <p class="type">
                <span>类型: {{list.sortTypeName}}</span>
                <span>{{list.updateTime | dateYMD}}</span>
            </p>
            <div class="image" v-if="list.imgurl">
                <img :src="list.imgurl" alt="">
            </div>
            <p class="contentBody" v-html="list.content">
            </p>
        </div>
      </div>
  </div>
</template>

<script>
import * as homeApi from 'api/home-api'
import titles from '../../components/title'
export default {
  data () {
    return {
      //  首页带过来的id,类型
      detailParams: {
        id: '',
        type: ''
      },
      //  详情页数据集合
      list: []
    }
  },
  created() {
    this.detailParams.id = this.$route.query.id
    this.detailParams.type = this.$route.query.type
    this.detailInquire()
  },
  methods: {
    detailInquire() {
      homeApi.detail(this.detailParams).then((res) => {
        console.log(res.data.code)
        if (res.data.code === 10000) {
          this.list = res.data.data
        }
      })
    }
  },
  components: {
    titles
  },
  computed: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.box {
  overflow: hidden;
}
.title{
    margin-top: 2.8125rem;
    padding: .625rem 0;
    border-bottom: .0625rem solid #F3F3F3;
    p{
        margin: 0;
        text-align: center;
    }
    .firstLevel{
        font-size: 1rem;
        color: #333;
        font-weight: bold;
    }
    .secondary{
        font-size: .875rem;
        color: #989898;
    }
}
.content{
    padding: .625rem .9375rem;
    .type{
        display: flex;
        margin: 0;
        justify-content: space-between;
        font-size: .75rem;
        color: #CCCCCC;
    }
    .image{
        margin: .625rem 0;
        width: 100%;
        height: 11.875rem;
        border: 1px solid #ccc;
        border-radius: .375rem;
        overflow: hidden;
        img{
            width: 100%;
            height: 100%;
        }
    }
    .contentBody{
        // text-indent:1.875rem;
        font-size: .75rem;
        color: #666666;
        letter-spacing: .125rem;
        line-height: 1.25rem;
        /deep/p {
          width: 100% !important;
        /deep/img{
          margin: .625rem 0;
          width: 100%;
          height: 11.875rem;
          border: 1px solid #ccc;
          border-radius: .375rem;
          overflow: hidden;
          width: 100% !important;
          height: 100%;
        }
      }
    }
}
</style>
