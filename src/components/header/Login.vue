<template>
<div :class="{dpn: !triger}" id="login"  class="row justify-content-center">
    <div class="bg col" @click="tr"></div>
    <md-card md-theme="form" class="mt-5 col-xl-4 col-md-6 col-sm-11 p-0">
        <md-card-header class="d-flex justify-content-center"><h2>Вход</h2></md-card-header>
        <md-card-content class="card-body">
          <md-field class="md-form mb-5 mt-4 form-outline">
              <label for="login__username" class=" form-label">Логин</label>
              <md-input class="md-accent" v-model="form.login__username" id="login__username"/>
              <span v-if="form.errors().has('login__username')" v-text="form.errors().get('login__username')" class="md-error"></span >
          </md-field>
          <md-field class="md-form mb-5 form-outline">
              <label for="login__password">Пароль</label>
              <md-input  type="password" v-model="form.login__password" id="login__password"/>
              <span  v-if="form.errors().has('login__password')" v-text="form.errors().get('login__password')" class="md-error"></span >
          </md-field>
          <md-card-actions class="row justify-content-between">
              <md-button @click='loginSubmit' :disabled="form.empty()"  class="md-raised md-accent col-12">войти</md-button>
          </md-card-actions>
          <md-card-actions>
              <a href="" class="d-flex justify-content-end col md-accent reg-link">Регистрация</a>
          </md-card-actions>
        </md-card-content>
    </md-card>
</div>
</template>
<script>
import form from 'vuejs-form'

export default {
    props:["triger"],
    data: () => ({
        form: form({
          login__username: "",
          login__password: "",
        })
        .rules({
            login__username: 'required|min:5',
            login__password: 'required|min:5',
        })
        .messages({

        }),
   }),
    methods: {
        loginSubmit() {
            if (this.form.validate().errors().any()) return;

            let data ={
              username: this.form.data.login__username,
              password: this.form.data.login__password
            }
            this.$store.dispatch('LOGIN', data)
            .then(() => {
              this.tr()
            })
            .catch(err => console.log(err))

        },
        tr: function(){
          this.$emit('tr', !this.triger);
        }
    }
}
</script>



<style scoped>
.dpn{
  display: none !important;
}
#login{
    border-radius: 5px;
    width: 100%;
    position: absolute;
    z-index: 99;
}
#login .bg{
    background-color: #00000061;
    width: 100%;
    height: 100vh;
    position: absolute;
}
#login .mm-panel{
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0,0,0,.125);
    border-radius: .25rem;
}

#login ul{
   padding: 1rem 5rem;
    list-style: none;
}

#login .form-control{
    height: 3.6rem;
    font-size: 1.6rem;
    margin-bottom: 1rem;
}
#login .mm-navbar__title{
    color: var(--main-text);
}

#login .mm-navbar_sticky{
    border: none;
    padding: .75rem 1.25rem;
    margin-bottom: 0;
    background-color: rgba(0,0,0,.03);
    border-bottom: 1px solid rgba(0,0,0,.125);
     padding: 0;
}
#login  label{
    font-size: 1.6rem;
}
#login label.active{
    font-size: 1.5rem;
}
#login ul .mm-listitem:after{
    border: none;
}
#login .mm-panel:after{
    display: none;
}
</style>