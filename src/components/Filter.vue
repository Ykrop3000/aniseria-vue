<template>
<md-card ref="Filter" md-theme="form" id="filter1" class="mt-5 row justify-content-center">
    <md-card-header class="card-header mb-4 block-title d-flex align-items-center col-12">
        <i class="fas fa-sliders-h"></i>
        <h3 class="pl-3">Фильтр</h3>
    </md-card-header>

    <md-card-content class="filter  col-12">
        <div class="mt-2"><i class="fa fa-calendar"></i> Год выпуска</div>
		<vue-slider
		class="mb-5 p-3"
		v-model="filter.year" 
		:tooltip="'always'" 
		:interval="10"
		:marks="true"
		:min="min_year"
		:max="max_year"
		:lazy="true"/>


        <md-field class="col-12 row justify-content-center" id="genres-id">
            <md-switch class="gf" v-model="filter.gf"></md-switch>
            <label for="movies">Выберите жанр</label> 
            <md-select v-model="filter.genres" name="movies" id="movies" multiple>
                <md-option v-for="i of GENRES" :key="i.id" :value="i.id">{{i.name}}</md-option>
            </md-select>
        </md-field>
   
        <md-card-actions class="col-12 row justify-content-center">
            <md-button @click="$emit('fs', filter)" class="md-raised md-accent col-12">Подобрать <i class="fa fa-filter"></i></md-button>
        </md-card-actions>

    </md-card-content >
</md-card>
</template>

<script>
import {mapGetters} from 'vuex';
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
	name: 'MyFilter',
    components: {
      VueSlider
    },
    computed: {
        ...mapGetters(['GENRES']),
	},
	data () {
		return {
            min_year:1970,
            max_year:2020,
            filter:{
                year: [1970,2020],
                genres:[],
                gf: false,
            }
		}
    },
    methods:{
       
    }

}

</script>


<style >
.gf{
    position: absolute !important;
    margin: 0  !important;
    right: 0;
    top: 0;
}

.vue-slider-dot-handle {
	border: 1px solid rgba(0,0,0,.2);
	box-shadow: 0 2px 0 0 rgba(0,0,0,.04);
	position: absolute !important;
    top: -20% !important;
	height: 135% !important;
	border-radius: 5px !important;
}
.vue-slider-process{
	background-color: var(--main-red);
}
.vue-slider-dot-tooltip-inner {
    font-size: 12px;
    padding: 0px 5px;
    color: #555;
    border: 1px solid rgba(0,0,0,.2);
    background-color: #fff;
}
</style>