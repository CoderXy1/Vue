<template>
  <van-form @submit="onSubmit" style="padding-top: 2rem;padding-bottom: 3rem" :style="{backgroundColor:noteColor}">
    <van-cell-group inset >
      <van-field
          v-model="noteTitle"
          name="noteTitle"
          label="便签名称"
          placeholder="便签名称"
          :rules="[{ required: true, message: '请填写便签名称' }]"
          autocomplete="off"
          :clearable=true
          autosize
          required
      />
      <van-field
          v-model="content"
          name="content"
          label="内容"
          placeholder="内容"
          :rules="[{ required: true, message: '请填写内容' }]"
          autocomplete="off"
          type="textarea"
          :clearable=true
          maxlength="250"
          show-word-limit
          autosize
          required
      />
      <van-field
          v-model="noteColor"
          name="noteColor"
          label="选择颜色"
          placeholder="颜色"
          :rules="[{ required: true, message: '请选择颜色' }]"
          autocomplete="off"
          type="color"
          required
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block plain native-type="submit" :style="{color:noteColor}">
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
  name: "NoteEditPage",
  data(){
    return {
      noteTitle : ref(''),
      content : ref(''),
      noteColor : ref('#999999'),
      noteId : ref(this.$route.query.noteId),
    }
  },methods:{
    onSubmit(values){
      showLoadingToast({
        message: '提交中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      });
      if (this.noteId === undefined || this.noteId === ''){
        this.insert(values);
      }else
        this.update(values);

    },getNote(){
      if (this.noteId === undefined || this.noteId === ''){
        return;
      }
      axios.post(config.apiBaseUrl+'/note/querySingle', {
        noteId : this.noteId
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.noteTitle = response.data.data.noteTitle;
        this.content = response.data.data.content;
        this.noteColor = response.data.data.noteColor;
      }).catch(error => {
        showFailToast(error.message);
        console.error(error);
      })
    },insert(values){
      axios.post(config.apiBaseUrl+'/note/insert', {
        noteTitle : values.noteTitle,
        content : values.content,
        noteColor : values.noteColor,
      }).then(response => {
        if (response.data.code == 200){
          closeToast();
          showFailToast('提交成功！');
          setTimeout(() => {
            this.$router.push('/Mobile/Application/Note');
          }, 1000);
        }else {
          showFailToast(response.data.msg);
        }
      }).catch(error => {
        showFailToast(error.message);
        console.error(error);
      })
    },update(values){
      axios.post(config.apiBaseUrl+'/note/update', {
        noteId : this.noteId,
        noteTitle : values.noteTitle,
        content : values.content,
        noteColor : values.noteColor,
      }).then(response => {
        if (response.data.code == 200){
          closeToast();
          showSuccessToast('提交成功！');
          setTimeout(() => {
            this.$router.push('/Mobile/Application/Note');
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
    this.getNote();
  }
}
</script>

<style scoped>

</style>