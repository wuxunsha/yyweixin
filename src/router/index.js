import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)
// 需要左方向动画的路由用this.$router.to('****')
Router.prototype.togo = function (path) {
  this.isleft = true
  this.isright = false
  this.push(path)
}
// 需要右方向动画的路由用this.$router.goRight('****')
Router.prototype.goRight = function (path) {
  this.isright = true
  this.isleft = false
  this.push(path)
}
// 需要返回按钮动画的路由用this.$router.goBack()，返回上一个路由
Router.prototype.goBack = function () {
  this.isright = true
  this.isleft = false
  this.go(-1)
}
// 点击浏览器返回按钮执行，此时不需要路由回退
Router.prototype.togoback = function () {
  this.isright = true
  this.isleft = false
}
// 点击浏览器前进按钮执行
Router.prototype.togoin = function () {
  this.isright = false
  this.isleft = true
}
export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: (resolve) => require(['@/pages/index/home'], resolve),
      children: [
        {
          path: '/home',
          name: 'home',
          component: (resolve) => require(['@/pages/index/home'], resolve)
        },
        {
          path: '/footprints',
          name: 'footprints',
          component: (resolve) => require(['@/pages/index/footprints'], resolve)
        },
        {
          path: '/day',
          name: 'day',
          component: (resolve) => require(['@/pages/index/day'], resolve)
        }
      ]
    },
    {
      path: '/search',
      name: 'stsearchory',
      component: (resolve) => require(['@/pages/index/search'], resolve)
    },
    {
      // 登录
      path: '/login',
      name: 'login',
      component: (resolve) => require(['@/pages/Login/login'], resolve)
    },
    // 个人中心
    {
      path: '/personal_center',
      name: 'personal_center',
      component: (resolve) => require(['@/pages/personal-center'], resolve)
      // beforeEnter(to, from, next) {
      //   let code = JSON.parse(localStorage.getItem('Login_Code'))
      //   next()
      // }
    },
    // 我的信息
    {
      path: '/my_profile',
      name: 'my_profile',
      component: (resolve) => require(['@/pages/personal/my-profile'], resolve)
    },
    //  我的指标
    {
      path: '/my_indicator',
      name: 'my_indicator',
      component: (resolve) => require(['@/pages/personal/my-indicator'], resolve)
    },
    //  市领导看到的指标
    {
      path: '/leadership_indicator',
      name: 'leadership_indicator',
      component: (resolve) => require(['@/pages/personal/leadership-indicator'], resolve)
    },
    //  通讯录
    {
      path: '/address_book',
      name: 'address_book',
      component: (resolve) => require(['@/pages/personal/address-book'], resolve)
    },
    //  市委单位通讯录
    {
      path: '/municipal_unit',
      name: 'municipal_unit',
      component: (resolve) => require(['@/pages/personal/municipal-unit'], resolve)
    },
    //  区县单位通讯录
    {
      path: '/district',
      name: 'district',
      component: (resolve) => require(['@/pages/personal/district'], resolve)
    },
    //  下属机构通讯录
    {
      path: '/subordinate',
      name: 'subordinate',
      component: (resolve) => require(['@/pages/personal/subordinate'], resolve)
    },
    //  市职能机构通讯录
    {
      path: '/city_function',
      name: 'city_function',
      component: (resolve) => require(['@/pages/personal/city-function'], resolve)
    },
    //  经济园区通讯录
    {
      path: '/economic_park',
      name: 'economic_park',
      component: (resolve) => require(['@/pages/personal/economic-park'], resolve)
    },
    //  待处理主页面
    {
      path: '/pending',
      name: 'pending',
      component: (resolve) => require(['@/pages/personal/pending'], resolve)
    },
    //  待处理指标页面
    {
      path: '/pending_myIndicator',
      name: 'pending_myIndicator',
      component: (resolve) => require(['@/pages/personal/pending-myIndicator'], resolve)
    },
    {
    //  创新创优列表页面
      path: '/innovation',
      name: 'innovation',
      component: (resolve) => require(['@/pages/personal/innovation'], resolve)
    },
    {
    // 创新创优审核
      path: '/review',
      name: 'review',
      component: (resolve) => require(['@/pages/personal/review'], resolve)
    },
    //  反馈与批示
    {
      path: '/feedback',
      name: 'feedback',
      component: (resolve) => require(['@/pages/personal/feedback'], resolve)
    },
    {
      path: '/title',
      name: 'title',
      component: (resolve) => require(['@/components/title'], resolve)
    },
    {
      // 详情
      path: '/detail',
      name: 'detail',
      component: (resolve) => require(['@/pages/index/detail'], resolve)
    },
    {
      // 实时项目
      path: '/realTime',
      name: 'realTime',
      component: (resolve) => require(['@/pages/index/realTime'], resolve)
    },
    {
      // 社会评价打分society
      path: '/societyScore',
      name: 'societyScore',
      component: (resolve) => require(['@/pages/index/societyScore'], resolve)
    },
    {
      // 通知公告
      path: '/announcement',
      name: 'announcement',
      component: (resolve) => require(['@/pages/personal/announcement'], resolve)
    },
    {
      // 绩效目标页面
      path: '/announcement_myIndicator',
      name: 'announcement_myIndicator',
      component: (resolve) => require(['@/pages/personal/announcement-myIndicator'], resolve)
    },
    {
      // 市领导点击通知公告页面看到的列表
      path: '/announcement_mechanism',
      name: 'announcement_mechanism',
      component: (resolve) => require(['@/pages/personal/announcement-mechanism'], resolve)
    },
    {
      //  通知详情页面
      path: '/notice_detail',
      name: 'notice_detail',
      component: (resolve) => require(['@/pages/personal/notice-detail'], resolve)
    },
    {
      //  流程通知-社会评价
      path: '/social_evaluation',
      name: 'social-evaluation',
      component: (resolve) => require(['@/pages/personal/social-evaluation'], resolve)
    },
    {
      //  通知公告-问卷调查
      path: '/questionnaire',
      name: 'questionnaire',
      component: (resolve) => require(['@/pages/personal/questionnaire'], resolve)
    },
    {
      //  我的日志
      path: '/my_log',
      name: 'my_log',
      component: (resolve) => require(['@/pages/personal/my-log'], resolve)
    },
    {
      //  编写日志
      path: '/edit_my_log',
      name: 'edit_my_log',
      component: (resolve) => require(['@/pages/personal/edit-my-log'], resolve)
    },
    {
      //  日志详情
      path: '/log_detail',
      name: 'log_detail',
      component: (resolve) => require(['@/pages/personal/log-detail'], resolve)
    },
    // 绩效改进流程第二个界面
    {
      path: '/improve_detail',
      name: 'improve_detail',
      component: (resolve) => require(['@/pages/personal/improve-detail'], resolve)
    }
  ]
})
