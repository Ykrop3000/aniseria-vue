<template>
<div class="header_slide-wrapper" >
    <div class="container  main-container ">
        <div id="loginpane" class="col-12 row  droptopbar loggedpane align-items-center justify-content-between">
            <div class="col-9 row align-items-center justify-content-start">
                <div class="col-auto">
                    <router-link :to="{name:'user', params:{username:user.username}}">привет: <span class="username">{{user.username}}</span></router-link>
                </div>
                <div class="col-auto">
                    <router-link :to="{name:'favorites'}">Закладки</router-link>
                </div>
            </div>
            <div class="col-3 row align-items-center justify-content-end">
                <div class="col-auto">
                    <a @click="logout" class="md-accent logout-link">Выход</a>
                </div>
            </div>

        </div>
    </div>
</div>
</template>

<script>
  export default {
    props:['user'],
    computed : {
      isLoggedIn : function(){ return this.$store.getters.isLoggedIn}
    },
    methods: {
      logout: function () {
        this.$store.dispatch('LOGOUT')
        .then(() => {
          this.$router.push('/')
        })
      }
    },
  }
</script>