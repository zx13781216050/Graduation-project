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
    { path: '/login_view', component: LoginView, hidden: true },
    {
      path: '/home',
      name: '首页',
      redirect: '/home/index_view',
      component: MainView,
      children: [
        { path: 'index_view', name: '首页', component: IndexView },
      ]
    },

  ],
  asyncRoutes: [

    {
      path: '/customer',
      name: '客户管理',
      component: MainView,
      meta: {
        role: ['admin', 'super_editor', 'manager']
      },
      children: [{ path: 'customer_man', name: '客户信息管理', component: CustomerMan },]

    },
    { path: '/project', component: MainView, name: '留学方案', meta: { role: ['admin', 'super_editor', 'project_editor'] }, children: [{ path: 'project_man', name: '方案信息管理', component: ProjectMan },] },
    { path: '/train', component: MainView, name: '课程培训', meta: { role: ['admin', 'super_editor', 'train_editor'] }, children: [{ path: 'train_man', name: '课程培训信息管理', component: TrainMan },] },
    { path: '/quest', component: MainView, name: '问题反馈', meta: { role: ['admin', 'super_editor', 'quest_editor'] }, children: [{ path: 'quest_man', name: '问题反馈', component: QuestMan },] },
    // { path: '/journal', component: MainView, name: '日志', meta: { role: ['admin', 'super_editor','journal_editor'] }, children: [{ path: 'journal_man', name: '日志', component: JournalMan },] },{ path: 'notice_man', name: '公告', component: NoticeMan },
    { path: '/notice', component: MainView, name: '新闻公告', meta: { role: ['admin', 'super_editor', 'notice_editor'] }, children: [{ path: 'news_man', name: '新闻信息管理', component: NewsMan },] },
    { path: '/institut', component: MainView, name: '学院专业', meta: { role: ['admin', 'super_editor', 'institut_editor'] }, children: [{ path: 'institut_man', name: '学院信息管理', component: Institut }, { path: 'specialty_man', name: '专业信息管理', component: Specialty }] },
    { path: '/power', component: MainView, name: '权限管理', meta: { role: ['admin'] }, children: [{ path: 'power_man', name: '权限管理', component: Power },] },
  ],

})



export default router
