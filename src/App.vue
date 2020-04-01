<template>
  <div id="app">
    <transition :name="transitionName">
        <router-view class="Router"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  provide() {
    return {
      reload: this.reload
    }
  },
  data() {
    return {
      transitionName: ''
    }
  },
  watch: {
    $route() {
      if (this.$router.isleft) {
        this.transitionName = 'slideleft'
      }
      if (this.$router.isright) {
        this.transitionName = 'slideright'
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="less">
</style>
