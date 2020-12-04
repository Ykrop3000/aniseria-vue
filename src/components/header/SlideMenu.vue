<template>
    <Slide :closeOnNavigation = "true" >
      <div class="nav">
        <Nav/>
      </div>
    </Slide>
</template>

<script>
import { Slide } from 'vue-burger-menu'  // import the CSS transitions you wish to use, in this case we are using `Slide`
import Nav from './Nav'
export default {
    components: {
        Slide, // Register your component
        Nav
    }
}
</script>
<style>
  .bm-menu{
    background-color: #2f3645 !important;
  }
  .line-style {
    border-radius: 2px;
    height: 12%;
  }
</style>