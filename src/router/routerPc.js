import { createRouter,createWebHistory } from 'vue-router';
import HomePage from '@/components/Pc/HomePage.vue';
import routerMobile from "@/router/routerMobile";

const routerPc = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes : [
        { path:'/',redirect:'/Pc/Home',meta: { title: 'Aurora - 晨光' }},
        { path:'/Pc/Home',component:HomePage,meta: { title: 'Aurora - 晨光' }},
    ]
});

routerPc.beforeEach((to, from, next) => {
    if (to.meta.title) { // 检查路由元信息中是否有标题设置
        document.title = to.meta.title; // 设置页面标题为路由元信息的标题
    }
    next(); // 确保调用next()继续路由跳转过程
});

export default routerPc


