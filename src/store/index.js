import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
      status: '',
      token: localStorage.getItem('token') || '',
      user : {},
      someuser: {},

      animesType: null,
      animes: [],
      anime:{},
      genres: [],
      animes_status: 'loading',

      reg_error:{},
      login_error: {},
      errors: null,
      shikiUrl: 'https://shikimori.one',
      APIurl: 'http://127.0.0.1:8000',

  },
  getters: {
    ANIMES: state =>{
        return state.animes;
    },
    ANIME: state =>{
      return state.anime;
    },
    SHIKIURL: state =>{
        return state.shikiUrl;
    },
    APIURL: state =>{
      return state.APIurl;
    },
    GENRES: state =>{
        return state.genres;
    },
    GENRE_BY_ID: (state) => (id) =>{
        return state.genres.find(genres => genres.id === id)
    },
    USER: state =>{
      return state.user;
    },
    SOMEUSER: state =>{
      return state.someuser;
    },
    token: state => state.token,
    isLoggedIn: state => !!state.token,
    authStatus: state => state.status,

    REG_ERROR: state => state.reg_error,
    LOGIN_ERROR: state => state.login_error,
    ANIMESSTATUS: state => state.animes_status,
    ERRORS: state => state.errors,
  },
  mutations: {
      SET_ANIMES: (state, payload) =>{
        state.animes = payload;
      },
      
      ADD_ANIMES: (state, payload) =>{
        state.animes = state.animes.concat(payload);
      },
      SET_GENRES: (state, payload) =>{
        state.genres = payload;
      },
      SET_ANIME: (state, payload) =>{
        state.anime = payload;
      },


      SET_SOMEUSER: (state, payload) =>{
        state.someuser = payload;
      },
      SET_USER: (state, payload) =>{
        state.user = payload;
      },
      SET_USER_PROFILE: (state, payload) =>{
        state.user = state.user.concat(payload);
      },

      ANIME_REQUEST(state){
        state.animes_status = 'loading'
      },
      ANIME_SUCCESS(state){
        state.animes_status = 'success'
      },
      ANIME_ERROR(state){
        state.animes_status = 'error'
        state.errors = 'anime'
      },

      auth_request(state){
        state.status = 'loading'
      },
      auth_success(state, token){
        state.status = 'success'
        state.token = token
      },
      reg_error(state, err){
        state.status = 'error'
        state.errors = 'reg'
        state.reg_error = err 
      },
      login_error(state, err){
        state.status = 'error'
        state.errors = 'login'
        state.login_error = err 
      },
      logout(state){
        state.status = ''
        state.token = ''
      },

  },
  actions: {
      GET_ANIMES({commit}, payload){
        return new Promise((resolve, reject) => {
          commit('ANIME_REQUEST')

          let params = {
            ordering:payload.ordering,
            search:payload.search,
            page:payload.page,
            year_start:payload.year_start,
            year_end:payload.year_end,
            gf: payload.gf
          }
          if (payload.genres){
            params.genres = payload.genres.join(',')
          }


          axios({url: `${this.state.APIurl}/api/${payload.type}`, params:params, method: 'GET' })
          .then(resp => {

            
            if(payload.page > 1){
              commit('ADD_ANIMES', resp.data.results);
            }
            else{
              commit('SET_ANIMES', {});
              commit('SET_ANIMES', resp.data.results);
            }

            commit('ANIME_SUCCESS');
            resolve(resp)
          })
          .catch(err => {
            commit('ANIME_ERROR');
            reject(err)
          })
        })
      },
      CLEAR_ANIMES({commit}){
        commit('SET_ANIMES', {});
      },
      
      GET_GENRES({commit}){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.APIurl}/api/genres`, method: 'GET' })
          .then(resp => {
            commit('SET_GENRES', resp.data.genres);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_ANIME({commit},payload){
        return new Promise((resolve, reject) => {
          axios({url: `${this.state.APIurl}/api/anime/${payload}`, method: 'GET' })
          .then(resp => {
            commit('SET_ANIME',resp.data.anime);
            resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
      },
      GET_SOME_USER ({commit},slug){
        return new Promise((resolve,reject) => {
          axios({url: `${this.state.APIurl}/api/user/${slug}`, method: 'GET' })
          .then(resp => {
              commit('SET_SOMEUSER',  Object.assign(resp.data.user,resp.data.profile))
              resolve(resp)
          })
          .catch(err => {
            reject(err)
          })
        })
       },      

      GET_USER_BY_TOKEN({commit}){
        return new Promise((resolve,reject) => {
          axios({url: `${this.state.APIurl}/api/myuser`, method: 'GET' })
          .then(resp => {
              commit('SET_USER', Object.assign(resp.data.user,resp.data.profile))
              resolve(resp)
          })
          .catch(err => {
            commit('auth_error')
            localStorage.removeItem('token')
            reject(err)
          })
        })
       },      
      LOGIN({commit}, user){
        console.log(user)
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: `${this.state.APIurl}/api/login`, data: user, method: 'POST' })
          .then(resp => {
            const token = `Token ${resp.data.token}`
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `${token}`
            commit('auth_success', token, user)
            this.dispatch('GET_USER_BY_TOKEN')
            resolve(resp)
          })
          .catch(err => {
            commit('login_error',err.response.data)
            localStorage.removeItem('token')
            reject(err)
          })
        })
      },
      LOGOUT({commit}){
        return new Promise((resolve) => {
          axios({url: `${this.state.APIurl}/api/auth/logout/`, method: 'POST' })
          commit('logout')
          localStorage.removeItem('token')
          delete axios.defaults.headers.common['Authorization']
          resolve()
        })
       },
       REGISTER({commit}, user){
        return new Promise((resolve, reject) => {
          commit('auth_request')
          axios({url: `${this.state.APIurl}/api/register`, data: user, method: 'POST' })
          .then(resp => {
            const token = `Token ${resp.data.token}`
            const user = resp.data.user
            localStorage.setItem('token', token)
            axios.defaults.headers.common['Authorization'] = `${token}`
            commit('auth_success', token, user)
            this.dispatch('GET_USER_BY_TOKEN')

            resolve(resp)
          })
          .catch(err => {
            commit('reg_error', err.response.data)
            localStorage.removeItem('token')
            reject(err)
          })
        })
       },


  },
});