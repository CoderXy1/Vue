<template>
  <van-row justify="center">
    <van-swipe :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(gallery,index) in galleryList" :key="index">
        <van-image :src="gallery.fileUrl" :title="gallery.galleryDescribe" :alt="gallery.galleryName"
                   width="100%" height="12rem" fit="cover">
        </van-image>
      </van-swipe-item>
    </van-swipe>
  </van-row>

  <van-grid :border="false" :column-num="4">
    <van-grid-item to="/Mobile/Application/Gallery">
      <img class="imgMenu" src="@/assets/icon/photo.svg" alt="icon">
      <span class="spanMenu">相册</span>
    </van-grid-item>
    <van-grid-item to="/Mobile/Application/Note">
      <img class="imgMenu" src="@/assets/icon/note.svg" alt="icon">
      <span class="spanMenu">便签</span>
    </van-grid-item>
    <van-grid-item to="/Mobile/Application/Diary">
      <img class="imgMenu" src="@/assets/icon/diary.svg" alt="icon">
      <span class="spanMenu">日记</span>
    </van-grid-item>
    <van-grid-item to="/Mobile/Application/File">
      <img class="imgMenu" src="@/assets/icon/file.svg" alt="icon">
      <span class="spanMenu">文件</span>
    </van-grid-item>
  </van-grid>

  <!--<van-row justify="space-around">
    <van-col span="6" style="text-align: center">
      <img class="imgMenu" src="@/assets/icon/photo.svg" alt="icon">
      <span>图片</span>
    </van-col>
    <van-col span="6" style="text-align: center">
      <img class="imgMenu" src="@/assets/icon/note.svg" alt="icon">
    </van-col>
    <van-col span="6" style="text-align: center">
      <img class="imgMenu" src="@/assets/icon/diary.svg" alt="icon">
    </van-col>
    <van-col span="6" style="text-align: center">
      <img class="imgMenu" src="@/assets/icon/file.svg" alt="icon">
    </van-col>
  </van-row>-->


</template>

<script>

import axios from 'axios';
import config from "@/config";

export default {
  name: "HomePage",
  data(){
    return {
      galleryList : [],
    }
  },
  methods:{
    getGalleryList(){
      const params = {
        pageNum : 1,
        pageSize : 5,
        searchKey : '',
      }
      axios.post(config.apiBaseUrl+'/gallery/queryList',params)
          .then(response => {
            this.galleryList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
  },
  mounted() {
    this.getGalleryList();
  }
}
</script>

<style>
.imgMenu{
  width: 4rem;
  height: 4rem;
}
.spanMenu{
  font-size: 14px;
  color: gray
}
</style>