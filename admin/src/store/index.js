import Vue from "vue"
import Vuex from "vuex"
import http from '../http'
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: "",
        roles: "",
        token: localStorage.token,
        routes: [],
        addRoutes: []
    },
    mutations: {
        setusername(state, username) {
            state.username = username;
        },
        settoken(state, token) {
            state.token = token;
        },
        setroles(state, roles) {
            state.roles = roles;
        },
        setroutes(state, routes) {
            state.addRoutes = routes
            state.routes = routes
        }
    },
    actions: {
        getInfo({ commit, state }) {
            return http({
                method: "get",
                url: `/user/user_info`,
            }).then(
                response => {
                    if (response.data.status == 0) {
                        commit('setusername', response.data.data.username)
                        commit('setroles', response.data.data.Role_name)
                        window.localStorage.setItem('roles', response.data.data.Role_name)
                    }
                },
                error => {
                    alert(error.message)
                })
        },
        generateRoutes({ commit }, routes) {
            let newroutes = routes.filter(item => {
                if (item.meta) {
                    return item.meta.role.includes(window.localStorage.getItem('roles'))
                }
                return item
            })
            commit('setroutes', newroutes)
            return newroutes
        }
    }
})