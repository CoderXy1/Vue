<template>
  <div>
    <h1>AIPage</h1>
  </div>
</template>

<script>
import axios from "axios";
import config from "@/config";
import { ref } from 'vue';
import {showImagePreview, showConfirmDialog, closeToast, showSuccessToast, showFailToast} from "vant";
import { format } from 'date-fns';

export default {
  name: "AIPage",
  data(){
    return {

    }
  },
  methods : {
    getAiInfo(){
      axios.post('https://api.deepseek.com/chat/completions', {
        model : "deepseek-chat",
        messages: [
          {"role": "system", "content": "You are a helpful assistant."},
          {"role": "user", "content": "Hello!"}
        ],
        stream: false
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization' : 'Bearer sk-7cd594f2249b4a6ba060bafcfef49fe7'
        }
      }).then(response => {
        console.log(response.data);
      }).catch(error => {
        console.log(error);
      })
    },
  },
  mounted() {
    this.getAiInfo();
  }
}
</script>

<style scoped>

</style>