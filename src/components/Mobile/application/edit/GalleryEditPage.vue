<template>
  <van-form @submit="onSubmit" style="margin-top: 1rem">
    <van-cell-group inset>
      <van-field
          v-model="galleryName"
          name="galleryName"
          label="图片名称"
          placeholder="图片名称"
          :rules="[{ required: true, message: '请填写图片名称' }]"
          autocomplete="off"
          :clearable=true
          autosize
          required
      />
      <van-field
          v-model="galleryDescribe"
          name="galleryDescribe"
          label="图片描述"
          placeholder="图片描述"
          :rules="[{ required: true, message: '请填写图片描述' }]"
          autocomplete="off"
          :clearable=true
          autosize
          required
      />
      <van-field name="uploader" label="文件上传" required :rules="[{ required: true, message: '请选择图片' }]">
        <template #input>
          <van-uploader v-model="fileUrl" multiple :max-count="1" :after-read="afterRead"
                        :readonly="imgReadonly" :deletable="imgReadonly == false" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script>
import { ref } from 'vue';
import axios from "axios";
import config from "@/config";
import {closeToast, showFailToast, showSuccessToast,showLoadingToast} from "vant";

export default {
  name: "GalleryEditPage",
  data(){
    return {
      galleryName : ref(''),
      galleryDescribe : ref(''),
      fileUrl : ref([]),
      uploadFile : ref(''),
      galleryId : ref(this.$route.query.galleryId),
      imgReadonly : ref(false),
    }
  },methods:{
    onSubmit(values){
      showLoadingToast({
          message: '提交中...',
          forbidClick: true,
          loadingType: 'spinner',
          duration: 0,
        });
      if (this.galleryId === undefined || this.galleryId === ''){
        this.insert(values);
      }else
        this.update(values);

    },afterRead(file) {
      this.uploadFile = file.file;
    },getGallery(){
      if (this.galleryId === undefined || this.galleryId === ''){
          return;
      }
      this.imgReadonly = true;
      axios.post(config.apiBaseUrl+'/gallery/querySingle', {
        galleryId : this.galleryId
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.galleryName = response.data.data.galleryName;
        this.galleryDescribe = response.data.data.galleryDescribe;
        this.fileUrl = [{url:response.data.data.fileUrl}];
      }).catch(error => {
        showFailToast(error.message);
        console.error(error);
      })
    },insert(values){
      axios.post(config.apiBaseUrl+'/file/insert', {file : this.uploadFile},{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        if (response.data.code == 200){
          axios.post(config.apiBaseUrl+'/gallery/insert', {
            galleryName : values.galleryName,
            galleryDescribe : values.galleryDescribe,
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
                this.$router.push('/Mobile/Application/Gallery');
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
    },update(values){
        axios.post(config.apiBaseUrl+'/gallery/update', {
          galleryId : this.galleryId,
          galleryName : values.galleryName,
          galleryDescribe : values.galleryDescribe,
        }).then(response => {
          if (response.data.code == 200){
            closeToast();
            showSuccessToast('提交成功！');
            setTimeout(() => {
              this.$router.push('/Mobile/Application/Gallery');
            }, 1000);
          }else {
            showFailToast(response.data.msg);
          }
        }).catch(error => {
          showFailToast(error.message);
          console.error(error);
        })
      }
  },mounted() {
    this.getGallery();
  }
}
</script>

<style scoped>

</style>