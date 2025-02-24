<template>
  <van-form @submit="onSubmit" style="margin-top: 1rem" :readonly="readOnly === 'true'">
    <van-cell-group inset>
      <van-field
          v-model="audioName"
          name="audioName"
          label="歌曲名称"
          placeholder="歌曲名称"
          :rules="[{ required: true, message: '请填写歌曲名称' }]"
          autocomplete="off"
          :clearable=true
          autosize
          required
      />
      <van-field
          v-model="singer"
          name="singer"
          label="歌手"
          placeholder="歌手"
          :rules="[{ required: true, message: '请填写歌手' }]"
          autocomplete="off"
          :clearable=true
          autosize
          required
      />
      <van-field name="isLove" label="喜欢"  required>
        <template #input>
          <van-switch v-model="isLove" active-color="#ee0a24" inactive-color="#dcdee0">
            <template #node>
              <div class="icon-wrapper">
                <van-icon name="like"/>
              </div>
            </template>
          </van-switch>
        </template>
      </van-field>
      <van-field name="uploader" label="音乐文件" required :rules="[{ required: true, message: '请选择音乐文件' }]">
        <template #input>
          <van-uploader v-model="fileUrl" multiple :max-count="1" :after-read="afterRead" accept="audio/*"
                        :readonly="readOnly === 'true'" :deletable="readOnly === 'false' && (audioId === undefined || audioId === '')" />
        </template>
      </van-field>
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit" :disabled="readOnly === 'true'">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script>
import {ref} from "vue";
import {closeToast, showFailToast, showLoadingToast, showSuccessToast} from "vant";
import axios from "axios";
import config from "@/config";

export default {
  name: "AudioEditPage",
  data(){
    return {
      audioName : ref(''),
      singer : ref(''),
      isLove : ref(false),
      fileUrl : ref([]),
      uploadFile : ref(''),
      audioId : ref(this.$route.query.audioId),
      readOnly : ref(this.$route.query.readOnly),
    }
  },methods : {
    onSubmit(values){
      showLoadingToast({
        message: '提交中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      });

      if (this.audioId === undefined || this.audioId === ''){
        this.insert(values);
      }else
        this.update(values);

    },afterRead(file) {
      this.uploadFile = file.file;
    },getAudio(){
      if (this.audioId === undefined || this.audioId === ''){
        return;
      }
      this.imgReadonly = true;
      axios.post(config.apiBaseUrl+'/audio/querySingle', {
        audioId : this.audioId
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.audioName = response.data.data.audioName;
        this.singer = response.data.data.singer;
        this.isLove = response.data.data.isLove === 1;
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
          axios.post(config.apiBaseUrl+'/audio/insert', {
            audioName : values.audioName,
            singer : values.singer,
            isLove : values.isLove? 1 : 0,
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
                this.$router.push('/Mobile/multimedia/Audio');
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
      axios.post(config.apiBaseUrl+'/audio/update', {
        audioId : this.audioId,
        audioName : values.audioName,
        singer : values.singer,
        isLove : values.isLove ? 1 : 0,
      }).then(response => {
        if (response.data.code == 200){
          closeToast();
          showSuccessToast('提交成功！');
          setTimeout(() => {
            this.$router.push('/Mobile/multimedia/Audio');
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
    this.getAudio();
  }
}
</script>

<style scoped>
.icon-wrapper {
  display: flex;
  width: 100%;
  justify-content: center;
  font-size: 1.2rem;
}
.icon-wrapper .van-icon-like {
  line-height: 32px;
  color: var(--van-red);
}
</style>