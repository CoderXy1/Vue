import { createApp } from 'vue';
import App from './components/Pc/AppPc.vue';
import routerPc from '@/router/routerPc';
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 定义特性标志
window.__VUE_PROD_DEVTOOLS__ = false;
window.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = false;

const app = createApp(App);
app.use(routerPc);
app.use(ElementPlus);
app.mount('#app');

