<template>
  <div>
    <div class="wrap" >
      <div class="content_box" id="box" ref="scrollDiv">
        <div :class="chat.userType == '2' ? 'userbox2' : 'userbox'"
             v-for="(chat, index) in chatList"
             :key="index">
          <div :class="chat.userType == '2' ? 'nameInfo2' : 'nameInfo'" style="color:black">
            <div style="font-size: 14px">
              <span v-if="chat.userType == '2'">DeepSeek</span>
              <span v-else>我</span>
            </div>
            <div :class="chat.userType == '2' ? 'contentText2' : 'contentText'" >
              {{ chat.chatContent }}
            </div>
            <span :class="chat.userType == '2' ? 'timer2' : 'timer'">{{chat.chatTime}}</span>
          </div>
          <div>
            <van-image round width="50px" height="50px" v-if="chat.userType == '2'"
                       src="http://www.shanshaoxy.cn:8089/AuroraApp/Resource/Photo/20250208/1000000828.jpg" />
            <van-image round width="50px" height="50px" v-else
                       src="http://www.shanshaoxy.cn:8089/AuroraApp/Resource/Photo/20250227/mmexport1696757429404.jpg" />
          </div>
        </div>
      </div>
      <van-sticky :offset-bottom="50" position="bottom">
        <van-form @submit="onSubmit">
          <van-field
              v-model="chatContent"
              name="chatContent"
              center
              type="textarea"
              :autosize="{ maxHeight: 40, minHeight: 20 }"
              :rules="[{ required: true }]"
              autocomplete="off"
              placeholder="请输入内容"
              rows="1"
          >
            <template #button>
              <van-button size="small" type="primary" native-type="submit">发送</van-button>
            </template>
          </van-field>
        </van-form>
      </van-sticky>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { ref } from 'vue';
import {showImagePreview, showConfirmDialog, closeToast, showSuccessToast, showFailToast, showLoadingToast} from "vant";
import { format } from 'date-fns';

export default {
  name: "AIPage",
  data(){
    return {
      pageNum : ref(1),
      pageSize : ref(1000),
      chatList: ref([]),
      chatContent: ref(''),
    }
  },
  methods : {
    getChatList(){
      const params = {
        pageNum : this.pageNum,
        pageSize : this.pageSize,
      }
      axios.post(config.apiBaseUrl+'/chat/queryList',params)
          .then(response => {
            this.chatList = response.data.data;
            this.chatContent = '';
            setTimeout(() => {
              let scrollElem = this.$refs.scrollDiv;
              console.log(scrollElem.scrollHeight)
              scrollElem.scrollTop = scrollElem.scrollHeight;
            }, 20);
          })
          .catch(error => {
            showFailToast(error.message);
            console.error(error);
          })
    },
    getAiInfo(userContent){
      axios.post('https://api.deepseek.com/chat/completions', {
        model : "deepseek-chat",
        messages: [
          {"role": "system", "content": '你是一个全能助手.'},
          {"role": "user", "content": userContent}
        ],
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer sk-7cd594f2249b4a6ba060bafcfef49fe7'
        }
      }).then(response => {
        console.log(response.data);
        this.insert(response.data.choices[0].message.content,'2');
      }).catch(error => {
        showFailToast(error.message);
        console.log(error);
      })
    },
    onSubmit(values){
      showLoadingToast({
        message: '提交中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0,
      });

      this.insert(values.chatContent,'1');
    },
    insert(chatContent,userType){
      axios.post(config.apiBaseUrl+'/chat/insert', {
        chatContent : chatContent,
        userType : userType,
      }).then(response => {
        if (response.data.code == 200){
          if (userType === '1'){
            this.getAiInfo(chatContent);
          } else{
            this.getChatList();
            closeToast();
          }
        }else {
          showFailToast(response.data.msg);
        }
      }).catch(error => {
        showFailToast(error.message);
        console.error(error);
      })
    },
  },
  mounted() {
    this.getChatList();
  }
};
</script>

<style scoped>
.wrap {
  height: 200px;
  width: 100%;
  position: relative;
}
.content_box {
  height: calc(100% - 115px);
  overflow: scroll;
  padding: 10px;
  min-height: 30rem;
}
.userbox {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
}
.nameInfo {
  /* 用flex：1把盒子撑开 */
  flex: 1;
  margin-right: 10px;
  /* 用align-items把元素靠右对齐 */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}
.contentText {
  background-color: #9eea6a;
  /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
  display: inline-block;
  /* 这四句是圆角 */
  border-top-left-radius: 10px;
  border-top-right-radius: 0px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* 最大宽度限定内容输入到百分61换行 */
  max-width: 80%;
  padding: 5px 10px;
  /* 忽略多余的空白，只保留一个空白 */
  white-space: normal;
  /* 换行显示全部字符 */
  word-break: break-all;
  margin-top: 3px;
  font-size: 14px;
}
.userbox2 {
  width: 100%;
  display: flex;
  flex-direction: row-reverse;
  margin-bottom: 10px;
}
.nameInfo2 {
  /* 用flex：1把盒子撑开 */
  flex: 1;
  margin-left: 10px;
}
.contentText2 {
  background-color: whitesmoke;
  /* 把内容部分改为行内块元素，因为盒子flex：1把盒子撑大了，所以用行内块元素让内容宽度不根据父盒子来 */
  display: inline-block;
  /* 这四句是圆角 */
  border-top-left-radius: 0px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  /* 最大宽度限定内容输入到百分61换行 */
  max-width: 80%;
  padding: 5px 10px;
  /* 忽略多余的空白，只保留一个空白 */
  white-space: normal;
  /* 换行显示全部字符 */
  word-break: break-all;
  margin-top: 3px;
  font-size: 14px;
}
.timer {
  display: flex;
  align-items: flex-end;
  color: #c2c2c2;
  font-size: 10px;
}
.timer2 {
  display: flex;
  color: #c2c2c2;
  font-size: 10px;
}
</style>