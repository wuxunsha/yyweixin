<template>
  <div class="page">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
  </div>
</template>

<script>
// import { fetch, loginUserNo} from '@/api/home-api'
export default {
  data () {
    return {
    }
  },
  created () {

  },
  computed: {
    activeRoute () {
      return this.$route.path
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
</style>
