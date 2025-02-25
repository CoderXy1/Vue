<template>
  <div>
    <van-search v-model="searchKey" shape="round" placeholder="请输入视频关键词" @search="onSearch"/>
    <div style="padding-bottom: 3rem;margin-top: 0.3rem" >
      <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height: 30rem;">
        <van-list
            v-model:loading="loading"
            v-model:error="error"
            :finished="finished"
            finished-text="没有更多了"
            error-text="请求失败，点击重新加载"
            @load="onLoad"
        >
          <van-grid :border="false" :column-num="2" style="padding: 0px">
            <van-grid-item v-for="video in videoList" :key="video">
              <div class="video-container" style="border-radius: 8px"
                   @click="this.$router.push({path:'/Mobile/multimedia/detail/Video',query:{videoId:video.videoId}});">
                <video ref="video" class="video-element">
                  <source :src="video.fileUrl">
                </video>
              </div>
              <div style="width: 100%;margin-top: 5px">
                <van-row  style="font-size: 16px">
                  <van-col span="15">
                    <van-text-ellipsis :content="video.title" rows="1" style="color: darkslateblue"/>
                  </van-col>
                  <van-col span="6" style="font-size: 14px">
                    <span><van-icon name="orders-o"/>{{video.playCount}}</span>
                  </van-col>
                  <van-col span="3" style="text-align: right">
                    <van-popover :actions="actions" @select="onSelect($event,video.videoId)" placement="bottom-end">
                      <template #reference>
                        <font-awesome-icon icon="ellipsis-v"/>
                      </template>
                    </van-popover>
                  </van-col>
                </van-row>
              </div>
            </van-grid-item>
          </van-grid>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>

import {ref} from "vue";
import axios from "axios";
import config from "@/config";
import {closeToast, showConfirmDialog, showFailToast, showSuccessToast} from "vant";

export default {
  name: "VideoPage",
  data(){
    return {
      searchKey : ref(''),
      pageNum : ref(1),
      pageSize : ref(10),
      videoList : ref([]),
      loading : ref(false),
      finished : ref(false),
      refreshing : ref(false),
      error : ref(false),
      showPopover : ref(false),
      actions : [
        { text: '删除',color: 'red' },
      ],
    }
  },
  methods : {
    getVideoList(){
      const params = {
        pageNum : this.pageNum,
        pageSize : this.pageSize,
        searchKey : this.searchKey,
      }
      axios.post(config.apiBaseUrl+'/video/queryList',params)
          .then(response => {
            this.pageNum = this.pageNum + 1;
            if (response.data.data.length < 1)
              this.finished = true;
            else{
              response.data.data.forEach((item) => {
                this.videoList.push(item);
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
        this.videoList = ref([]);
        this.pageNum = 1;
        this.refreshing = false;
      }

      this.error = false;
      this.loading = true;
      this.getVideoList();

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
    onSelect(action,videoId){
      if (action.text === '删除'){
        this.deleteVideo(videoId);
      }
    },
    deleteVideo(videoId) {
      showConfirmDialog({
        title: '确认',
        message:
            '是否确定删除？',
      }).then(() => {
        axios.post(config.apiBaseUrl + '/video/delete', {
          videoId: videoId,
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
  }
}
</script>

<style scoped>
.video-container {
  width: 100%; /* 设置容器宽度 */
  height: 5rem; /* 设置容器高度 */
  overflow: hidden; /* 隐藏超出容器的部分 */
}
.video-element {
  width: 100%; /* 视频宽度占满容器 */
  height: 100%; /* 视频高度占满容器 */
  object-fit: cover; /* 保持视频比例并覆盖整个容器 */
}
/deep/.van-grid-item .van-grid-item__content {
  padding: 0.3rem;
}
</style>