<template>
  <van-form @submit="onSubmit" style="padding-top: 2rem;padding-bottom: 3rem">
    <van-field name="uploader" label="文件上传">
      <template #input>
        <van-uploader v-model="files" accept="image/*,application/*,text/*,audio/*" max-count="4"/>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button round block native-type="submit" type="primary">提交</van-button>
    </div>
  </van-form>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { ref } from 'vue';
import {showConfirmDialog, showSuccessToast, showFailToast, closeToast, showLoadingToast} from 'vant';

export default {
  name: "FileEditPage",
  data(){
    return {
      fileList : ref([]),
      files : ref([]),
    }
  },
  methods:{
    onSubmit(values){
      showLoadingToast({
        message: '上传中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      });

      this.files.forEach((file) => {
        this.fileList.push(file.file);
      })

      axios.post(config.apiBaseUrl+'/file/insertList', {fileList : this.fileList},{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.data.code == 200){
          closeToast();
          showSuccessToast('上传成功！');
          setTimeout(() => {
            this.$router.push('/Mobile/Application/File');
          }, 1000);
        }else {
          showFailToast(response.data.msg);
        }
      }).catch(error => {
        showFailToast(error.message);
        console.error(error);
      })
    }
  }
}
</script>

<style scoped>

</style>