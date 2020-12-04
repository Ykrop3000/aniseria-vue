<template>
<div class="container_wrap content_wrap user-profile  pt-5">
    <md-card class="row white user-profile_top align-items-center pt-2 pb-2">
        <div class="col-md-2 col-sm-3 col-xs-3 d-flex justify-content-center">
            <div class="avatar mt-4 mb-4">
                <div :style="{background: 'url('+ APIURL + SOMEUSER.avatar +') 50% 50% no-repeat'}" class="avatar card"></div>
            </div>
        </div>
        <div class="col-md-10 col-sm-9 col-xs-9 d-flex justify-content-start ">
            <div class="row ">
                <div class="row col-12 d-flex justify-content-start">
                    <div class="col-12"><span class="username"> <h2>ПОЛЬЗОВАТЕЛЬ: {{ SOMEUSER.username }}</h2> </span></div>
                    <div class="col-12 status">
                        <span class="green-t">Онлайн</span>
                    </div>
                </div>
                <div class="row mt-3 col-12 d-flex justify-content-start mb-4">
                    <ul class="user_tab nav">
                        <li class="d-flex justify-content-center align-items-center"><a data-toggle="tab" href="#user1"
                                                                                        class="active">Информация</a>
                        </li>
   
                    </ul>
                </div>
            </div>
        </div>
    </md-card>
    <md-card class="row pt-5 user-profile_bottom tab-content">
        <div class="tab-pane active col-12" id="user1">
            <ul class="user-info_wrap col-12 row mb-3 ">
                <li class="user-info_block  col-12 row">
                    <div class="user-info_block_left"><strong>Имя</strong></div>
                    <div class="user-info_block_right">{{ SOMEUSER.first_name }}</div>
                </li>
                <li class="user-info_block  col-12 row">
                    <div class="user-info_block_left"><strong>Место жительства</strong></div>
                    <div class="user-info_block_right">{{ SOMEUSER.location }}</div>
                </li>
                <li class="user-info_block  col-12 row">
                    <div class="user-info_block_left"><strong>Зарегистрирован</strong></div>
                    <div class="user-info_block_right">{{ SOMEUSER.date_joined }}</div>
                </li>
                <li class="user-info_block col-12 row">
                    <div class="user-info_block_left"><strong>Последняя активность</strong></div>
                    <div class="user-info_block_right">{{ SOMEUSER.last_login }}</div>
                </li>
            </ul>
            <div class="myself col-12">
                <strong>О СЕБЕ</strong>
            </div>
            <div class="myself-content mb-5 col-12">
                {{ SOMEUSER.aboutMyself }}
            </div>
        </div>
    </md-card>
</div>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
    name: 'UserProfile',
    components: {

    },
    data(){
        return{
           
        }
    },
    mounted() {
        this.$store.dispatch('GET_SOME_USER', this.$route.params.username);
    },
    computed: {
        ...mapGetters(['SOMEUSER']),
        ...mapGetters(['APIURL'])
    },
    methods: {
        
    }
    
}
</script>