import Vue from 'vue'
import VueRouter from 'vue-router'
import LoginView from '../views/LoginView.vue'
import MainView from '../views/MainView.vue'
import IndexView from '../views/IndexView.vue'
import CustomerMan from '../views/CustomerMan.vue'
import OverseasMan from '../views/OverseasMan.vue'
import TrainMan from '../views/TrainMan.vue'
import QuestMan from '../views/QuestMan.vue'
import JournalMan from '../views/JournalMan.vue'
import NoticeMan from '../views/NoticeMan.vue'
import NewsMan from '../views/NewsMan.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/login_view', name: 'login_view', component: LoginView, meta: { isPublic: true } },
    {
      path: '/',
      name: 'mainview',
      component: MainView,
      redirect: '/index_view',
      children: [
        { path: '/index_view', component: IndexView },
        { path: '/customer/customer_man', component: CustomerMan },
        { path: '/overseas/overseas_man', component: OverseasMan },
        { path: '/train/train_man', component: TrainMan },
        { path: '/quest/quest_man', component: QuestMan },
        { path: '/journal/journal_man', component: JournalMan },
        { path: '/notice/notice_man', component: NoticeMan },
        { path: '/notice/news_man', component: NewsMan },
      ]
    },

  ]
})


export default router
