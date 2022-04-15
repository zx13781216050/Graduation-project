import Vue from 'vue'
import VueRouter from 'vue-router'

import MainView from '../views/MainView.vue'


Vue.use(VueRouter)
const router = new VueRouter({
    routes: [

        {
            path: '/',
            name: 'mainview',
            component: MainView,
        },

    ]
})

export default router
