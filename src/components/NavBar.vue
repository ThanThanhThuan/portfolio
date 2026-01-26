<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

// Function to toggle language
const switchLanguage = () => {
  locale.value = locale.value === 'en' ? 'vi' : 'en'
}
</script>

<template>
  <div class="col-lg-8 col-1">
    <div class="tm-nav">
      <nav class="navbar navbar-expand-lg navbar-light tm-bg-white-transparent tm-navbar">
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <div class="tm-nav-link-highlight"></div>
              <router-link class="nav-link" to="/">{{ $t('nav.home') }}</router-link>
            </li>
            <!-- <li class="nav-item">
              <div class="tm-nav-link-highlight"></div>
              <router-link class="nav-link" to="/about">{{ $t('nav.about') }}</router-link>
            </li> -->
            <!-- <li class="nav-item">
              <div class="tm-nav-link-highlight"></div>
              <router-link class="nav-link" to="/services">{{ $t('nav.services') }}</router-link>
            </li> -->
            <li class="nav-item">
  <div class="tm-nav-link-highlight"></div>
  <router-link class="nav-link" to="/projects">{{ $t('nav.projects') }}</router-link>
</li>
            <li class="nav-item">
              <div class="tm-nav-link-highlight"></div>
              <router-link class="nav-link" to="/testimonials">{{ $t('nav.testimonials') }}</router-link>
            </li>
            <li class="nav-item">
              <div class="tm-nav-link-highlight"></div>
              <router-link class="nav-link" to="/contact">{{ $t('nav.contact') }}</router-link>
            </li>
        
            <!-- LANGUAGE SWITCHER WITH FLAGS -->
            <li class="nav-item pl-3" style="cursor: pointer;">
                <a class="nav-link d-flex align-items-center" @click.prevent="switchLanguage">
                    
                    <!-- If English, show UK Flag -->
                    <img v-if="locale === 'en'" 
                         src="/img/flags/uk.png" 
                         alt="English" 
                         class="flag-icon"
                    >
                    
                    <!-- If Vietnamese, show VN Flag -->
                    <img v-if="locale === 'vi'" 
                         src="/img/flags/vn.png" 
                         alt="Vietnamese" 
                         class="flag-icon"
                    >
                    
                    <!-- Text Label -->
                    <span class="text-uppercase ml-2 font-weight-bold">{{ $t('nav.language') }}</span>
                </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<style scoped>
.router-link-active {
  color: #383838 !important; 
}
.nav-item:has(.router-link-active) .tm-nav-link-highlight,
.router-link-active ~ .tm-nav-link-highlight {
    display: block; 
}
.flag-icon {
    /* CONTROL SIZE HERE */
    width: 20px;       /* Try 18px or 20px */
    height: 20px;      /* Keep height same as width for circles */
    
    /* Alignment */
    object-fit: cover; /* Ensures image doesn't stretch */
    border-radius: 50%; /* Makes it a circle */
    
    /* Fine-tune alignment with text */
    vertical-align: middle;
    margin-top: -3px;  /* Lifts it slightly to match text baseline */
}
</style>