import Vue from 'vue'
import Vuex from 'vuex'
//import createLogger from 'vuex/dist/logger'
import cars from './cars/cars'

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    cars
  },
  // strict: debug,
  // plugins: debug ? [createLogger()] : []
})
