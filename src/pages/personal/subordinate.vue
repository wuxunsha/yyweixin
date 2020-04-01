<template>
  <div class="content-box">
      <div class="content">
          <div class="title">
              <div class="left">
                  <div class="icon">
                  </div>
                  <span>
                      八字哨镇
                  </span>
              </div>
          </div>
          <ul>
              <li>
                  管理员
                  <span>13312345678</span>
              </li>
              <li>
                  联络员
                  <span>13412345678</span>
              </li>
          </ul>
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
    margin-bottom: .9375rem;
    .title{
        height: 1.5625rem;
        display: flex;
        justify-content: space-between;
        background-color: #fff;
        .left{
            display: flex;
            .icon{
                width: .1875rem;
                height: .9375rem;
                background-color: #0A72E6;
                margin:.3125rem  .5rem 0 .9375rem;
            }
            span{
                font-size: .875rem;
                color: #333;
                font-weight: bold;
                line-height: 1.5625rem;
            }
        }
    }
    ul{
        li{
            height: 2.8125rem;
            line-height: 2.8125rem;
            border-top: .0625rem solid #f6f6f6;
            color: #333;
            font-size: .875rem;
            font-weight: bold;
            background-color: #fff;
            padding-left: 2.5rem;
            span{
                color: #989898;
                font-weight: 400;
                margin-left: 1.25rem;
            }
        }
    }
}
</style>
