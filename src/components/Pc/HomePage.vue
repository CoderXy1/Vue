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
              <a class="nav-link tm-nav-link" href="#gallery">测试2</a>
            </li>
            <li class="nav-item">
              <a class="nav-link tm-nav-link" href="#contact">测试3</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <div class="text-center tm-hero-text-container">
      <div class="tm-hero-text-container-inner">
        <h2 class="tm-hero-title">Aurora</h2>
        <p class="tm-hero-subtitle">
          测试测试测试测试测试测试
          <br />测试测试
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
            记录美好生活
          </p>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <div class="mx-auto tm-gallery-container">
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

  <section id="introduction" class="tm-section-pad-top">
    <div class="container">
      <div class="row">
        <div class="col-lg-6">
          <img src="@/assets/img/the-town-01.jpg" alt="Image" class="img-fluid tm-intro-img" />
        </div>
        <div class="col-lg-6">
          <div class="tm-intro-text-container">
            <h2 class="tm-text-primary mb-4 tm-section-title">测试1</h2>
            <p class="mb-4 tm-intro-text">
              测试测试<strong>测试测试</strong> 测试测试
            </p>
            <p class="mb-5 tm-intro-text">
              测试测试
              <a rel="nofollow" href="#">测试测试</a>测试测试</p>
            <div class="tm-next">
              <a href="#work" class="tm-intro-text tm-btn-primary">更多</a>
            </div>
          </div>
        </div>
      </div>

      <div class="row tm-section-pad-top">
        <div class="col-lg-4">
          <i class="fas fa-4x fa-bus text-center tm-icon"></i>
          <h4 class="text-center tm-text-primary mb-4">测试11</h4>
          <p>
            测试测试测试
          </p>
        </div>

        <div class="col-lg-4 mt-5 mt-lg-0">
          <i class="fas fa-4x fa-bicycle text-center tm-icon"></i>
          <h4 class="text-center tm-text-primary mb-4">测试12</h4>
          <p>
            测试测试测试
          </p>
        </div>
        <div class="col-lg-4 mt-5 mt-lg-0">
          <i class="fas fa-4x fa-city text-center tm-icon"></i>
          <h4 class="text-center tm-text-primary mb-4">测试13</h4>
          <p>
            Donec vestibulum libero nisl. Curabitur ac orci ac lorem blandit
            volutpat. Sed ac sodales nibh, ut porttitor elit. Sed id dui mi.
            Vestibulum ante ipsum primis in faucibus.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Contact -->
  <section id="contact" class="tm-section-pad-top tm-parallax-2">
    <div class="container tm-container-contact">
      <div class="row">
        <div class="col-12">
          <h2 class="mb-4 tm-section-title">Contact Us</h2>
          <div class="mb-5 tm-underline">
            <div class="tm-underline-inner"></div>
          </div>
          <p class="mb-5">
            Nullam tincidunt, lacus a suscipit luctus, elit turpis tincidunt dui,
            non tempus sem turpis vitae lorem. Maecenas eget odio in sapien ultrices
            viverra vitae vel leo. Curabitur at elit eu risus pharetra pellentesque
            at at velit.
          </p>
        </div>

        <div class="col-sm-12 col-md-6 d-flex align-items-center tm-contact-item">
          <a href="tel:0100200340" class="tm-contact-item-link">
            <i class="fas fa-3x fa-phone mr-4"></i>
            <span class="mb-0">010-020-0340</span>
          </a>
        </div>
        <div class="col-sm-12 col-md-6 d-flex align-items-center tm-contact-item">
          <a href="mailto:info@company.co" class="tm-contact-item-link">
            <i class="fas fa-3x fa-envelope mr-4"></i>
            <span class="mb-0">info@company.co</span>
          </a>
        </div>
        <div class="col-sm-12 col-md-6 d-flex align-items-center tm-contact-item">
          <a href="#" class="tm-contact-item-link">
            <i class="fas fa-3x fa-map-marker-alt mr-4"></i>
            <span class="mb-0">Location on Maps</span>
          </a>
        </div>
        <div class="col-sm-12 col-md-6 d-flex align-items-center tm-contact-item">
          <form action="" method="get">
            <input name="email" type="email" placeholder="Subscribe your email" class="tm-input" required />
            <button type="submit" class="btn tm-btn-submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
    <footer class="text-center small tm-footer">
      <p class="mb-0">Copyright © 2021.ICP证:<a href="https://beian.miit.gov.cn">渝ICP备19006616号-1</a>.Welcome to here - Good lucky to you</p>
    </footer>
  </section>
</template>

<script>
import $ from 'jquery';
import axios from 'axios';
import config from "@/config";

export default {
  name: 'HomePage',
  data(){
    return {
      galleryList : [],
    };
  },
  methods: {
    getGalleryList(){
      const params = {
        pageNum : 1,
        pageSize : 4,
        searchKey : '',
      }
      axios.post(config.apiBaseUrl+'/gallery/queryList',params)
          .then(response => {
            this.galleryList = response.data.data;
          })
          .catch(error => {
            console.error(error);
          })
    },
  },
  mounted() {
    this.getGalleryList();
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