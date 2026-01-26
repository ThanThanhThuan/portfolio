<script setup>
import { onMounted } from 'vue'

onMounted(() => {
    // Initialize Parallax
    if (window.jQuery) {
        window.jQuery('.tm-testimonials-parallax-header').parallax();
        
        // Initialize Slick Carousel using global jQuery
        // Timeout ensures DOM is rendered before Slick tries to calculate widths
        setTimeout(() => {
            window.jQuery('.tm-carousel').slick({
                dots: true,
                infinite: false,
                arrows: false,
                speed: 300,
                slidesToShow: 3,
                slidesToScroll: 2,
                responsive: [
                    { breakpoint: 1024, settings: { arrows: false, slidesToShow: 2, slidesToScroll: 1, infinite: true, dots: true } },
                    { breakpoint: 600, settings: { arrows: false, slidesToShow: 1, slidesToScroll: 1 } },
                    { breakpoint: 480, settings: { arrows: false, slidesToShow: 1, slidesToScroll: 1 } }
                ]
            });
        }, 100);
    }
})
</script>

<template>
  <div>
    <!-- Testimonials header -->
    <section class="row" id="tmServices">
      <div class="col-12">
     
             <div class="tm-bg-black-transparent text-center tm-services-header tm-testimonials-header">
                <h2 class="text-uppercase tm-services-page-title tm-testimonials-page-title">{{ $t('nav.testimonials') }}</h2>
            </div>
       
      </div>   
    </section>

    <section class="row tm-testimonials-section">
        <div class="col-12 tm-carousel">              
            <div class="tm-bg-black-transparent tm-testimonial-box text-center">                    
              <div class="tm-person-img-container">
                <img src="/img/person-1.png" alt="Image" class="img-fluid mx-auto"/>
              </div>              
              <h3 class="tm-about-name tm-uppercase">Praesent ornare</h3>
              <p class="tm-about-description">Vestibulum semper dolor sed elit mattis.</p>
            </div>
            <!-- Add remaining testimonials items here from original HTML... -->
            <div class="tm-bg-black-transparent tm-testimonial-box text-center">
               <div class="tm-person-img-container"><img src="/img/person-2.png" alt="Image" class="img-fluid mx-auto"/></div>              
               <h3 class="tm-about-name tm-uppercase">Maecenas Pretium</h3>
               <!-- LIST OF LINES -->
  <!-- 'list-unstyled' removes bullets, 'p-0' removes padding -->
  <ul class="list-unstyled tm-about-description p-0">
      <li class="mb-3">"Great as usual."</li>
      <li class="mb-3">"Great work. Very fast."</li>
      <li class="mb-0">"Great professional. Highly recommended."</li>
  </ul>
            </div>
             <div class="tm-bg-black-transparent tm-testimonial-box text-center">
               <div class="tm-person-img-container"><img src="/img/person-3.png" alt="Image" class="img-fluid mx-auto"/></div>              
               <h3 class="tm-about-name tm-uppercase">Nulla Quis</h3>
               <p class="tm-about-description">Testimonial 3 content...</p>
            </div>
        </div>
    </section>
    <!-- NEW SECTION: 3/4 Width Image -->
    <section class="row mb-5 pb-5">
      <div class="col-12 text-center">
        <!-- 
             style="width: 75%" makes it 3/4 of screen width 
             mx-auto centers it block-level (if needed)
             mb-5 pb-5 adds spacing so it doesn't touch the footer
        -->
        <img 
          src="/img/upwork8k.png" 
          alt="Bottom Banner" 
          class="img-fluid shadow-lg"
          style="width: 75%; height: auto; border-radius: 5px; display: inline-block;"
        />
      </div>
    </section>
  </div>
</template>