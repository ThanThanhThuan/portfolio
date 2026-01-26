<template>
  <div>
    <section class="row" id="tmHome">
      <div class="col-12 tm-home-container">
        <div class="text-white tm-home-left">
          <!-- Dynamic Translation -->
          <p class="text-uppercase tm-slogan">{{ $t('home.slogan') }}</p>
          <hr class="tm-home-hr" />
          <h2 class="tm-home-title">{{ $t('home.title') }}</h2>
          <p class="tm-home-text">
            {{ $t('home.desc') }}
          </p>
                  <router-link class="btn btn-primary" to="/projects">{{ $t('home.btn') }}</router-link>
        </div>
        <div class="tm-home-right">
          <img src="/img/mobile-screen.png" alt="App on Mobile mockup" />
        </div>
      </div>
    </section>

    <!-- Features -->
    <div class="row" id="tmFeatures">
      <div class="col-lg-4">
        <div class="tm-bg-white-transparent tm-feature-box">
        <h3 class="tm-feature-name">{{ $t('home.feat_perf') }}</h3>
        <div class="tm-feature-icon-container">
            <i class="fas fa-3x fa-laptop-code"></i>
        </div>
        <p class="text-center">C#, SQL, JavaScript, TypeScript, Python 
<br /><strong>Frameworks & Libraries:</strong> .NET, Vue.js, React, Angular, Node.js, Flutter</p>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="tm-bg-white-transparent tm-feature-box">
            <h3 class="tm-feature-name">{{ $t('home.feat_support') }}</h3>
            <div class="tm-feature-icon-container">
                <i class="fas fa-3x fa-database"></i>
            </div>
            <p class="text-center">MongoDB, PostgreSQL, MySQL, SQL Server etc
<br /><strong>DevOps & Tools:</strong> Docker, Kubernetes, GitHub Actions, Azure, AWS</p>
        </div>
      </div>

      <div class="col-lg-4">
        <div class="tm-bg-white-transparent tm-feature-box">
            <h3 class="tm-feature-name">{{ $t('home.feat_marketing') }}</h3>
            <div class="tm-feature-icon-container">
                <i class="fas fa-3x fa-layer-group"></i>
            </div>
            <p v-if="this.$i18n.locale === 'en'" class="text-center">Responsive design, accessibility, cross-platform optimization</p>
            <p v-else class="text-center">Thiết kế đáp ứng, khả năng tiếp cận, tối ưu hóa đa nền tảng</p>
        </div>
      </div>
    </div>

    <!-- Call to Action -->
    <section class="row" id="tmCallToAction">
      <div class="col-12 tm-call-to-action-col">
        <img src="/img/call-to-action.jpg" alt="Image" class="img-fluid tm-call-to-action-image" />
        <div class="tm-bg-white tm-call-to-action-text">
          <h2 class="tm-call-to-action-title">{{ $t('home.introduction') }}</h2>
          <p v-if="this.$i18n.locale === 'en'">I am a Full-Stack Multi-Platform Developer with expertise in building seamless digital experiences across web, mobile, and desktop environments. My skill set spans both front-end and back-end technologies, enabling me to design and implement scalable solutions that integrate modern frameworks, robust APIs, and cloud-native architectures.</p>
          <p v-else>Tôi là một nhà phát triển full-stack đa nền tảng với chuyên môn trong việc xây dựng trải nghiệm kỹ thuật số liền mạch trên các môi trường web, di động và máy tính để bàn. Kỹ năng của tôi bao gồm cả công nghệ front-end và back-end, cho phép tôi thiết kế và triển khai các giải pháp có khả năng mở rộng, tích hợp các framework hiện đại, API mạnh mẽ và kiến ​​trúc đám mây.</p>
              <div class="d-flex justify-content-between">
                              <a href="https://github.com/thanthanhthuan" target="_blank" class="btn btn-dark mt-3">
                                    <i class="fab fa-github mr-1"></i> Github
                                </a>
           <router-link class="btn btn-info mt-3" to="/contact">{{ $t('nav.contact_me') }}</router-link>
                            </div>
          
        </div>
      </div>
    </section>
  </div>
</template>