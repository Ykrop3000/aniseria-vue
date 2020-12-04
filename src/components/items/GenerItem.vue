<template>
    <router-link :to="{name:'gener',params:{slug:gener.slug}}"> {{gener.name}},  </router-link>
</template>

<script>
export default {
    props:['j','geners'],
    computed: {
        gener: function (){
            return this.geners.find(geners => geners.id === this.j);
        },
    },
}
</script>