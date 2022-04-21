import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '../views/MainView.vue'
import PersonView from '../views/PersonView.vue'
import NewsView from '../views/NewsView.vue'

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

    ]
})

export default router
