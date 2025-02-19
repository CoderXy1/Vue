<template>
  <keep-alive>
      <van-tabs v-model:active="active" animated>
        <van-tab title="相册" to="/Mobile/Application/Gallery" name="Gallery"></van-tab>
        <van-tab title="便签" to="/Mobile/Application/Note" name="Note"></van-tab>
        <van-tab title="日记" to="/Mobile/Application/Diary" name="Diary"></van-tab>
        <van-tab title="文件" to="/Mobile/Application/File" name="File"></van-tab>
      </van-tabs>
  </keep-alive>
  <router-view style="min-height: 30rem"></router-view>
  <van-back-top bottom="4rem"/>
</template>

<script>

import { ref } from 'vue';

export default {
  name: 'ApplicationPage',
  data(){
    return {
      active : ref(window.location.pathname.split('/').at(-1))
    };
  },
  watch: {
    '$route'(to) {
      if (to.path.toString().indexOf('Gallery') > 0){
        this.active = 'Gallery';
      }else if (to.path.toString().indexOf('Note') > 0){
        this.active = 'Note';
      }else if (to.path.toString().indexOf('Diary') > 0){
        this.active = 'Diary';
      }else if (to.path.toString().indexOf('File') > 0){
        this.active = 'File';
      }
    }
  }
}

</script>

<style scoped>

</style>
