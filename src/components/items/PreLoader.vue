<template>
  <div>
    <md-progress-bar md-theme='default' class="md-accent" md-mode="indeterminate"></md-progress-bar>
  </div>
</template>

<script>
  export default {
    name: 'Preloader'
  }
</script>

<style lang='scss' scoped>
  .md-progress-bar {
    margin: 24px;
  }
</style>