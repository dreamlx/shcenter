<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
import Layout from './views/layout/layout';
export default {
    name: 'App',
    components: {
        Layout   
    },
    methods:{
    }
};
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
}
.ivu-tabs{
    min-height: 400px;
}
.ivu-select-dropdown{
    min-width: 200px !important;
}
</style>
