<template>
  <div>
  <van-search v-model="searchKey" shape="round" placeholder="请输入便签关键词" @search="onSearch"/>
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
        <van-swipe-cell v-for="note in noteList" :key="note" style="min-height: 3rem">
            <van-cell :border="true" size="large"
                      :style="{ color: note.noteColor}">
              <template #title>
                <van-icon name="label-o" class="label-o" />
                <span style="font-size: 18px">{{note.noteTitle}}</span>
              </template>
              <template #value>
                <span style="font-size: 10px">{{note.createDate}}</span>
              </template>
              <template #label>
                <van-text-ellipsis :content="note.content" rows="2" />
              </template>
            </van-cell>
          <template #right>
            <van-button text="编辑" type="success" @click="this.$router.push({path:'/Mobile/Application/Edit/Note',query:{noteId:note.noteId}});"/>
            <van-button text="删除" type="danger" @click="deleteNote(note.noteId)"/>
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
import {showConfirmDialog, showSuccessToast, showFailToast, closeToast} from 'vant';

export default {
  name: "NotePage",
  data(){
    return{
      searchKey : ref(''),
      pageNum : ref(1),
      pageSize : ref(10),
      noteList : ref([]),
      loading : ref(false),
      finished : ref(false),
      refreshing : ref(false),
      error : ref(false),
    }
  },methods:{
    getNoteList(){
      const params = {
        pageNum : this.pageNum,
        pageSize : this.pageSize,
        searchKey : this.searchKey,
      }
      axios.post(config.apiBaseUrl+'/note/queryList',params)
          .then(response => {
            this.pageNum = this.pageNum + 1;
            if (response.data.data.length < 1)
              this.finished = true;
            else{
              response.data.data.forEach((item) => {
                this.noteList.push(item);
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
        this.noteList = ref([]);
        this.pageNum = 1;
        this.refreshing = false;
      }

      this.error = false;
      this.loading = true;
      this.getNoteList();

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
    deleteNote(noteId){
      showConfirmDialog({
        title: '确认',
        message:
            '是否确定删除？',
      }).then(() => {
        axios.post(config.apiBaseUrl+'/note/delete', {
          noteId : noteId,
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
  },mounted() {

  }
};
</script>

<style scoped>

</style>