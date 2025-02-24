<template>
  <div>
    <van-search v-model="searchKey" shape="round" placeholder="请输入日记关键词" @search="onSearch"/>
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
          <van-swipe-cell v-for="diary in diaryList" :key="diary" style="min-height: 3rem">
            <van-cell :border="true" size="large" @click="this.$router.push({path:'/Mobile/Application/Edit/Diary',query:{diaryId:diary.diaryId,readOnly:'true'}});">
              <template #title>
                <div class="flex-container">
                  <van-image
                      radius="10px"
                      width="3.5rem"
                      height="3.5rem"
                      fit="cover"
                      :src="diary.fileUrl"
                  />
                  <div :style="{maxWidth: '10rem',marginLeft:'1rem',marginRight:'0.5rem'}">
                    <van-text-ellipsis :content="diary.title" rows="1" />
                    <div style="font-size: 14px">
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
            <template #right>
              <van-button style="height: 100%;" text="编辑" type="success" @click="this.$router.push({path:'/Mobile/Application/Edit/Diary',query:{diaryId:diary.diaryId,readOnly:'false'}});"/>
              <van-button style="height: 100%;" text="删除" type="danger" @click="deleteDiary(diary.diaryId)"/>
            </template>
          </van-swipe-cell>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { ref } from 'vue';
import {showImagePreview, showConfirmDialog, closeToast, showSuccessToast, showFailToast} from "vant";
import { format } from 'date-fns';

export default {
  name: "DiaryPage",
  data(){
    return {
      searchKey : ref(''),
      pageNum : ref(1),
      pageSize : ref(10),
      diaryList : ref([]),
      loading : ref(false),
      finished : ref(false),
      refreshing : ref(false),
      error : ref(false),
    }
  },
  methods : {
    getDiaryList(){
      const params = {
        pageNum : this.pageNum,
        pageSize : this.pageSize,
        searchKey : this.searchKey,
      }
      axios.post(config.apiBaseUrl+'/diary/queryList',params)
          .then(response => {
            this.pageNum = this.pageNum + 1;
            if (response.data.data.length < 1)
              this.finished = true;
            else{
              response.data.data.forEach((item) => {
                this.diaryList.push(item);
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
        this.diaryList = ref([]);
        this.pageNum = 1;
        this.refreshing = false;
      }

      this.error = false;
      this.loading = true;
      this.getDiaryList();

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
    deleteDiary(diaryId){
      showConfirmDialog({
        title: '确认',
        message:
            '是否确定删除？',
      }).then(() => {
        axios.post(config.apiBaseUrl+'/diary/delete', {
          diaryId : diaryId,
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
    },
    formatDate(strDate){
      return format(strDate,'yyyy-MM-dd');
    }
  }
}
</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center; /* 垂直居中 */
  height: 5rem; /* 指定一个高度 */
}
</style>