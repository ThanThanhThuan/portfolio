<script setup>
import { RouterView } from 'vue-router'
import NavBar from './components/NavBar.vue'
import VisitorCounter from './components/VisitorCounter.vue'
import { useI18n } from 'vue-i18n'
const baseUrl = import.meta.env.BASE_URL

const { t } = useI18n()

</script>

<template>
  <!-- Main Parallax Container -->
  <div class="parallax-window" data-parallax="scroll" :data-image-src="`${baseUrl}img/bg-01.jpg`">
    <div class="container-fluid">
      <div class="row tm-brand-row">
        <div class="col-lg-4 col-11">
          <div class="tm-brand-container tm-bg-white-transparent">
            <i class="fas fa-2x fa-pen tm-brand-icon"></i>
            <div class="tm-brand-texts">
              <h1 class="text-uppercase tm-brand-name">Portfolio</h1>
              <p class="small">Than Thanh Thuan</p>
            </div>
          </div>
        </div>
        
        <!-- Navigation Component -->
        <NavBar />
      </div>

      <!-- Page Content gets injected here -->
      <RouterView />
<VisitorCounter />
      <!-- Footer -->
      <footer class="row">
        <div class="col-12 text-center">
            <p class="text-white tm-copyright-text mb-0">
                {{ $t('global.copyright') }}
            </p>
            
            <!-- ADD VISITOR COUNTER HERE -->
            <VisitorCounter />
            
        </div>
      </footer>
    </div>
  </div>
</template>