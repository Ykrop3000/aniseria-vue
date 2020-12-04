<template>
<div class="container_wrap content_wrap" v-infinite-scroll="handleScroll" infinite-scroll-disabled="busy" infinite-scroll-distance="10" >
    <div class="row">
        <div class="col-xl-9 col-lg-12 content-block mb-5">
            <md-card md-theme="list" class="content row mt-3 mt-xl-5 justify-content-center" id="list">
                <md-card-header class="w-100"><h1 class="d-flex mb-3 justify-content-center page-title col-12"></h1></md-card-header>
                <md-card-content class="w-100 pr-0 pl-0">
                <div class="col-12 row pt-3 mb-4 pb-3 justify-content-between settings">
                    <div class="col-auto p-0 d-flex align-items-center justify-content-sm-start">
                        
                        <md-field md-theme="form" class="sort  mb-0" >
                            <label for="sort">Сортировать по:</label>
                            <md-select class="sort" v-model="ordering" name="sort" >
                                <md-option :value="'-year'">Дате выхода</md-option>
                                <md-option :value="'-id'">Дате добавления</md-option>
                                <md-option :value="'user_rate'">Рейтингу</md-option>
                            </md-select>
                        </md-field>

                    </div>
                    <div class="col-auto p-0 d-flex align-items-center justify-content-sm-start">
                        <ul class="sort-view p-0 ">
                            <li class="gridBtn"  v-bind:class="{ active: view==1}" @click="view=1"><i class="fas fa-th"></i></li>
                            <li class="listBtn" v-bind:class="{ active: view==2}" @click="view=2"><i class="fas fa-list"></i></li>
                        </ul>
                    </div>
                </div>


                <div class="animes col-12 grid row justify-content-center"  v-bind:class="{ grid: view==1, list: view==2}">
                    <Short v-for="anime of ANIMES" :key="anime.id" :geners="GENRES" v-bind:i="anime" />
                </div>
                <PreLoader v-show="ANIMESSTATUS=='loading'"/>
                </md-card-content>
            </md-card>
        </div>
        <div class="col-xl-3 d-none d-xl-block sitebar">
            <MyFilter @fs="filter_send"/>
        </div>

    </div>
    <md-speed-dial :class="'md-bottom-right viewDial'" md-direction="top"  v-if="width <= 992" >
      <md-speed-dial-target>
        <i class="fas fa-plus"></i>
      </md-speed-dial-target>

      <md-speed-dial-content>
        <md-button v-bind:class="{ active: view==1}" @click="view=1" class="md-icon-button">
          <i class="fas fa-th"></i>
        </md-button>

        <md-button v-bind:class="{ active: view==2}" @click="view=2" class="md-icon-button">
          <i class="fas fa-list"></i>
        </md-button>
      </md-speed-dial-content>
    </md-speed-dial>
</div>
</template>

<script>

import Short from '@/components/ShortPost'
import {mapGetters} from 'vuex';
import PreLoader from '@/components/items/PreLoader'
import MyFilter from '@/components/Filter'

export default {
    name: 'List',
    components: {
        Short,
        MyFilter,
        PreLoader
    },
    data(){
        return{
            view: 1,
            ordering: '-year',
            pretype: this.$attrs.type,
            page: 1,
            pagination: true,
            width: window.innerWidth,
            filterActive: false,
            filter: {}
        }
    },
    methods: {
        get_time(){
            let d =  new Date();
            return d.getMinutes()*60 + d.getSeconds()
        },
        get_animes(t = true){
            if (this.ANIMES.length == 0 || this.$attrs.type != this.pretype || t) {

                let page = Math.ceil(this.ANIMES.length/24)+1 || 1;
                let params = {
                    type:this.$attrs.type,
                    ordering:this.ordering,
                    page:page,
                }

                if (this.filterActive){
                    params.year_start = this.filter.year[0];
                    params.year_end = this.filter.year[1];
                    params.genres =  this.filter.genres;
                    params.gf =  this.filter.gf;
                }
                    
                this.$store.dispatch('GET_ANIMES', params);
                this.pretype = this.$attrs.type;
            }
        },
        get_genres(){
            if (this.GENRES.length == 0) {
                this.$store.dispatch('GET_GENRES');
            }
        },
        handleScroll: function() {
            if (this.pagination && (this.get_time() - this.lastRequest  >= 3) && this.ANIMESSTATUS == 'success' ){
                this.get_animes()
            }
        },
        filter_send: function(d){
            this.filterActive = true;
            this.filter = d;
            this.$store.dispatch('CLEAR_ANIMES');
            this.get_animes()
        }
    },
    mounted() {
        this.get_animes();
        this.get_genres();
    },
    computed: {
        ...mapGetters(['ANIMES']),
        ...mapGetters(['GENRES']),
        ...mapGetters(['ANIMESSTATUS']),
        lastRequest: () =>{
            let d =  new Date();
            return d.getMinutes()*60 + d.getSeconds()
        }
    },
    watch: {
        ordering() {
            this.$store.dispatch('CLEAR_ANIMES');
            this.get_animes(true)
        }
    }

    
}
</script>

<style lang="scss" scoped>
  .example {
    min-height: 300px;
  }

  .demo-option {
    display: flex;
    flex-flow: wrap;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);

    .select {
      margin: 0 6px;
      display: inline-flex;
      width: auto;
    }
  }
</style>
<style>
.viewDial{
    z-index: 9999;
    position: fixed !important;
    right: 5% !important;
    bottom: 5vh !important;
    opacity: 0.8;
    transition: 0.3s;
}
.viewDial:hover{
    opacity: 1;
}
.viewDial .md-speed-dial-target{
    color: #fff;
    font-size: 2.5rem;
    text-align: center;
    vertical-align: middle;
}
.year-block{
    position: absolute;
    color: #fff;
    font-weight: 400;
    right: 0;
    padding: 2px 10px;
    background: rgba(0,0,0,.7);
    z-index: 1;
    opacity: 0;
    transition: opacity .3s;
}
.anime-column{
    padding: 10px 5px;
    text-align: center;
    position: relative;
    font-size: 1.4rem;
}
.image-block .img{
    max-width: 100%;
    height: auto;
    display: block;
    width: 100%;
    margin: 0 0 1rem;
    padding-bottom: 140%;
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
}
.info-block a {
    line-height: initial;
    font-weight: 600;
    text-transform: uppercase;
    position: relative;
    display: block;
    color: #333;
}
.info-block{
   line-height: 1.2rem;
}
.icons{
  margin: 3px 2px 5px;
}
.icons>*{
   margin-right: 5px;
    font-size: 1.2rem;
    font-weight: 400;
    display: inline-block;
}
.icons *{
    color: #888;
    text-decoration: none!important;
    cursor: default;
}
@media (min-width: 769px){
body .anime-column:hover .year-block, body .anime-column:hover .status-label {
    opacity: 1;
}
}
@media (max-width: 602px){
.animes.grid{
    grid-template-columns: 1fr 1fr 1fr !important;
}
.anime-column{
    margin: 5px 0;
}
.anime-column table{
    display: none;
}

}
@media (max-width: 424px){
.animes.grid{
    grid-template-columns: 1fr 1fr !important;
}
.anime-column{
    margin: 10px 0;
}
}
.animes.list{
    display: flex !important;
    width: 100%;
}
.animes.grid{
    display: grid;
    width: 100%;
    grid-template-columns: 1fr 1fr 1fr 1fr;
}
.type{
    margin-bottom: 5px;
}
.icons{
    padding: 0;
    margin: 3px 2px 5px;
}
.rating-star{
    font-size: 23px;
    margin-right: 5px;
    color: #f2b800;
    vertical-align: middle;
    cursor: pointer;
    transition: color .3s;
}
.main-rating {
    font-size: 16px;
    color: #fff;
    background: #f2b800;
    padding: 0 5px;
    border-radius: 3px;
    font-weight: 600;
    cursor: pointer;
}
.animes.list .info-block{
    display: none;
}
.animes.list .anime-column .image-block{
    max-width: 40%;
}
.animes.grid .list_view{
    display: none;
}
.animes.list .list_view{
    display: flex;
}
.animes.grid .anime-column{
    max-width: 100% !important;
}
.genres{
    line-height: 1.8rem;
}
.sort-view{
    font-size: 2.2rem;
}
.sort-view li{
    margin-left: 1rem;
    color: #ccc;
    padding: .8rem;
    border-radius: 2px;
    cursor: pointer;
    list-style: none;
    display: inline;

}
.sort-view li:first-child{
    margin-left: 0;
}
.sort-view li.active{
    background-color: var(--main-red);
    opacity: 0.9;
    color: #fff;
}
.list_view .cap-2 a{
   color: var(--main-sub-black);
   opacity: 0.8;
   font-size: 1.4rem;
   font-weight:bold;
}
.list_view .cap-2 a:hover{
    text-decoration:none;
    color: var(--main-red);
}


.list_view .cap a{
   color: var(--main-black);
   font-size: 1.6rem;
   line-height: normal;
   text-transform: uppercase;
   text-align: left;
}
.list_view .cap a:hover{
    text-decoration:none;
    color:var(--main-red);
}
.list_view{
    padding:1rem;
    color:#3f444e;
    font-weight: 600;
    font-size: 1.5em;
}
.list_view td.strong{
    margin-right:8px;
    font-size: 1.5rem;
}
.list_view td{
    margin:8px 0;
}
.list_view td p{
    color:#555;
    font-weight:normal;
}
.list_view td a{
    color:#555;
    font-weight:normal;
}
.list_view td a:hover{
    text-decoration: underline;
    color:var(--main-red);
}
</style>