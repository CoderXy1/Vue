<template>
  <keep-alive>
      <van-tabs v-model:active="active" animated>
        <van-tab title="音乐" to="/Mobile/Multimedia/Audio" name="Audio"></van-tab>
        <van-tab title="视频" to="/Mobile/Multimedia/Video" name="Video"></van-tab>
      </van-tabs>
  </keep-alive>
  <router-view style="min-height: 30rem"></router-view>
  <van-back-top bottom="4rem"/>
</template>

<script>

import { ref } from 'vue';

export default {
  name: 'MultimediaPage',
  data(){
    return {
      active : ref(window.location.pathname.split('/').at(-1))
    };
  },
  watch: {
    '$route'(to) {
      if (to.path.toString().indexOf('Audio') > 0){
        this.active = 'Audio';
      }else if (to.path.toString().indexOf('Video') > 0){
        this.active = 'Video';
      }
    }
  }
}
</script>

<style scoped>

</style>
