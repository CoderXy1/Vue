<template>
  <div>
    <video-player
        class="video-player"
        :options="playerOptions"
        :src="fileUrl" >
    </video-player>
    <div style="margin-top: 1rem">
      <van-row justify="center">
        <van-col span="15">
          <van-text-ellipsis :content="title" rows="1" style="color: darkslateblue"/>
        </van-col>
        <van-col span="6" >
          <span><van-icon name="orders-o"/>{{playCount}}</span>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>

import {ref} from "vue";
import axios from "axios";
import config from "@/config";
import {closeToast, showConfirmDialog, showFailToast, showSuccessToast} from "vant";

export default {
  name: "VideoDetailPage",
  data(){
    return {
      title : ref(''),
      playCount : ref(0),
      fileUrl : ref(''),
      videoId : ref(this.$route.query.videoId),
      playerOptions : ref({
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controls: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      })
    }
  },
  methods : {
    getVideo(){
      if (this.videoId === undefined || this.videoId === ''){
        return;
      }
      this.imgReadonly = true;
      axios.post(config.apiBaseUrl+'/video/querySingle', {
        videoId : this.videoId
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.title = response.data.data.title;
        this.fileUrl = response.data.data.fileUrl;
        this.playCount = response.data.data.playCount;
      }).catch(error => {
        showFailToast(error.message);
        console.error(error);
      })
    },
  },mounted() {
    this.getVideo();
  }
}
</script>

<style scoped>
.video-player{
  width: 100%; /* 设置宽度 */
  height: 160px; /* 设置高度 */
}
</style>