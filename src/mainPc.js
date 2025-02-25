import { createApp } from 'vue';
import App from './components/Pc/AppPc.vue';
import routerPc from '@/router/routerPc';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import { TextEllipsis } from 'vant';
//Video
import VueVideoPlayer from 'vue-video-player';
import 'video.js/dist/video-js.css';

// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

const app = createApp(App);
app.use(routerPc);
app.use(ElementPlus);
app.use(TextEllipsis);
app.use(VueVideoPlayer);
app.mount('#app');

