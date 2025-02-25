<template>
  <!-- Hero section -->
  <section id="hero" class="text-white tm-font-big tm-parallax">
    <!-- Navigation -->
    <nav class="navbar navbar-expand-md tm-navbar" id="tmNav">
      <div class="container">
        <div class="tm-next">
          <a href="#" class="navbar-brand">Aurora</a>
        </div>

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <i class="fas fa-bars navbar-toggler-icon"></i>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link tm-nav-link" href="#gallery">相册</a>
            </li>
            <li class="nav-item">
              <a class="nav-link tm-nav-link" href="#note">便签</a>
            </li>
            <li class="nav-item">
              <a class="nav-link tm-nav-link" href="#diary">日记</a>
            </li>
            <li class="nav-item">
              <a class="nav-link tm-nav-link" href="#video">视频</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="text-center tm-hero-text-container">
      <div class="tm-hero-text-container-inner">
        <h2 class="tm-hero-title">Aurora</h2>
        <p class="tm-hero-subtitle">
          Age can wither me
          <br />岁月不饶人
        </p>
      </div>
    </div>
  </section>

  <section id="gallery" class="tm-section-pad-top">
    <div class="container tm-container-gallery">
      <div class="row">
        <div class="text-center col-12">
          <h2 class="tm-text-primary tm-section-title mb-4">相册</h2>
          <p class="mx-auto tm-work-description">
            拍下精彩瞬间
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="mx-auto tm-gallery-container" style="padding-top: 20px">
            <div class="grid tm-gallery" >
              <a v-for="(gallery, index) in galleryList" :key="index" :href="gallery.fileUrl" target="_blank">
                <figure class="effect-honey tm-gallery-item" >
                  <el-image
                      class="img-fluid"
                      style="width: 450px; height: 280px"
                      :zoom-rate="1.2"
                      :max-scale="7"
                      :min-scale="0.2"
                      :src="gallery.fileUrl"
                      show-progress
                      fit="cover"
                  />
                  <figcaption>
                    <h2><i><span>{{gallery.galleryName}}</span><br/> {{gallery.galleryDescribe}}</i></h2>
                  </figcaption>
                </figure>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="note" class="tm-section-pad-top">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <img src="@/assets/img/the-town-01.jpg" alt="Image" class="img-fluid tm-intro-img" />
        </div>
        <div class="col-lg-6">
          <div class="tm-intro-text-container">
            <h2 class="tm-text-primary mb-4 tm-section-title">便签</h2>
            <p class="mb-4 tm-intro-text" v-for="(note, index) in noteList" :key="index">
              <strong>{{note.noteTitle}}</strong>
              <van-text-ellipsis :content="note.content" rows="5" expand-text="展开" collapse-text="收起"/>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section id="diary" class="tm-section-pad-top" style="padding-top: 40px">
    <div class="container">
      <div class="row">
        <div class="text-center col-12">
          <h2 class="tm-text-primary tm-section-title mb-4">日记</h2>
          <p class="mx-auto tm-work-description">
            记录美好生活
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-3 mt-5 mt-lg-0" v-for="(diary, index) in diaryList" :key="index">
            <el-image
                class="img-fluid"
                style="width: 400px; height: 220px"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :src="diary.fileUrl"
                show-progress
                fit="cover"
            />
          <h4 class="text-center tm-text-primary mb-4">{{ diary.title }}</h4>
          <p style="min-height: 100px">
            {{ diary.content }}
          </p>
        </div>
      </div>
    </div>
  </section>

  <section id="video" class="tm-section-pad-top" style="padding-top: 40px;padding-bottom: 20px">
    <div class="container">
      <div class="row">
        <div class="text-center col-12">
          <h2 class="tm-text-primary tm-section-title mb-4">视频</h2>
          <p class="mx-auto tm-work-description">
            放映昨日时光
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-6 mt-5 mt-lg-0" v-for="(video, index) in videoList" :key="index">
          <video-player
              class="video-player"
              :options="playerOptions"
              :src="video.fileUrl" >
          </video-player>
          <h5 class="text-center tm-text-primary mb-4">{{ video.title }}</h5>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="tm-section-pad-top tm-parallax-2">
    <div class="container tm-container-contact">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4 tm-section-title">Totoro</h2>
          <div class="mb-5 tm-underline">
            <div class="tm-underline-inner"></div>
          </div>
          <p class="mb-5">
            人生一世 草木一秋
          </p>
        </div>
      </div>
    </div>
    <footer class="text-center small tm-footer">
      <p class="mb-0">Copyright © 2021.ICP证:<a href="https://beian.miit.gov.cn">渝ICP备19006616号-1</a>.Welcome to here - Good lucky to you</p>
    </footer>
  </section>
</template>

<script>
import {ref} from "vue";
import $ from 'jquery';
import axios from 'axios';
import config from "@/config";

export default {
  name: 'HomePage',
  data(){
    return {
      galleryList : ref([]),
      diaryList : ref([]),
      noteList : ref([]),
      videoList : ref([]),
      params : {
        pageNum : 1,
        pageSize : 4,
        searchKey : '',
      },
      playerOptions : ref({
        playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
        autoplay: false, // 如果true,浏览器准备好时开始回放。
        muted: true, // 默认情况下将会消除任何音频。
        loop: true, // 导致视频一结束就重新开始。
        preload: 'auto', // 建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
        language: 'zh-CN',
        aspectRatio: '16:9', // 将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
        fluid: true, // 当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
        notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
        controls: true,
        controlBar: {
          timeDivider: true,
          durationDisplay: true,
          remainingTimeDisplay: false,
          fullscreenToggle: true // 全屏按钮
        }
      })
    };
  },
  methods: {
    getGalleryList(){
      axios.post(config.apiBaseUrl+'/gallery/queryList',this.params)
          .then(response => {
            this.galleryList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
    getDiaryList(){
      axios.post(config.apiBaseUrl+'/diary/queryList',this.params)
          .then(response => {
            this.diaryList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
    getNoteList(){
      axios.post(config.apiBaseUrl+'/note/queryList',this.params)
          .then(response => {
            this.noteList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
    getVideoList(){
      axios.post(config.apiBaseUrl+'/video/queryList',this.params)
          .then(response => {
            this.videoList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
  },
  mounted() {
    this.getGalleryList();
    this.getNoteList();
    this.getDiaryList();
    this.getVideoList();
  }
}

function getOffSet(){
  var _offset = 450;
  var windowHeight = window.innerHeight;

  if(windowHeight > 500) {
    _offset = 400;
  }
  if(windowHeight > 680) {
    _offset = 300
  }
  if(windowHeight > 830) {
    _offset = 210;
  }

  return _offset;
}

function setParallaxPosition($doc, multiplier, $object){
  var offset = getOffSet();
  var from_top = $doc.scrollTop(),
      bg_css = 'center ' +(multiplier * from_top - offset) + 'px';
  $object.css({"background-position" : bg_css });
}

var background_image_parallax = function($object, multiplier, forceSet){
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  var $doc = $(document);
  // $object.css({"background-attatchment" : "fixed"});

  if(forceSet) {
    setParallaxPosition($doc, multiplier, $object);
  } else {
    $(window).scroll(function(){
      setParallaxPosition($doc, multiplier, $object);
    });
  }
};

var background_image_parallax_2 = function($object, multiplier){
  multiplier = typeof multiplier !== 'undefined' ? multiplier : 0.5;
  multiplier = 1 - multiplier;
  $object.css({"background-attachment" : "fixed"});
  $(window).scroll(function(){
    var firstTop = $object.offset().top,
        pos = $(window).scrollTop(),
        yPos = Math.round((multiplier * (firstTop - pos)) - 186);

    var bg_css = 'center ' + yPos + 'px';

    $object.css({"background-position" : bg_css });
  });
};

$(function(){
  // Hero Section - Background Parallax
  background_image_parallax($(".tm-parallax"), 0.30, false);
  background_image_parallax_2($("#contact"), 0.80);

  // Handle window resize
  window.addEventListener('resize', function(){
    background_image_parallax($(".tm-parallax"), 0.30, true);
  }, true);

  // Detect window scroll and update navbar
  $(window).scroll(function(){
    if($(document).scrollTop() > 120) {
      $('.tm-navbar').addClass("scroll");
    } else {
      $('.tm-navbar').removeClass("scroll");
    }
  });

  // Close mobile menu after click
  $('#tmNav a').on('click', function(){
    $('.navbar-collapse').removeClass('show');
  })

  // Add smooth scrolling to all links
  // https://www.w3schools.com/howto/howto_css_smooth_scroll.asp
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();
      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 400, function(){
        window.location.hash = hash;
      });
    } // End if
  });

});

</script>

<style>

</style>