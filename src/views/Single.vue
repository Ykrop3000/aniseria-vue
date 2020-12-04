<template>
<div class="container_wrap single_page pb-4">
    <div class="content mb-3 row">
        <md-card md-theme="list" class="content-wrapper mt-lg-5 col-12">
            <div class="row col-12">

                <div class="movie_image">
                    <img v-bind:src="SHIKIURL + ANIME.poster" class="img-responsive" alt=""/>
                    <div class="lable label__rate">
                        <div v-if="ANIME.user_rate" class="rate">{{ANIME.user_rate}}</div>
                    </div>
                </div>

                <div class="video-Ani">
                </div>

            </div>

            <div class="row single-content-wrapper col-12">
                <div class="col-lg-4 col-md-12 row" style="max-width: 30%;">

                </div>
                <div class="col-lg-8  col-md-12 pl-xl-0 row">
                    <div class="col-12">
                        <div class="row title cap mt-5 justify-content-start"><h1>{{ANIME.russian}}</h1></div>
                        <div class="row orig_title cap-2 justify-content-start"><h3>{{ANIME.name}}</h3></div>
                        
                        <div class="row justify-content-center pt-3 mt-3 sm-img " v-if="width <=992">
                            <img v-bind:src="SHIKIURL + ANIME.poster" class="img-responsive w-100" alt=""/>
                            <div class="lable label__rate">
                                <div v-if="ANIME.user_rate" class="rate">{{ANIME.user_rate}}</div>
                            </div>
                        </div>

                        <div class="row info mt-5">
  
                            <div v-if="ANIME.country" class="col">
                                <span>Страна:</span>
                                <span>{{ANIME.country}}</span>
                            </div>

                            <div v-if="ANIME.duration" class="col">
                                <span>Время:</span>
                                <span>{{ANIME.duration}} мин.</span>
                            </div>
      
                            <div v-if="ANIME.aired_on" class="col">
                                <span>Год:</span>
                                <span>{{ANIME.aired_on}}</span>
                            </div>

                            <div v-if="ANIME.actors" class="col">
                                <span>Актёры:</span>
                                <span>{{ANIME.actors}}</span>
                            </div>

                        </div>
                        <div class="row info mt-3 mb-3">
                            <div class="col">
                                <span>Жанр:</span>
                                <span>
                                    <GenerItem v-for="gener of ANIME.genresList" :key="gener" :j="gener" :geners="GENRES" />
                                </span>
                            </div>

                            <div v-if="ANIME.type" class="col">
                                <span>Тип:</span>
                                <span>{{ANIME.type}}</span>
                            </div>


                            <div v-if="ANIME.status" class="col">
                                <span>Статус:</span>
                                <span>{{ANIME.status}}</span>
                            </div>

                            <div v-if="ANIME.directors" class="col">
                                <span>Директора:</span>
                                <span>{{ANIME.directors}}</span>
                            </div>

                        </div>
                    </div>
                    <div class="col-12 single-content-wrapper pb-4 ">
                        <div class="row">
                            <div class="col-12 d-flex justify-content-start mt-2">
                                <div class="btn_red">Описание</div>
                            </div>

                            <div class="row pt-4">
                                <div class="col-12 description">
                                    {{ANIME.description}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </md-card>
    </div>
</div>
</template>

<script >
import {mapGetters} from 'vuex';
import GenerItem from '@/components/items/GenerItem';

export default {
    name: 'Single',
    data(){
        return{
            width: window.innerWidth,
        }
    },
    components: {
        GenerItem
    },
    mounted() {
        this.$store.dispatch('GET_ANIME',this.$route.params.slug);
        this.$store.dispatch('GET_GENRES');
    },
    computed: {
        ...mapGetters(['ANIME']),
        ...mapGetters(['SHIKIURL']),
        ...mapGetters(['GENRES'])
    }
}
</script>


<style scoped>
.description{
    font-size: 16px;
    color: var(--main-sub-black);
    line-height: 24px;
}
.info .col span:first-child{
    display: block;
    font-size: 1.6rem;
}
.sm-img{
    border-top: 1px solid rgba(0, 0, 0, 0.135);
}
.info .col span:last-child{
    color: var(--main-red);
    font-size: 1.6rem;
}
.title{
    color:#262C38;
}
.orig_title{
    color:#888;
}
.info a{
    color:#555;
}
.info .col{
    float: left;
}

.info a, footer a{
    color:#cb242a;
}

.img-wrapper{
    background-color:#f5f5f5;
    flex-direction: row;
}
.img-wrapper .img{
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 100%;
    height: 100%;
    padding-bottom: 50%;
}
.btn_red{
    padding:10px;
    background-color: var(--main-red);
    color: #fff;
    font-size: 1.8rem;
    display:inline-block;
    border-radius: 2px;
}
#sb-overlay{
    background: rgba(0,0,0,0.5) !important;
}
.movie_image img{
    width:100%;
}
.movie_image{
    width:30%;
}
.video-Ani{
    background-color:#262c38cf;
    width: 70%;
}
.video-Ani iframe{
    min-height: 480px;
    width: 100%;
    height: 100%;
}
</style>