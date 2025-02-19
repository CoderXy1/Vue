<template>
  <div id="app">
    <van-popup v-model:show="showPopup" closeable position="left" :style="{width: '60%',height: '100%' }">
      <div>
        123
      </div>
    </van-popup>
    <van-sticky>
      <van-nav-bar :title="title" >
        <template #left>
          <van-icon name="bars" size="18" @click="this.showPopup = true"/>
        </template>
        <template #right>
          <van-icon name="plus" size="18" @click="this.show = true"/>
        </template>
      </van-nav-bar>
    </van-sticky>
    <router-view></router-view>
    <keep-alive>
      <van-tabbar route v-model="active">
        <van-tabbar-item icon="home-o" to="/Mobile/Home">首页</van-tabbar-item>
        <van-tabbar-item icon="apps-o" to="/Mobile/Application">应用</van-tabbar-item>
        <van-tabbar-item icon="music-o" to="/Mobile/Multimedia">媒体</van-tabbar-item>
        <van-tabbar-item icon="contact-o">我的</van-tabbar-item>
      </van-tabbar>
    </keep-alive>
    <van-action-sheet v-model:show="show" cancel-text="取消" :actions="actions" @select="onSelect" title="新增" />
  </div>
</template>

<script>

import { ref } from 'vue';

export default {
  name: 'App',
  data(){
    return {
      title : '首页',
      active : ref('/Home'),
      show : ref(false),
      actions : [
        { name: '相册', color: '#1989fa' },
        { name: '便签', color: '#1989fa' },
        { name: '日记', color: '#1989fa' },
        { name: '文件', color: '#1989fa' },
      ],
      showPopup : ref(false),
    };
  },
  methods:{
    onSelect(action){
      if (action.name === '相册') {
        this.$router.push({path:'/Mobile/Application/Edit/Gallery',query:{galleryId:''}});
      } else if (action.name === '便签') {
        this.$router.push({path:'/Mobile/Application/Edit/Note',query:{noteId:''}});
      } else if (action.name === '日记') {
        this.$router.push({path:'/Mobile/Application/Edit/Diary',query:{diaryId:''}});
      } else if (action.name === '文件') {
        this.$router.push({path:'/Mobile/Application/Edit/File'});
      }
      this.show = false; // 关闭 Actionsheet
    }
  },
  watch: {
    '$route'(to) {
      this.title = to.meta.title;
      this.active = to.path;
    }
  },
  mounted() {

  }
}
</script>

<style>

</style>
