import { createRouter,createWebHistory } from 'vue-router';
import HomePage from '@/components/Mobile/HomePage.vue';
import ApplicationPage from '@/components/Mobile/ApplicationPage.vue';
import FilePage from '@/components/Mobile/application/FilePage.vue';
import GalleryPage from '@/components/Mobile/application/GalleryPage.vue';
import NotePage from '@/components/Mobile/application/NotePage.vue';
import DiaryPage from '@/components/Mobile/application/DiaryPage.vue';
import DiaryEditPage from '@/components/Mobile/application/edit/DiaryEditPage.vue';
import GalleryEditPage from '@/components/Mobile/application/edit/GalleryEditPage.vue';
import NoteEditPage from '@/components/Mobile/application/edit/NoteEditPage.vue';
import FileEditPage from '@/components/Mobile/application/edit/FileEditPage.vue';
import MultimediaPage from '@/components/Mobile/MultimediaPage.vue';
import AudioPage from '@/components/Mobile/multimedia/AudioPage.vue';
import VideoPage from '@/components/Mobile/multimedia/VideoPage.vue';
import AudioEditPage from '@/components/Mobile/multimedia/edit/AudioEditPage.vue';
import VideoEditPage from '@/components/Mobile/multimedia/edit/VideoEditPage.vue';
import VideoDetailPage from '@/components/Mobile/multimedia/detail/VideoDetailPage.vue';
import AiChatPage from '@/components/Mobile/aichat/AiChatPage.vue';

const routerMobile = createRouter({
    history : createWebHistory(process.env.BASE_URL),
    routes : [
        { path:'/',redirect:'/Mobile/Home',meta: { title: '首页' }},
        { path:'/Mobile/Home',component:HomePage,meta: { title: '首页' }},
        { path:'/Mobile/Application',component:ApplicationPage,meta: { title: '应用' },children :[
                { path:'/Mobile/Application',component:GalleryPage,meta: { title: '相册' }},
                { path:'/Mobile/Application/Gallery',component:GalleryPage,meta: { title: '相册' }},
                { path:'/Mobile/Application/Note',component:NotePage,meta: { title: '便签' }},
                { path:'/Mobile/Application/Diary',component:DiaryPage,meta: { title: '日记' }},
                { path:'/Mobile/Application/File',component:FilePage,meta: { title: '文件' }},
                { path:'/Mobile/Application/Edit/Gallery',component:GalleryEditPage,meta: { title: '相册编辑' }},
                { path:'/Mobile/Application/Edit/Note',component:NoteEditPage,meta: { title: '便签编辑' }},
                { path:'/Mobile/Application/Edit/Diary',component:DiaryEditPage,meta: { title: '日记编辑' }},
                { path:'/Mobile/Application/Edit/File',component:FileEditPage,meta: { title: '文件上传' }},
        ]},
        { path:'/Mobile/Multimedia',component:MultimediaPage,meta: { title: '媒体' },children :[
                { path:'/Mobile/Multimedia',component:AudioPage,meta: { title: '音乐' }},
                { path:'/Mobile/Multimedia/Audio',component:AudioPage,meta: { title: '音乐' }},
                { path:'/Mobile/Multimedia/Video',component:VideoPage,meta: { title: '视频' }},
                { path:'/Mobile/Multimedia/Edit/Audio',component:AudioEditPage,meta: { title: '音乐编辑' }},
                { path:'/Mobile/Multimedia/Edit/Video',component:VideoEditPage,meta: { title: '视频编辑' }},
                { path:'/Mobile/Multimedia/detail/Video',component:VideoDetailPage,meta: { title: '视频播放' }},
        ]},
        { path:'/Mobile/AiChat',component:AiChatPage,meta: { title: 'AIChat' }},
    ]
});

routerMobile.beforeEach((to, from, next) => {
    if (to.meta.title) { // 检查路由元信息中是否有标题设置
        document.title = to.meta.title; // 设置页面标题为路由元信息的标题
    }
    next(); // 确保调用next()继续路由跳转过程
});

export default routerMobile


