<template>
  <div class="maxBox">
    <div :class="headerClass">
      <div class="avatar" v-if="showleft">
      </div>
      <van-search placeholder="搜索您最关心的绩效考核内容" v-model="value" @focus="focusHanderle" @blur="blruHanderle" @input="searchHanderle" />
      <div class="search" @click="search" v-if="showSearch">
        搜索
      </div>
      <div class="search" @click="cancelSearch" v-else >
        取消
      </div>
    </div>
  </div>
</template>

<script>
import cusInput from 'common/cus-input'
export default {
  data() {
    return {
      value: ''
    }
  },
  props: {
    backgroudColor: {
      type: String,
      default: 'background-color:#0A72E6'
    },
    showleft: {
      type: Boolean,
      default: true
    },
    showSearch: {
      type: Boolean,
      default: true
    },
    headerClass: {
      type: String,
      default: function () {
        return 'header-box'
      }
    }
  },
  created () {
  },
  methods: {
    back() {
      this.$router.goBack()
    },
    //  监听输入框获取焦点
    focusHanderle () {
      this.$router.push('/search')
    },
    //  输入框发生变化触发
    searchHanderle () {
      this.$emit('searchValue', this.value)
    },
    //  监听输入框失去焦点
    blruHanderle () {
    },
    // 监听点击搜索
    search () {
    },
    // 点击取消
    cancelSearch () {
      this.$router.push('/home')
      this.clear()
      this.searchHanderle()
    },
    //  触发清空输入框
    clear () {
      this.value = ''
    }
  },
  components: {
    cusInput
  }
}
</script>

<style lang="less" scoped>
.maxBox {
  height: 4rem;
  width:  100%;
  overflow: hidden;
  position: relative;
  z-index: 99999;
.header-box {
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  background-color: #0A72E6;
  .avatar{
    width: 1.875rem;
    height: 1.875rem;
    border-radius: 50%;
    background-color: #ccc;
    margin-left: .75rem;
  }
  .search{
    color: #fff;
    font-size: .875rem;
    margin: 0 .875rem 0 .5rem;
    letter-spacing: .125rem;
  }
  /deep/.van-search{
    height: 1.625rem;
    padding: 0;
    flex: 1;
    margin-left: .75rem;
    border-radius: .3125rem;
    background-color: #7FB3EC !important;
    /deep/.van-search__content{
      height: 1.625rem;
      border-radius: .3125rem;
      padding: 0;
      padding-left: 1rem;
      background-color: #7FB3EC !important;
    }
    /deep/.van-cell{
      padding: 0;
      /deep/.van-field__left-icon{
        color: #0A72E6;
        /deep/.van-icon{
          font-size: .75rem;
          line-height: 1.625rem;
        }
      }
      /deep/.van-cell__value{
        position: relative;
        /deep/.van-field__body{
          width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  /deep/.van-field__control{
    color: #0A72E6;
    font-size: .75rem;
  }
  /deep/.van-field__body{
    input::placeholder {
        color: #0A72E6;
        font-size: .75rem;
        line-height: 1.625rem;
    }
  }
}
.header-boxs {
  height: 4rem;
  width: 100%;
  display: flex;
  align-items: center;
  position: fixed;
  .search{
    color: #0A72E6;
    font-size: .875rem;
    margin: 0 .875rem 0 .5rem;
    letter-spacing: .125rem;
  }
  /deep/.van-search{
    height: 1.625rem;
    padding: 0;
    flex: 1;
    margin-left: .75rem;
    border-radius: .3125rem;
    background-color: #F3F3F3 !important;
    /deep/.van-search__content{
      height: 1.625rem;
      border-radius: .3125rem;
      padding: 0;
      padding-left: 1rem;
      background-color: #F3F3F3 !important;
    }
    /deep/.van-cell{
      padding: 0;
      /deep/.van-field__left-icon{
        color: #CCCCCC;
        /deep/.van-icon{
          font-size: .75rem;
          line-height: 1.625rem;
        }
      }
      /deep/.van-cell__value{
        position: relative;
        /deep/.van-field__body{
       width: 100%;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
  /deep/.van-field__control{
    // color: #CCCCCC
    font-size: .75rem;
  }
  /deep/.van-field__body{
    input::placeholder {
        color: #CCCCCC;
        font-size: .75rem;
    }
  }
}
}

</style>
