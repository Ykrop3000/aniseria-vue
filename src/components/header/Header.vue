<template>
<div class="sticky md-elevation-4" v-bind:class="{ search_open: search, loginpopup_open:usermenu && isLoggedIn  }">
    <div class="header_top-wrapper">
        <div class="container  main-container ">
            <header class="container_wrap header_wrap row">

                <div class="header_top col-12 row justify-content-between">

                    <div class="col-auto justify-content-start logo d-flex align-items-center">
                        <router-link id="logo" to="/"><img :src="logo" alt="logo"/></router-link>
                    </div>

                    <!-- Меню md,lg,xl экранах -->
                    <div v-if="width > 992" class="col-6  d-flex justify-content-xl-center justify-content-sm-start justify-content-xs-start nav-row ">
                        <Nav/>
                    </div>
                    <!--------------------------->
                    
                    <!-- Меню sm,xs экранах -->
                    <div  v-if="width <= 992" class="col-3 align-items-center  d-flex justify-content-xl-center justify-content-sm-start justify-content-xs-start burger">
                        <SlideMenu/>
                    </div>
                    <!--------------------------->
                    <div class="col-auto d-flex justify-content-end align-items-center header_right">
                        <div class="search mr-md-5 mr-sm-3">
                            <i class="h_btn" id="search" @click="search = !search; usermenu = false" ><i class="fas fa-search"></i></i>  
                        </div>
                        
                        <div v-if="isLoggedIn" @click="usermenu = !usermenu; search = false"  id="loginpopup" class="h_btn login avatar"
                         :style="{background: 'url('+ APIURL + USER.avatar +') 50% 50% no-repeat'}"></div>

                        <a v-if="!isLoggedIn" href="#" @click="loginTriger = !loginTriger"  class="login-link mr-3">Вход</a>
                        <router-link v-if="!isLoggedIn" :to="{name:'reg'}" class="md-accent reg-link">Регистрация</router-link>
                    
                    </div>
                </div>
            </header>
        </div>
    </div>
    <Login :triger="loginTriger" v-on:tr="loginTriger = !loginTriger" />
    <UserMenu :user="USER"/>
    <Search/>
</div>
</template>


<script>
import logo from '@/assets/img/main_logo.svg'; //file-loader вернет путь к картинке
import Login from './Login'
import Search from './Search'
import UserMenu from './UserMenu'
import Nav from './Nav'
import {mapGetters} from 'vuex';
import SlideMenu from './SlideMenu'

export default {
    components: {
        Login,
        Search,
        UserMenu,
        SlideMenu,
        Nav
    },
    data() {
        return {
            logo,
            loginTriger:false,
            search: false,
            usermenu: false,
            width: window.innerWidth,
        };
    },
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn},
      ...mapGetters(['USER']),
      ...mapGetters(['token']),
      ...mapGetters(['APIURL'])
    },
    methods: {
        handleWidthChange() {
            this.width =  window.innerWidth;
        }
    },
    mounted(){
        if (this.token){
           this.$store.dispatch('GET_USER_BY_TOKEN');
        }
        window.addEventListener(
            "resize",
            this.handleWidthChange
        );
    },
    watch: {
        ordering() {
            this.get_animes(true)
        }
    }
};
</script>


<style>
    .sticky{
        border-bottom: 3px solid var(--main-red);
        position: sticky !important;
        top: 0;
        z-index: 3!important;
    }
    .logo img{
        max-height:3rem;
    }
    .bm-burger-button {
        position: relative;
        top: unset;
        left: unset;
    }
    .bm-burger-bars{
        background-color: #fff;
        opacity: 0.8;
    } 
    .header_top-wrapper{
        -webkit-box-shadow: 0px 3px 28px 1px rgba(0,0,0,0.25);
        -moz-box-shadow: 0px 3px 28px 1px rgba(0,0,0,0.25);
        box-shadow: 0px 3px 28px 1px rgba(0,0,0,0.25);
        background-color: #262C38;
    }
    .main_content-wrapper{
        background-color: var(--main-background);
        min-height: 90vh;
        padding-bottom: 2rem;
    }
    .header_top {
        padding: 10px;
    }
    header{
        padding: 0 !important;
        text-transform: uppercase;
        position:-webkit-sticky;

        padding:1em 1em 1em;
        border-top-left-radius: 3px;
        -webkit-border-top-left-radius: 3px;
        -moz-border-top-left-radius: 3px;
        -o-border-top-left-radius: 3px;
        border-top-right-radius: 3px;
        -webkit-border-top-right-radius: 3px;
        -moz-border-top-right-radius: 3px;
        -o-border-top-right-radius: 3px;
        background: #262C38;

    }
    .nav-row, .nav {
	text-align:center;
    }
    .nav-row  ul , .nav ul{
        width:100%;
        padding:0;
        margin:0;
        list-style:none;
    }
    .nav-row  li , .nav li{
        margin: 0px 4% 0px 0;
        display:inline-block;
    }
    .nav-row  li a:hover, .nav li a:hover{
        zoom: 1;
        filter: alpha(opacity=50);
        opacity: 0.8;
        -webkit-transition: opacity .15s ease-in-out;
        -moz-transition: opacity .15s ease-in-out;
        -ms-transition: opacity .15s ease-in-out;
        -o-transition: opacity .15s ease-in-out;
        transition: opacity .15s ease-in-out;
    }
    .nav-row  li a, .nav li a {
        font-size:1.8rem;
        display:inline-block;
        color:#fff;
        opacity: 0.8;
    }
    .nav-row  li a:hover, .nav  li a:hover{
        text-decoration:none;
        color:var(--main-red) !important;
    }
    .nav-row  li .active, .nav li .active{
        color:var(--main-red);
    }

</style>