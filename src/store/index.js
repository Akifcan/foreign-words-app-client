import { createStore } from 'vuex'
import router from '../router'
import { API_URL, roles } from './constants'

import Auth from './modules/auth';

export default createStore({
  modules: {
    Auth
  },
  state: {
    publicWords: [],
    userWords: null,
    languages: [
      {
        image: require("@/assets/images/languages/english.png"),
        title: "İngilizce",
      },
    ],
    questions: {
      name: '',
      list: []
    },
    translationResult: null
  },
  mutations: {
    setPublicWords: (state, words) => state.publicWords = words,
    setTranslationResult: (state, result) => state.translationResult = result,
    addQuestion: (state, question) => {
      state.questions.list.push(question)
      console.log(state.questions);
    },
    setQuestionName: (state, name) => {
      state.questions.name = name
      console.log(state.questions);
    },
    setUserWords: (state, words) => state.userWords = words
  },
  actions: {
    async translateWord(vuexContext, word) {
      const response = await fetch(`${API_URL}/translate`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json'
        },
        body: JSON.stringify({ word })
      })
      const data = await response.json()
      vuexContext.commit('setTranslationResult', data.result)
    },
    async userWords(vuexContext) {
      vuexContext.state.userWords = null
      const response = await fetch(`${API_URL}/word-list`, {
        method: 'POST',
        headers: {
          'authorization': localStorage.userToken ? `${roles.USER} ${localStorage.userToken}` : `${roles.GUEST} ${localStorage.userId}`
        }
      })
      const data = await response.json()
      console.log(data);
      if (data.status) {
        vuexContext.commit('setUserWords', data.words)
      }
    },
    async createWords(vuexContext) {
      console.log(vuexContext.state.questions);
      const response = await fetch(`${API_URL}/create-word-list`, {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          'authorization': localStorage.userToken ? `${roles.USER} ${localStorage.userToken}` : `${roles.GUEST} ${localStorage.userId}`
        },
        body: JSON.stringify({ questions: vuexContext.state.questions })
      })
      const data = await response.json()
      if (data.status) {
        vuexContext.dispatch('userWords')
        router.push({ name: 'myWordList' })
      }
    },
    async sharePublic(vuexContext, id) {
      const response = await fetch(`${API_URL}/share-public/${id}`, {
        method: 'POST'
      })
      const data = await response.json()
      console.log(data);
    },
    async publicWords(vuexContext) {
      const response = await fetch(`${API_URL}/public-words`, {
        method: 'POST'
      })
      const data = await response.json()
      if (data.status) {
        vuexContext.commit('setPublicWords', data.words)
      }
    }
  },
})
