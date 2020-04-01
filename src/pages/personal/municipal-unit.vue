<template>
  <div class="content-box">
    <ul>
        <li v-for="item in dataList" :key="item.id">{{item.userName}}<span>{{item.mobPhone}}</span></li>
    </ul>
  </div>
</template>

<script>
import * as addressBookApi from 'api/address-book.js'
export default {
  data () {
    return {
      // 机构id
      orgid: '',
      // 数据列表
      dataList: []
    }
  },
  created() {
    this.orgid = this.$route.query.orgid
    this.getMunicipalAddressBook()
  },
  methods: {
    // 获取益阳市的管理人员电话
    getMunicipalAddressBook () {
      addressBookApi.getUserListByOrgId(this.orgid).then((res) => {
        if (res.data.code === 10000) {
          this.dataList = res.data.data
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
.content-box{
    ul{
        li{
            height: 2.8125rem;
            background-color: #fff;
            line-height: 2.8125rem;
            padding-left: .9375rem;
            color: #333333;
            font-size: .875rem;
            font-weight: bold;
            border-top: 1px solid #f6f6f6;
            span{
                color: #989898;
                margin-left: 1.5625rem;
                font-weight: 400;
            }
        }
    }
}
</style>
