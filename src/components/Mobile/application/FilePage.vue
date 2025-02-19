<template>
  <div>
    <van-calendar v-model:show="showCalendar" type="range" @confirm="onConfirm" switch-mode="year-month" :min-date="minDate" :max-date="maxDate"/>
    <van-dropdown-menu ref="menuRef">
        <van-dropdown-item v-model="fileType" :options="fileTypeList" @change="onSearch"/>
        <van-dropdown-item title="筛选" ref="itemRef">
          <van-field
              v-model="fileName"
              name="文件名"
              label="文件名"
              placeholder="文件名"
              autocomplete="off"
              @change="onSearch"
          />
          <van-cell title="选择日期区间" :value="searchDate" @click="showCalendar = true" is-link/>
          <div style="padding: 5px 16px;">
            <van-button type="primary" block round @click="clearConditions">清除条件</van-button>
          </div>
        </van-dropdown-item>
    </van-dropdown-menu>
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
          <van-cell-group v-for="file in fileList" :key="file" style="min-height: 3rem">
            <van-cell :border="true" size="large" center>
              <template #title>
                <div class="flex-container">
                  <van-image
                      width="4rem"
                      height="4rem"
                      fit="cover"
                      :src="file.fileUrl"
                      v-if="file.fileType.includes('image')"
                  />
                  <img
                      style="width: 4rem;height: 4rem"
                      fit="cover"
                      src="@/assets/img/file.png"
                      v-else
                  />
                  <van-text-ellipsis expand-text="展开" collapse-text="收起" :content="file.fileName" rows="1" style="margin-left: 1rem;margin-right: 0.5rem;max-width: 10rem"/>
                  <van-tag plain type="primary" style="font-size: 10px;">
                    <van-text-ellipsis :content="file.fileType" rows="1" style="max-width: 4rem"/>
                  </van-tag>
                </div>
              </template>
              <template #right-icon>
                <a :href="file.fileType" :download="file.fileName">
                  <font-awesome-icon icon="arrow-circle-down" :style="{color:'#07c160',fontSize:'1.2rem',paddingRight:'1rem'}" />
                </a>
              </template>
            </van-cell>
          </van-cell-group>
        </van-list>
      </van-pull-refresh>
    </div>
  </div>
</template>

<script>

import axios from "axios";
import config from "@/config";
import { ref } from 'vue';
import { showFailToast } from 'vant';

export default {
  name: "FilePage",
  data(){
    return{
      searchKey : ref(''),
      pageNum : ref(1),
      pageSize : ref(10),
      fileList : ref([]),
      loading : ref(false),
      finished : ref(false),
      refreshing : ref(false),
      error : ref(false),
      fileType : ref(''),
      fileTypeList : ref([]),
      searchDate : ref(''),
      startDate : ref(''),
      endDate : ref(''),
      showCalendar : ref(false),
      minDate : new Date(2025, 0, 1),
      maxDate : new Date(),
      fileName : ref(''),
    }
  },methods:{
    getFileTypeList(){
      axios.post(config.apiBaseUrl+'/file/queryTypes')
          .then(response => {
            this.fileTypeList = response.data.data;
            this.getFileList();
          })
          .catch(error => {
            showFailToast(error.msg);
            console.error(error);
          })
    },
    getFileList(){
      const params = {
        pageNum : this.pageNum,
        pageSize : this.pageSize,
        fileType : this.fileType,
        startDate : this.startDate,
        endDate : this.endDate,
        fileName : this.fileName,
      }
      axios.post(config.apiBaseUrl+'/file/queryList',params)
          .then(response => {
            this.pageNum = this.pageNum + 1;
            if (response.data.data.length < 1)
              this.finished = true;
            else{
              response.data.data.forEach((item) => {
                this.fileList.push(item);
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
        this.fileList = ref([]);
        this.pageNum = 1;
        this.refreshing = false;
      }

      this.error = false;
      this.loading = true;
      this.getFileTypeList();

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
    onConfirm(Values){
      this.showCalendar = false;
      [this.startDate,this.endDate] = Values;
      this.searchDate = `${this.startDate.getMonth() + 1}/${this.startDate.getDate()}`+
          '-' + `${this.endDate.getMonth() + 1}/${this.endDate.getDate()}`;
      this.onSearch();
    },
    clearConditions(){
      this.searchDate = '';
      this.startDate = '';
      this.endDate = '';
      this.fileName = '';
      this.onSearch();
      this.$refs.menuRef.close();
    }
  },mounted() {

  }
};
</script>

<style scoped>
.flex-container {
  display: flex;
  align-items: center; /* 垂直居中 */
  height: 5rem; /* 指定一个高度 */
}
</style>