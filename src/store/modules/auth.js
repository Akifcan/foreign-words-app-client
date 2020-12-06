import { API_URL } from '../constants'
import router from '../../router'

const state = {
    user: {},
    message: null
}
const getters = {
    message: state => state.message,
    user: state => state.user
}
const mutations = {
    setUser: (state, user) => state.user = user,
    setMessage: (state, message) => state.message = message
}
const actions = {
    logout(vuexContext) {
        localStorage.removeItem('userToken')
        router.push({ name: 'auth' })
    },
    async login(vuexContext, user) {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        console.log(data);
        if (data.status) {
            vuexContext.commit('setUser', data.user)
            localStorage.userToken = data.token
            router.push({ name: 'myWordList' })
            console.log(vuexContext.state.user);
        } else {
            vuexContext.commit('setMessage', data.message)
        }

    },
    async autoLogin(vuexContext) {
        const response = await fetch(`${API_URL}/auth/current-user`, {
            method: 'POST',
            headers: {
                'authorization': localStorage.userToken
            }
        })
        const data = await response.json()
        console.log(data)
        if (data.status) {
            vuexContext.commit('setUser', data.user)
        } else {
            localStorage.removeItem('userToken')
            router.push({ name: 'auth' })
        }
    },
    async signUp(vuexContext, user) {
        const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        const data = await response.json()
        console.log(data);
        if (data.status) {
            vuexContext.commit('setUser', data.user)
            localStorage.userToken = data.token
            router.push({ name: 'create' })
            console.log(vuexContext.state.user);
        } else {
            vuexContext.commit('setMessage', data.message)
        }
    },
}
export default {
    namespaced: true, state, getters, mutations, actions
}