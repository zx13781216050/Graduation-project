import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import IndexView from '../views/IndexView.vue'
import CustomerMan from '../views/CustomerMan.vue'
import ProjectMan from '../views/ProjectMan.vue'
import TrainMan from '../views/TrainMan.vue'
import QuestMan from '../views/QuestMan.vue'
import JournalMan from '../views/JournalMan.vue'
import NoticeMan from '../views/NoticeMan.vue'
import NewsMan from '../views/NewsMan.vue'
import Institut from '../views/InstitutMan.vue'
import Specialty from '../views/SpecialtyMan.vue'
import Power from '../views/PowerMan.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login_view', name: 'login_view', component: LoginView, meta: { isPublic: true } },
    {
      path: '/',
      name: 'mainview',
      redirect: '/index_view',
      component: MainView,
      children: [
        { path: '/index_view', component: IndexView },
        { path: '/customer/customer_man', component: CustomerMan },
        { path: '/project/project_man', component: ProjectMan },
        { path: '/train/train_man', component: TrainMan },
        { path: '/quest/quest_man', component: QuestMan },
        { path: '/journal/journal_man', component: JournalMan },
        { path: '/notice/notice_man', component: NoticeMan },
        { path: '/notice/news_man', component: NewsMan },
        { path: '/institut/institut_man', component: Institut },
        { path: '/institut/specialty_man', component: Specialty },
        { path: '/power/power_man', component: Power },
      ]
    },

  ]
})

router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && !localStorage.token) {
    return next('/login_view')
  }
  next()
})
export default router
