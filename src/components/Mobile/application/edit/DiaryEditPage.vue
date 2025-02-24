<template>
  <van-form @submit="onSubmit" style="margin-top: 1rem" :readonly="readOnly === 'true'">
    <van-cell-group inset>
      <van-field
          v-model="title"
          name="title"
          label="日记标题"
          placeholder="日记标题"
          :rules="[{ required: true, message: '请填写日记标题' }]"
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
          :clearable=true
          autosize
          required
      />
      <van-field name="weather" label="天气" :rules="[{ required: true, message: '请选择天气' }]" required>
        <template #input>
          <van-radio-group v-model="weather" direction="horizontal">
            <van-radio name="晴">
              <template #icon="props">
                <font-awesome-icon icon="sun" style="color: orange;" v-if="props.checked"/>
                <font-awesome-icon icon="sun" style="color: lightgray;" v-else/>
              </template>
            </van-radio>
            <van-radio name="雨">
              <template #icon="props">
                <font-awesome-icon icon="cloud-rain" style="color: deepskyblue;" v-if="props.checked"/>
                <font-awesome-icon icon="cloud-rain" style="color: lightgray;" v-else/>
              </template>
            </van-radio>
            <van-radio name="晴转多云">
              <template #icon="props">
                <font-awesome-icon icon="cloud-sun" style="color: lightsalmon;" v-if="props.checked"/>
                <font-awesome-icon icon="cloud-sun" style="color: lightgray;" v-else/>
              </template>
            </van-radio>
            <van-radio name="多云">
              <template #icon="props">
                <font-awesome-icon icon="cloud" style="color: gray;" v-if="props.checked"/>
                <font-awesome-icon icon="cloud" style="color: lightgray;" v-else/>
              </template>
            </van-radio>
            <van-radio name="雷阵雨">
              <template #icon="props">
                <font-awesome-icon icon="thunderstorm" style="color: dodgerblue;" v-if="props.checked"/>
                <font-awesome-icon icon="thunderstorm" style="color: lightgray;" v-else/>
              </template>
            </van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field name="temperature" label="气温" :rules="[{ required: true, message: '请选择气温' }]" required>
        <template #input>
          <van-stepper v-model="temperature" theme="round" button-size="22"/>
        </template>
      </van-field>
      <van-field name="luckyValue" label="运势" :rules="[{ required: true, message: '请选择运势' }]"
          autocomplete="off" :clearable=true autosize required>
        <template #input>
          <van-rate v-model="luckyValue" color="#ffd21e" void-icon="star" void-color="#eee"/>
        </template>
      </van-field>
      <van-field name="uploader" label="日记图片" required :rules="[{ required: true, message: '请选择图片' }]">
        <template #input>
          <van-uploader v-model="fileUrl" multiple :max-count="1" :after-read="afterRead"
                        :readonly="readOnly === 'true'" :deletable="readOnly === 'false' && (diaryId === undefined || diaryId === '')" />
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
  name: "DiaryEditPage",
  data(){
    return {
      title : ref(''),
      content : ref(''),
      temperature : ref(26),
      weather : ref(''),
      luckyValue : ref(5),
      fileUrl : ref([]),
      uploadFile : ref(''),
      diaryId : ref(this.$route.query.diaryId),
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

      if (this.diaryId === undefined || this.diaryId === ''){
        this.insert(values);
      }else
        this.update(values);

    },afterRead(file) {
      this.uploadFile = file.file;
    },getDiary(){
      if (this.diaryId === undefined || this.diaryId === ''){
        return;
      }
      this.imgReadonly = true;
      axios.post(config.apiBaseUrl+'/diary/querySingle', {
        diaryId : this.diaryId
      },{
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(response => {
        this.title = response.data.data.title;
        this.content = response.data.data.content;
        this.temperature = response.data.data.temperature;
        this.weather = response.data.data.weather;
        this.luckyValue = response.data.data.luckyValue;
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
          axios.post(config.apiBaseUrl+'/diary/insert', {
            title : values.title,
            content : values.content,
            temperature : values.temperature,
            weather : values.weather,
            luckyValue : values.luckyValue,
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
                this.$router.push('/Mobile/Application/Diary');
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
      axios.post(config.apiBaseUrl+'/diary/update', {
        diaryId : this.diaryId,
        title : values.title,
        content : values.content,
        temperature : values.temperature,
        luckyValue : values.luckyValue,
        weather : values.weather,
      }).then(response => {
        if (response.data.code == 200){
          closeToast();
          showSuccessToast('提交成功！');
          setTimeout(() => {
            this.$router.push('/Mobile/Application/Diary');
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
    this.getDiary();
  }
}
</script>

<style scoped>

</style>