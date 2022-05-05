import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '../views/MainView.vue'
import PersonView from '../views/PersonView.vue'
import NewsView from '../views/NewsView.vue'
import NewsDetailView from '../views/NewsDetailView.vue'
import InstitutView from '../views/InstitutView.vue'
import InstitutDetailView from '../views/InstitutDetailView'
import TrainView from '../views/TrainView'
import ProjectView from '../views/ProjectView'
import TrainDetailView from '../views/TrainDetailView'
import ProjectDetailView from '../views/ProjectDetailView'
import QuestionView from '../views/QuestionView'

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [

        {
            path: '/',
            name: 'mainview',
            component: MainView,
        },
        {
            path: '/person',
            name: 'personview',
            component: PersonView,
        },
        {
            path: '/news',
            name: 'NewsView',
            component: NewsView,
        },
        {
            path: '/newsdetail',
            name: 'NewsDetailView',
            component: NewsDetailView,
        },
        {
            path: '/institut',
            name: 'InstitutView',
            component: InstitutView,
        },
        {
            path: '/institutdetail',
            name: 'InstitutDetailView',
            component: InstitutDetailView,
        },
        {
            path: '/train',
            name: 'TrainView',
            component: TrainView,
        },
        {
            path: '/project',
            name: 'ProjectView',
            component: ProjectView,
        },
        {
            path: '/traindetail',
            name: 'TrainDetailView',
            component: TrainDetailView,
        },
        {
            path: '/projectdetail',
            name: 'ProjectDetailView',
            component: ProjectDetailView,
        },
        {
            path: '/question',
            name: 'QuestionView',
            component: QuestionView,
        },
    ]
})

export default router
