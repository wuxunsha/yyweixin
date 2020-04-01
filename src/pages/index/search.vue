<template>
  <div class="content-box">
    <common-header  :showleft="false" :showSearch="false" :headerClass="headerStatus" v-on:searchValue="searchValues" ref="commonHeader"></common-header>
    <div class="searchHistory" v-if="history" >
      搜索历史
    </div>
    <ul class="historyList" v-if="history">
      <li v-for="(item, index) in historyData" :key="index" @click="searchHistory(item)">{{item}}</li>
    </ul>
    <ul class="historyList" v-else>
      <li v-for="item in searchList" :key="item.id" @click="goToDeatail(item.id, item.infoType)">{{item.title}}</li>
    </ul>
    <div class="clearHistory" v-if="history" @click="clearHistory">
      清空搜索历史
    </div>
    <div class="clearHistory" v-if="noData">
      没有相关搜索数据
    </div>
  </div>
</template>

<script>
// import {mapMutations, mapGetters, mapState} from 'vuex'
import commonHeader from 'common/common-header'
import * as homeApi from 'api/home-api'
export default {
  data () {
    return {
      headerStatus: 'header-boxs',
      // 传参
      searchParams: {
        title: '',
        size: 10
      },
      // 控制历史列表显示的状态
      history: true,
      // 搜索列表数据
      searchList: [],
      // 搜索历史数据集合
      HistoryList: [],
      historyData: '',
      //  没有数据的状态
      noData: false

    }
  },
  created() {
    this.getLocastorageData()
  },
  methods: {
    // ...mapMutations({
    //   setNum: 'SET_NUM'
    // }),
    // todetail() {
    //   this.$router.togo('/Home/Detail')
    // }
    //  拿到从子组件传过来的输入框值
    searchValues(value) {
      if (value + ''.trim() === '') {
        this.history = true
        return
      }
      this.SearchVal(value)
      this.searchParams.title = value
      this.history = false
      homeApi.list(this.searchParams).then((res) => {
        this.searchList = res.data.data.dataList
      })
    },
    //  点击列表去往对应的详情页
    goToDeatail(id, type) {
      this.searchValues('')
      console.log(type)
      this.$router.push({
        path: '/detail',
        query: {
          id: id,
          type: type
        }
      })
      this.$refs.commonHeader.clear()
    },
    // 搜索历史功能
    SearchVal (val) {
      val = val + ''.trim() // 清除空格
      if (this.HistoryList.length > 0) { // 有数据的话 判断
        if (this.HistoryList.indexOf(val) !== -1) { // 有相同的，先删除 再添加
          this.HistoryList.splice(this.HistoryList.indexOf(val), 1)
          this.HistoryList.unshift(val)
        } else { // 没有相同的 添加
          this.HistoryList.unshift(val)
        }
      } else { // 没有数据 添加
        this.HistoryList.unshift(val)
      }
      if (this.HistoryList.length > 10) { // 保留10个值
        this.HistoryList.pop()
      }
      localStorage.setItem('HistoryList', JSON.stringify(this.HistoryList))
      this.getLocastorageData()
    },
    // 获取本地缓存中的数据
    getLocastorageData () {
      let locaData = JSON.parse(localStorage.getItem('HistoryList'))
      this.historyData = locaData
    },
    // 点击清空按钮
    clearHistory () {
      localStorage.removeItem('HistoryList')
      this.getLocastorageData()
    },
    //  点击把搜索历史中的值放到输入框
    searchHistory (val) {
      this.searchValues(val)
    }
  },
  components: {
    commonHeader
  },
  computed: {
    // ...mapGetters([
    //   'number'
    // ]),
    // ...mapState({
    //   number: state => state.home.number
    // })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.searchHistory{
  padding-left: .75rem;
  padding-bottom: .75rem;
  font-size: .9375rem;
  color: #ccc;
  border-bottom: 1px solid #ccc;
}
.historyList{
  li{
    padding: .8125rem .75rem;
    font-size: .875rem;
    color: #989898;
    border-bottom: 1px solid #ccc;
  }
}
.clearHistory{
  padding-top: .75rem;
  font-size: .9375rem;
  color: #ccc;
  text-align: center;
}
</style>
