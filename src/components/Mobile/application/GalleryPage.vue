<template>
  <div>
  <van-search v-model="searchKey" shape="round" placeholder="请输入相册关键词" @search="onSearch"/>
  <van-image-preview />
  <div style="padding-bottom: 3rem;margin-top: 0.3rem">
    <van-pull-refresh v-model="refreshing" @refresh="onRefresh" style="min-height: 30rem;">
      <van-list
          v-model:loading="loading"
          v-model:error="error"
          :finished="finished"
          finished-text="没有更多了"
          error-text="请求失败，点击重新加载"
          @load="onLoad"
      >
        <van-grid :border="false" :column-num="3"  style="padding: 0px">
          <van-grid-item v-for="gallery in galleryList" :key="gallery">
            <van-image :src="gallery.fileUrl" fit="cover" @click="showImage(gallery.fileUrl)" style="width: 100%;height: 8rem"
                       @touchstart="handleTouchStart(gallery.galleryId,gallery.fileId)" @touchend="handleTouchEnd"/>
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
    <van-action-sheet v-model:show="showMenu" cancel-text="取消" :actions="actions" @select="onSelect" />
  </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { ref } from 'vue';
import {showImagePreview, showConfirmDialog, closeToast, showSuccessToast, showFailToast} from "vant";

export default {
  name: "GalleryPage",
  data(){
    return {
      searchKey : ref(''),
      pageNum : ref(1),
      pageSize : ref(10),
      galleryList : ref([]),
      loading : ref(false),
      finished : ref(false),
      refreshing : ref(false),
      error : ref(false),
      showMenu : ref(false),
      actions : [
        { name: '编辑', color: '#07c160' },
        { name: '删除', color: '#ee0a24' },
      ],
      editParams : {
        galleryId : '',
        fileId : ''
      },
    }
  },
  methods:{
    getGalleryList(){
      const params = {
        pageNum : this.pageNum,
        pageSize : this.pageSize,
        searchKey : this.searchKey,
      }
      axios.post(config.apiBaseUrl+'/gallery/queryList',params)
          .then(response => {
            this.pageNum = this.pageNum + 1;
            if (response.data.data.length < 1)
              this.finished = true;
            else{
              response.data.data.forEach((item) => {
                this.galleryList.push(item);
              })
            }
            this.loading = false;
            this.refreshing = false;
          })
          .catch(error => {
            this.loading = false;
            this.refreshing = false;
            this.error = true;
            console.error(error);
          })
    },
    onLoad(){
      if (this.refreshing) {
        this.galleryList = ref([]);
        this.pageNum = 1;
        this.refreshing = false;
      }

      this.error = false;
      this.loading = true;
      this.getGalleryList();

    },
    onRefresh(){
      // 清空列表数据
      this.finished = false;
      this.onLoad();
    },
    showImage(ImageUrl){
      const ImageUrlList = [];
      this.galleryList.forEach((item) => {
        ImageUrlList.push(item.fileUrl);
      })
      showImagePreview({
        images: ImageUrlList,
        closeable: true,
        startPosition: ImageUrlList.indexOf(ImageUrl),
      });
    },
    handleTouchStart(galleryId,fileId) {
      this.timer = setTimeout(() => {
        this.editParams.galleryId = galleryId;
        this.editParams.fileId = fileId;
        this.onLongPress(); // 触发长按事件处理函数
      }, 500); // 500毫秒后触发长按事件（可根据需要调整时间）
    },
    handleTouchEnd() {
      clearTimeout(this.timer); // 清除定时器以避免触发长按事件（触摸结束时）
    },
    onLongPress() {
      this.showMenu = true;
    }
    ,onSelect(action){
      if (action.name === '编辑') {
        this.$router.push({path:'/Mobile/Application/Edit/Gallery',query:{galleryId:this.editParams.galleryId}});
      } else if (action.name === '删除') {
        showConfirmDialog({
          title: '确认',
          message:
              '是否确定删除？',
        }).then(() => {
          axios.post(config.apiBaseUrl+'/gallery/delete', {
            galleryId : this.editParams.galleryId,
          },{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }).then(response => {
            if (response.data.code == 200){
              closeToast();
              showSuccessToast('删除成功！');
              setTimeout(() => {
                this.finished = false;
                this.refreshing = true;
                this.onLoad();
              }, 1000);
            }else {
              showFailToast(response.data.msg);
            }
          }).catch(error => {
            showFailToast(error.message);
            console.error(error);
          })
        }).catch(() => {
        });
      }
      this.showMenu = false; // 关闭 Actionsheet
    },
    onSearch(){
      this.finished = false;
      this.refreshing = true;
      this.onLoad();
    }
  },
  mounted() {

  }
};


</script>

<style scoped>
  /deep/.van-grid-item .van-grid-item__content {
    padding: 3px;
  }
</style>