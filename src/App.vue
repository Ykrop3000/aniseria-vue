<template>
  <div id="app" >
    <Header/>
    
    <div class="main_content-wrapper">
      <div class="container main-container ">
        <router-view/>
      </div>
    </div>

    <Footer/>
    <md-snackbar :md-position="'center'" :md-duration="4000" :md-active.sync="showErrors" md-persistent>
      <span>Сервер не доступен. Попробуйте позже!</span>
      <md-button class="md-primary" @click="showErrors = false">ok</md-button>
    </md-snackbar>
  </div>
</template>

<script>
import Header from '@/components/header/Header'
import Footer from '@/components/Footer'
import {mapGetters} from 'vuex';

export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
  data(){
    return{
      showErrors: false,
      position: 'left',
    }
  },
  computed: {
    ...mapGetters(['ERRORS'])
  },
  watch:{
    ERRORS(){
      if (this.ERRORS){
        this.showErrors = true
      }else{
        this.showErrors = false
      }
    }
  }
}
</script>

<style lang="scss">
@import "~vue-material/dist/theme/engine"; // Import the theme engine

@include md-register-theme("default", (
  primary: #fff, // The primary color of your application
  accent: #ee4540,
));
@include md-register-theme("form", (
  primary:#ee4540, // The primary color of your application
));
@include md-register-theme("list", (
  primary: #555, // The primary color of your application
));
@import "~vue-material/dist/theme/all";

// Apply the theme
</style>
