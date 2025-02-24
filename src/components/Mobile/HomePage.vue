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

  <van-cell-group style="min-height: 3rem;padding-bottom: 3rem;">
    <van-cell v-for="diary in diaryList" :key="diary"  :border="true" size="large"
              @click="this.$router.push({path:'/Mobile/Application/Edit/Diary',query:{diaryId:diary.diaryId,readOnly:'true'}});">
      <template #title>
        <div class="flex-container">
          <van-image
              radius="10px"
              width="4rem"
              height="4rem"
              fit="cover"
              :src="diary.fileUrl"
          />
          <div :style="{maxWidth: '10rem',marginLeft:'1rem',marginRight:'0.5rem'}">
            <van-text-ellipsis :content="diary.title" rows="1" />
            <div style="font-size: 18px">
              <font-awesome-icon icon="sun" style="color: orange;" v-if="diary.weather === '晴'"/>
              <font-awesome-icon icon="cloud-rain" style="color: deepskyblue;" v-else-if="diary.weather === '雨'"/>
              <font-awesome-icon icon="cloud-sun" style="color: lightsalmon;" v-else-if="diary.weather === '晴转多云'"/>
              <font-awesome-icon icon="cloud" style="color: gray;" v-else-if="diary.weather === '多云'"/>
              <font-awesome-icon icon="thunderstorm" style="color: dodgerblue;" v-else-if="diary.weather === '雷阵雨'"/>
              <span style="margin-left: 1rem;color: lightblue">{{diary.temperature}}℃</span>
            </div>
            <van-rate v-model="diary.luckyValue" :size="13" color="#ffd21e" void-icon="star" void-color="#eee" readonly/>
          </div>
        </div>
      </template>
      <template #value>
        <span style="font-size: 10px">{{formatDate(diary.createDate)}}</span>
      </template>
      <template #label>
        <van-text-ellipsis style="width: 15rem" expand-text="展开" collapse-text="收起"  :content="diary.content" rows="2" />
      </template>
    </van-cell>
  </van-cell-group>
</template>

<script>

import axios from 'axios';
import config from "@/config";
import { format } from 'date-fns';

export default {
  name: "HomePage",
  data(){
    return {
      galleryList : [],
      diaryList : [],
      params : {
        pageNum : 1,
        pageSize : 5,
        searchKey : '',
      },
    }
  },
  methods:{
    getGalleryList(){
      axios.post(config.apiBaseUrl+'/gallery/queryList',this.params)
          .then(response => {
            this.galleryList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
    getDiaryList(){
      axios.post(config.apiBaseUrl+'/diary/queryList',this.params)
          .then(response => {
            this.diaryList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
    formatDate(strDate){
      return format(strDate,'yyyy-MM-dd');
    },
  },
  mounted() {
    this.getGalleryList();
    this.getDiaryList();
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
.flex-container {
  display: flex;
  align-items: center; /* 垂直居中 */
  height: 5rem; /* 指定一个高度 */
}
</style>