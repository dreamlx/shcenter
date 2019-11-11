<template>
  <div id="notFound" >
    <div class="text-center col-sm-12">
      <h1>404 You are lost.</h1>
      <h4>This page doesn't exist.</h4>
    </div>
  </div>
</template>
<script>
export default {
    name: 'NotFound',
    data(){
  	return{
  		show:true
  	};
    },
    beforeCreate(){
    //console.log(this.$options.render);
    },
};
</script>

<style>
#notFound {
  padding: 10em;
  text-align: center;
}
</style>