<template>
  <div class="content-title">
    <div class="title">
        <van-icon name="arrow-left" size="20px" style="margin-left:10px;" @click="goBack"/>
        <div class="content">
            {{titles}}
        </div>
        <div class="right">
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  props: ['titles'],
  created() {},
  methods: {
    goBack() {
      this.$router.go(-1)
    }
  },
  components: {
  },
  computed: {
  }
}
</script>

<style scoped lang="less">
.title{
    width: 100%;
    height: 2.8125rem;
    border: .0625rem solid #ccc;
    position: fixed;
    z-index: 999;
    display: flex;
    align-items: center;
    background-color: #fff;
    .content{
        flex: 1;
        color: #333;
        font-size: 1rem;
        text-align: center;
        font-weight: bold;
    }
    .right{
        width: 20px;
        height: 20px;
        margin-right: 10px;
    }
}
</style>
