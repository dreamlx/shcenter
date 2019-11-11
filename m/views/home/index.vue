<template>
  	<div>
        <home-header></home-header>
        <home-banner></home-banner>
        <home-channel></home-channel>
        <home-news-list></home-news-list>
        <home-top-video></home-top-video>
        <home-company-brief></home-company-brief>
        <home-race-info></home-race-info>
        <home-sponsors></home-sponsors>
 	</div>
</template>

<script>
   	import HomeHeader from './home-header';
import HomeBanner from './home-banner';
import HomeChannel from './home-channel';
import HomeNewsList from './home-news-list';
import HomeTopVideo from './home-top-video';
import HomeCompanyBrief from './home-company-brief';
import HomeRaceInfo from './home-race-info';
import HomeSponsors from './home-sponsors';
export default {
    components:{
        HomeHeader,
        HomeBanner,
        HomeChannel,
        HomeNewsList,
        HomeTopVideo,
        HomeCompanyBrief,
        HomeRaceInfo,
        HomeSponsors
    },
    data(){
        return {
                
        };
    },
    created() {
          
    },
    methods: {
          
    }
};
</script>
