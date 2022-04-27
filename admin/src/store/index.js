import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        username: "",
        roles: "",

    },
    mutations: {
        setusername(state, username) {
            state.username = username;
            console.log(state.username)
        },
        settoken(state, token) {
            state.token = token;
        }
    }
})