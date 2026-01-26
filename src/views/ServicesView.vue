<script setup>
import { ref, onMounted } from 'vue'

const activeTab = ref('tab1')

const selectTab = (tab) => {
  activeTab.value = tab
}

onMounted(() => {
    // Re-trigger parallax for the inner header on this page
    if (window.jQuery) {
        window.jQuery('.tm-services-parallax-header').parallax();
    }
})
</script>

<template>
  <div>
    <!-- Services header -->
    <section class="row" id="tmServices">
      <div class="col-12">
        <div class="parallax-window tm-services-parallax-header"
             data-parallax="scroll"
             data-z-index="101"
             data-image-src="/img/coffee-glass.jpg">
             <div class="tm-bg-black-transparent text-center tm-services-header">
                <h2 class="text-uppercase tm-services-page-title">Our Services</h2>
                <p class="tm-services-description mb-0 small">
                    This is a parallax movement background image "coffee glass".
                </p>
            </div>
        </div>
      </div>  

      <div class="col-12">
        <div class="tm-bg-black-transparent tm-services-detail-box">
            <p>Aenean convallis justo purus, id pulvinar enim finibus vitae. </p>
        </div>
      </div> 

      <div class="col-12 tm-tabs-container">
          <div class="tm-tab-links">
                <ul class="tabs clearfix">
                    <li>
                        <a href="#" @click.prevent="selectTab('tab1')" :class="{ active: activeTab === 'tab1' }">
                            <div class="icon-wrap"><i class="fas fa-2x fa-leaf"></i></div>
                            Service Tab One                        
                        </a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="selectTab('tab2')" :class="{ active: activeTab === 'tab2' }">
                            <div class="icon-wrap"><i class="fab fa-2x fa-canadian-maple-leaf"></i></div>
                            Service Tab Two             
                        </a>
                    </li>
                    <li>
                        <a href="#" @click.prevent="selectTab('tab3')" :class="{ active: activeTab === 'tab3' }">
                            <div class="icon-wrap"><i class="fab fa-2x fa-pagelines"></i></div>
                            Service Tab Three             
                        </a>
                    </li>                    
                </ul>
            </div>  
            <div class="tm-tab-contents">
                <div class="tabgroup">
                    <div v-show="activeTab === 'tab1'">                            
                        <div class="text-content">
                            <h3 class="tm-service-tab-title">Service Tab One</h3>
                            <p class="tm-service-tab-p">Etiam egestas metus vitae est interdum...</p>                            
                        </div>
                    </div>
                    <div v-show="activeTab === 'tab2'">
                        <div class="text-content">
                            <h3 class="tm-service-tab-title">Service Tab Two</h3>
                            <p class="tm-service-tab-p">Nam consequat, leo vitae aliquet dignissim...</p>                            
                        </div>
                    </div>
                    <div v-show="activeTab === 'tab3'">
                        <div class="text-content">
                            <h3 class="tm-service-tab-title">Service Tab Three</h3>
                            <p class="tm-service-tab-p">Mauris turpis libero, iaculis non dictum ac...</p>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>     
    </section>
  </div>
</template>