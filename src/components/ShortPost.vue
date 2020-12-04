<template>
<div class="anime-column p-0 col-md-6 col-xs-12 justify-content-start row p-2">
    <router-link :to="{name:'anime', params:{slug:i.url}}" class="image-block p-0 col-12">
        <div class="year-block">{{i.year}}</div>
        <div class="img" v-bind:style="{ 'background-image': 'url(' + SHIKIURL + i.poster + ')' }"></div>
        <div class="rate" v-if="i.user_rate">{{i.user_rate}}</div>

    </router-link>
    <div class="info-block align-items-start justify-content-center row col-12 p-0">
        <router-link :to="{name:'anime', params:{slug:i.url}}" class="anime-title col-12 p-0  d-flex justify-content-center">
             {{i.russian}}
        </router-link>
        <div class="type col-12  d-flex justify-content-center">{{i.kind}}</div>
        <div class="icons col-12  justify-content-center row">
            <div class="col-auto p-0">
                <i class="fa fa-eye"></i>
                {{i.views}}
            </div>
            <div class="col-auto p-0">
                <i class="fa fa-star"></i>
            </div>
        </div>
        <div class="rating col-12  d-flex justify-content-center">
            <span class="fa fa-star rating-star"></span>
            <span class="main-rating d-flex justify-content-center align-items-center">{{i.user_rate}}</span>
        </div>
    </div>
    <div class="list_4 list_view col-7 pt-0 row">
        <div class="col-12 p-0 cap mb-1 d-flex justify-content-start">
            <router-link :to="{name:'anime', params:{slug:i.url}}">{{i.russian}}</router-link>
        </div>
        <div class="col-12 p-0 cap-2 mb-4 d-flex justify-content-start">
            <router-link :to="{name:'anime', params:{slug:i.url}}">{{i.english}}</router-link>
        </div>
        <table class="col-12">
                
            <tbody align="left">
            
            <tr v-if="i.country">
                <td class="strong">Производство:</td>
                <td><p>{{i.country}}</p></td>
            </tr>

            <tr v-if="i.duration">
                <td class="strong">Просмотр:</td>
                <td><p>{{i.duration}} мин.</p></td>
            </tr>

            <tr v-if="i.aired_on">
                <td class="strong">Год:</td>
                <td><p>{{i.aired_on}}</p></td>
            </tr>

            <tr >
                <td class="strong">Жанр:</td>
                <td>
                    <p class="genres">
                        <GenerItem v-for="gener of i.genresList" :key="gener" :j="gener" :geners="geners" />
                    </p>
                </td>
            </tr>
            </tbody>
        </table>
        <div class="rating col-12 pt-4 pl-0 d-flex justify-content-start align-items-center">
            
            <span class="fa fa-star rating-star"></span>
            <span class="main-rating d-flex justify-content-center align-items-center"></span>

        </div>

    </div>
</div>
</template>

<script>
    import {mapGetters} from 'vuex';
    import GenerItem from '@/components/items/GenerItem';
    export default {
        name: 'Short',
        props: ['i','geners'],
        components:{
            GenerItem
        },
        computed: {
            ...mapGetters(['SHIKIURL'])
        },
        mounted(){
            
        }

    }
</script>
    
<style>

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
    color: var(--main-text);
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
    color: #f99e4c;
    vertical-align: middle;
    cursor: pointer;
    transition: color .3s;
}
.main-rating {
    font-size: 16px;
    color: #fff;
    background: #f99e4c;
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
.animes.grid .anime-column{
    max-width: 100% !important;
}
.genres{
    line-height: 1.8rem;
}
</style>