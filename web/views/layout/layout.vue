
<template>
    <div class="layout">
         <router-view></router-view>
    </div>
</template>
<script>
import { mapState } from 'vuex';
export default {
    data() {
        return {
            roles: [],
            year: new Date().getFullYear()
        };
    },
    computed: {
    },
    watch:{
        // $route (to, from) {
        //     this.currentRouter=to.name;
        // }
    },
    created() {
     
    },
    methods: {
     
    }
};
</script>
