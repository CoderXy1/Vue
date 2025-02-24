<template>
  <div>
    <van-search v-model="searchKey" shape="round" placeholder="请输入音乐关键词" @search="onSearch"/>
    <div style="padding-bottom: 3rem;margin-top: 0.3rem" >
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height: 30rem;">
        <van-list
            v-model:loading="loading"
            v-model:error="error"
            :finished="finished"
            finished-text="没有更多了"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
            ref="lists"
        >
          <van-swipe-cell v-for="audio in audioList" :key="audio" style="min-height: 3rem">
            <van-cell :id="audio.audioName" :border="true" size="large" @click="playingAudio(audio.fileUrl,audio.audioId,audio.audioName)">
              <template #title>
                <span style="font-size: 18px;margin-right: 0.3rem">{{audio.audioName}}</span>
                <van-icon name="like" color="#ee0a24" v-if="audio.isLove === 1"/>
                <van-icon name="like-o" v-else/>
              </template>
              <template #value>
                <van-icon name="service-o" color="#1989fa" size="1.2rem" v-if="playingAudioId === audio.audioId"/>
              </template>
              <template #label>
                <van-text-ellipsis :content="audio.singer" rows="2" />
              </template>
            </van-cell>
            <template #right>
              <van-button style="height: 100%;" text="编辑" type="success" @click="this.$router.push({path:'/Mobile/multimedia/Edit/Audio',query:{audioId:audio.audioId,readOnly:'false'}});"/>
              <van-button style="height: 100%;" text="删除" type="danger" @click="deleteAudio(audio.audioId)"/>
            </template>
          </van-swipe-cell>
        </van-list>
      </van-pull-refresh>
    </div>
    <van-sticky :offset-bottom="50" position="bottom">
       <audio controls style="width: 100%" ref="audio" :src="playingAudioUrl"></audio>
    </van-sticky>
    <van-floating-bubble
        axis="xy"
        icon="aim"
        magnetic="x"
        @click="scrollToElement()"
        v-model:offset="offset"
        v-if="audioList.length > 10"
        style="width: 2rem;height: 2rem;background-color: lightgray"
    />
  </div>
</template>

<script>

import {ref} from "vue";
import axios from "axios";
import config from "@/config";
import {closeToast, showConfirmDialog, showFailToast, showSuccessToast} from "vant";


export default {
  name: "AudioPage",
  data(){
    return {
      searchKey : ref(''),
      pageNum : ref(1),
      pageSize : ref(10),
      audioList : ref([]),
      loading : ref(false),
      finished : ref(false),
      refreshing : ref(false),
      error : ref(false),
      playingAudioUrl : ref(''),
      playingAudioId : ref(''),
      playingAudioName : ref(''),
      offset : ref({ x: -50, y: 450 }),
    }
  },
  methods : {
    getAudioList(){
      const params = {
        pageNum : this.pageNum,
        pageSize : this.pageSize,
        searchKey : this.searchKey,
      }
      axios.post(config.apiBaseUrl+'/audio/queryList',params)
          .then(response => {
            this.pageNum = this.pageNum + 1;
            if (response.data.data.length < 1)
              this.finished = true;
            else{
              response.data.data.forEach((item) => {
                this.audioList.push(item);
              })
            }
            this.loading = false;
            this.refreshing = false;
          })
          .catch(error => {
            this.loading = false;
            this.refreshing = false;
            this.error = true;
            showFailToast(error.msg);
            console.error(error);
          })
    },
    onLoad(){
      if (this.refreshing) {
        this.audioList = ref([]);
        this.pageNum = 1;
        this.refreshing = false;
      }

      this.error = false;
      this.loading = true;
      this.getAudioList();

    },
    onRefresh(){
      // 清空列表数据
      this.finished = false;
      this.onLoad();
    },
    onSearch(){
      this.finished = false;
      this.refreshing = true;
      this.onLoad();
    },
    playingAudio(url,audioId,audioName){
      this.$refs.audio.src = url;
      this.$refs.audio.play();
      this.playingAudioId = audioId;
      this.playingAudioName = audioName;
    },
    deleteAudio(audioId) {
      showConfirmDialog({
        title: '确认',
        message:
            '是否确定删除？',
      }).then(() => {
        axios.post(config.apiBaseUrl + '/audio/delete', {
          audioId: audioId,
        }, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          if (response.data.code == 200) {
            closeToast();
            showSuccessToast('删除成功！');
            setTimeout(() => {
              this.finished = false;
              this.refreshing = true;
              this.onLoad();
            }, 1000);
          } else {
            showFailToast(response.data.msg);
          }
        }).catch(error => {
          showFailToast(error.message);
          console.error(error);
        })
      }).catch(() => {
      });
    },
    scrollToElement() {
      if (!(this.playingAudioName === undefined || this.playingAudioName === ''))
        this.$scrollTo('#'+this.playingAudioName, 500, { offset: -60 });
    },
  }
}
</script>

<style scoped>

</style>