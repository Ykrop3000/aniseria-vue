<template>
    <div class="container_wrap content_wrap registration">
    <div class="content row justify-content-center">
        <div class="col-xl-7 col-md-12 col-sm-12 d-flex justify-content-center mt-5 mb-5">
            <md-card md-theme="form" :style="{width:'100%'}">
                <md-card-header class="d-flex justify-content-center"><h2>Регистрация</h2></md-card-header>
                <md-card-content class="card-body">
                    <div>
                        <md-field class="md-form mb-4" :class="{ 'md-invalid': REG_ERROR.username }">
                            <label for="username">Логин</label>
                            <md-input type="text"  v-model="form.username" name="username" id="username" required autofocus/>
                            <div v-if="form.errors().has('username')" v-text="form.errors().get('username')"  class="md-error"></div>
                            <div v-for="(i,id) in REG_ERROR.username" v-text="i" :key="id"  class="md-error"></div>
                        </md-field>
                        <md-field class="md-form mb-4" :class="{ 'md-invalid': REG_ERROR.email }">
                            <label for="email">E-mail</label>
                            <md-input type="email" v-model="form.email" name="email" id="email"  required/>
                            <div v-if="form.errors().has('email')" v-text="form.errors().get('email')"  class="md-error"></div>
                            <div v-for="(i,id) in REG_ERROR.email" v-text="i" :key="id"  class="md-error"></div>
                        </md-field>
                        <md-field class="md-form mb-4" :class="{ 'md-invalid': REG_ERROR.password1 }">
                            <label for="reg_password">Пароль</label>
                            <md-input type="password" v-model="form.password1"  name="password1" id="reg_password"  required />
                            <div v-if="form.errors().has('password1')" v-text="form.errors().get('password1')"  class="md-error"></div>
                            <div v-for="(i,id) in REG_ERROR.password1" v-text="i" :key="id"  class="md-error"></div>
                        </md-field>
                        <md-field class="md-form mb-4" :class="{ 'md-invalid': REG_ERROR.password2 }">
                            <label for="reg_password2">Повторите пароль</label>
                            <md-input type="password" v-model="form.password2" name="password2" id="reg_password2" required />
                            <div v-if="form.errors().has('password2')" v-text="form.errors().get('password2')"  class="md-error"></div>
                            <div v-for="(i,id) in REG_ERROR.password2" v-text="i" :key="id"  class="md-error"></div>
                        </md-field>
                        <md-card-actions class="row justify-content-center">
                            <md-button @click='submit' :disabled='form.empty()' class="md-raised md-primary">ЗАРЕГИСТРИРОВАТЬСЯ</md-button>
                        </md-card-actions>
                        
                    </div>
                </md-card-content>
            </md-card>
            <div class="clearfix"></div>
        </div>

    </div>
</div>
</template>
<script>
import form from 'vuejs-form'
import {mapGetters} from 'vuex';

export default {
    data: () => ({
        form: form({
            username : "",
            email : "",
            password1 : "",
            password2 : "",
        })
        .rules({
            username: 'min:5|required',
            email: 'email|min:5|required',
            password1: 'required|min:5|same:password2',
            password2: 'min:6|required'
        })
        .messages({
            'email.email': 'Email field must be an email (durr)',
            'password1.same': 'Whoops, :attribute does not match the :same field',
        }),
   }),
    computed:{
        ...mapGetters(['REG_ERROR'])
    },
    methods: {
        submit() {
            if (this.form.validate().errors().any()) return;

            let data = {
                username: this.form.data.username,
                email: this.form.data.email,
                password: this.form.data.password1,
                password2: this.form.data.password2
            }
            this.$store.dispatch('REGISTER', data)
            .then(() => this.$router.push('/'))
            .catch(err => console.log(err))
        },
    }
  }
</script>