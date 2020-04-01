<template>
  <div class="content-box">
      <div class="content">
        <div v-for="(item, index) in dataList" :key="index">
            <div class="title">
              <div class="left">
                  <div class="icon">
                  </div>
                  <span>
                      {{item.orgName}}
                  </span>
              </div>
              <div class="right" @click="goNextLevel(item.orgId)" v-if="listParams.orgType === 3">
                下属机构 >
              </div>
          </div>
          <ul v-for="(items, index) in item.childrens" :key="index">
              <li v-show="items.isManager === 1">
                  管理员
                  <span>{{items.mobPhone}}</span>
              </li>
              <li v-show="items.isContacter === 1">
                  联络员
                  <span>{{items.mobPhone}}</span>
              </li>
          </ul>
          <div class="line">
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import * as addressBookApi from 'api/address-book.js'
export default {
  data () {
    return {
      // 获取机构要传的id
      listParams: {
        orgId: '',
        orgType: ''
      },
      dataList: []
    }
  },
  beforeRouteEnter: (to, from, next) => {
    next(vm => {
      if (from.path === '/city_function') {
        vm.listParams.orgType = 3
      }
    })
  },
  created() {
    this.listParams.orgId = this.$route.query.orgid
    this.listParams.orgType = this.$route.query.orgType
    this.getOrgListByOrgTypeOrgId()
  },
  methods: {
    //  获取职能机构列表
    getOrgListByOrgTypeOrgId() {
      addressBookApi.getOrgListByOrgTypeOrgId(this.listParams).then((res) => {
        if (res.data.code === 10000) {
          this.dataList = res.data.data
        }
      })
    },
    //  点击去往第三级机构
    goNextLevel(orgid) {
      this.$router.push({
        path: '/city_function',
        query: {
          orgid: orgid
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
        .right {
          font-size: .75rem;
          color: #333;
          line-height: 1.5623rem;
          margin-right: .625rem;
          font-weight: bold;
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
.line {
  width: 100%;
  height: .625rem;
  background-color: #F3F3F3;
}
</style>
