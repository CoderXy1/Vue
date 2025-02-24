<template>
  <van-form @submit="onSubmit" style="padding-top: 2rem;padding-bottom: 3rem">
    <van-field
        v-model="title"
        name="title"
        label="视频名称"
        placeholder="视频名称"
        :rules="[{ required: true, message: '请填写视频名称' }]"
        autocomplete="off"
        :clearable=true
        autosize
        required
    />
    <van-field name="uploader" label="视频上传" required :rules="[{ required: true, message: '请选择视频文件' }]">
      <template #input>
        <van-uploader v-model="fileUrl" accept="video/*" max-count="1" :after-read="afterRead"/>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button round block native-type="submit" type="primary">提交</van-button>
    </div>
  </van-form>
</template>

<script>

import {ref} from "vue";
import {closeToast, showFailToast, showLoadingToast, showSuccessToast} from "vant";
import axios from "axios";
import config from "@/config";

export default {
  name: "VideoEditPage",
  data(){
    return {
      title : ref(''),
      fileUrl : ref([]),
      uploadFile : ref(''),
    }
  },
  methods : {
    onSubmit(values){
      showLoadingToast({
        message: '提交中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      });
      this.insert(values);
    },afterRead(file) {
      this.uploadFile = file.file;
    },insert(values){
    axios.post(config.apiBaseUrl+'/file/insert', {file : this.uploadFile},{
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).then(response => {
      if (response.data.code == 200){
        axios.post(config.apiBaseUrl+'/video/insert', {
          title : values.title,
          fileID : response.data.data
        },{
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          if (response.data.code == 200){
            closeToast();
            showSuccessToast('提交成功！');
            setTimeout(() => {
              this.$router.push('/Mobile/multimedia/video');
            }, 1000);
          }else {
            showFailToast(response.data.msg);
          }
        }).catch(error => {
          showFailToast(error.message);
          console.error(error);
        })
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