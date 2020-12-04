import Vue from 'vue'
import Router from 'vue-router'
import List from '@/views/List'
import Single from '@/views/Single'
import Register from '@/views/Register'
import UserProfile from '@/views/UserProfile'
Vue.use(Router)

export default new Router({
    mode:'history',
    routes:[
        {
            path: '/animes',
            name: 'animes',
            component: List,
            props:{
                type:'animes'
            }
        },
        {
            path: '/anime/:slug',
            name: 'anime',
            component: Single
        },
        {
            path: '/filter',
            name: 'filter',
            component: List,
            props:{
                type:'filter'
            }
        },
        {
            path: '/gener/:slug',
            name: 'gener',
            component: List,
            props:{
                type:'geners'
            }
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: List,
            props:{
                type:'favorites'
            },
            meta: { 
                requiresAuth: true
              }
        },
        {
            path: '/register',
            name: 'reg',
            component: Register,
            meta: { 
                requiresAuth: false
              }
        },
        {
            path: '/user/:username',
            name: 'user',
            component: UserProfile,
            meta: { 
                requiresAuth: false
              }
        }
    ]
})