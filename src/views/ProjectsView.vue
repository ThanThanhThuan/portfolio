<script setup>
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n' // Import i18n

const { t, locale } = useI18n() // Destructure locale to check current language

const projects = ref([])
const isLoading = ref(true)
const error = ref('')

// Search & Pagination
const searchQuery = ref('')
const currentPage = ref(1)
const itemsPerPage = 6

// --- MODAL STATE ---
const showModal = ref(false)
const selectedImages = ref([]) // Changed to Array
const selectedTitle = ref('')
const currentImageIndex = ref(0) // Track current slide

// --- HELPER: Resolve Base URL ---
const resolvePath = (path) => {
  if (!path) return ''
  if (path.startsWith('http')) return path
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return import.meta.env.BASE_URL + cleanPath
}

// --- HELPER: Parse Comma Separated URLs ---
const parseImages = (rawString) => {
    if (!rawString) return []
    // Split by comma, trim whitespace, and resolve path for each
    return rawString.split(',').map(url => resolvePath(url.trim()))
}

onMounted(async () => {
  try {
    const response = await fetch(import.meta.env.VITE_API_URL)
    let data = await response.json()

    // --- SORTING LOGIC ---
    data.sort((a, b) => {
      // 1. Primary Sort: Has "Live Link" (Priority)
      // !!a.link_live converts the string to a boolean (true if exists, false if empty)
      const aHasLive = !!a.link_live;
      const bHasLive = !!b.link_live;

      if (aHasLive && !bHasLive) {
        return -1; // 'a' comes first
      }
      if (!aHasLive && bHasLive) {
        return 1; // 'b' comes first
      }

      // 2. Secondary Sort: Timestamp (Newest first)
      // If both have links (or both don't), sort by date descending
      return new Date(b.timestamp) - new Date(a.timestamp);
    });

    projects.value = data
  } catch (err) {
    console.error(err)
    error.value = "Failed to load projects."
  } finally {
    isLoading.value = false
  }
})

// --- COMPUTED HELPERS ---

// Helper to get correct language text
const getTitle = (p) => {
    // If locale is Vietnamese AND title_vi exists, use it. Else use English.
    return (locale.value === 'vi' && p.title_vi) ? p.title_vi : p.title
}

const getDescription = (p) => {
    return (locale.value === 'vi' && p.description_vi) ? p.description_vi : p.description
}

// Update Search to check BOTH languages so it works regardless of current view
const filteredProjects = computed(() => {
  if (!searchQuery.value) return projects.value
  
  const lowerQuery = searchQuery.value.toLowerCase()
  return projects.value.filter(p => {
    // Search in English fields
    const enMatch = p.title.toLowerCase().includes(lowerQuery) || 
                    p.description.toLowerCase().includes(lowerQuery)
    
    // Search in Vietnamese fields
    const viMatch = (p.title_vi && p.title_vi.toLowerCase().includes(lowerQuery)) || 
                    (p.description_vi && p.description_vi.toLowerCase().includes(lowerQuery))
                    
    const techMatch = p.tech_stack.toLowerCase().includes(lowerQuery)
    
    return enMatch || viMatch || techMatch
  })
})

const paginatedProjects = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return filteredProjects.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(filteredProjects.value.length / itemsPerPage))

// Actions
const prevPage = () => { if (currentPage.value > 1) currentPage.value-- }
const nextPage = () => { if (currentPage.value < totalPages.value) currentPage.value++ }
const openImageModal = (rawUrlString, title) => {
  selectedImages.value = parseImages(rawUrlString) // Parse string to array
  selectedTitle.value = title
  currentImageIndex.value = 0 // Always start at first image
  showModal.value = true
}
const closeModal = () => { showModal.value = false }

// const resolvePath0 = (path) => {
//   if (!path) return ''
//   // If it's already an external link (http...), return as is
//   if (path.startsWith('http')) return path
  
//   // Remove leading slash if present (e.g. "/img..." -> "img...")
//   const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
//   // Combine with Base URL
//   return import.meta.env.BASE_URL + cleanPath
// }
// Slider Navigation
const nextSlide = () => {
    if (currentImageIndex.value < selectedImages.value.length - 1) {
        currentImageIndex.value++
    } else {
        currentImageIndex.value = 0 // Loop back to start
    }
}

const prevSlide = () => {
    if (currentImageIndex.value > 0) {
        currentImageIndex.value--
    } else {
        currentImageIndex.value = selectedImages.value.length - 1 // Loop to end
    }
}
</script>

<template>
  <div>
    <!-- Header -->
    <section class="row" id="tmServices">
      <div class="col-12">
        <!-- <div class="parallax-window tm-services-parallax-header"
             data-parallax="scroll" 
             data-z-index="101"
             data-image-src="/img/bg-01.jpg"
             style="height: 400px; display: flex; align-items: center; justify-content: center;"> -->
             
             <div class="tm-bg-black-transparent text-center tm-services-header tm-testimonials-header">
                <!-- Translate "My Projects" -->
                <h2 class="text-uppercase tm-services-page-title mb-4">
                    {{ locale === 'vi' ? 'Các Dự án của tôi' : 'My Projects' }}
                </h2>
                <h4>
                    {{ locale === 'vi' ? 'Đã thực hiện hàng chục dự án với bản demo trực tiếp' : 'Developed dozens of projects with live demos' }}
                </h4>

                <div class="input-group">
                    <input 
                      v-model="searchQuery" 
                      @input="currentPage = 1"
                      type="text" 
                      class="form-control rounded-0 border-0 p-4" 
                      :placeholder="locale === 'vi' ? 'Tìm kiếm theo tên, công nghệ...' : 'Search by title, tech stack...'"
                      style="font-size: 1.2rem;"
                    >
                </div>
            <!-- </div> -->
        </div>
      </div>   
    </section>

    <!-- Project List -->
    <section class="row tm-contact-row">
        <div class="col-12">
            <div v-if="isLoading" class="text-center text-white py-5">
                <i class="fas fa-3x fa-spinner fa-spin"></i>
            </div>

            <div v-if="!isLoading" class="row">
                <div v-for="(project, index) in paginatedProjects" :key="index" class="col-lg-4 col-md-6 mb-5">
                    <div class="tm-bg-black-transparent h-100 p-4 d-flex flex-column">
                        
                        <!-- DYNAMIC TITLE -->
                        <h3 class="tm-text-primary mb-3">{{ getTitle(project) }}</h3>
                        
                        <div class="mb-3">
                            <span v-for="tech in project.tech_stack.split(',')" :key="tech" 
                                  class="badge badge-secondary mr-1 p-2">
                                {{ tech.trim() }}
                            </span>
                        </div>

                        <!-- DYNAMIC DESCRIPTION -->
                        <p class="text-white small flex-grow-1">
                           {{ getDescription(project) }}
                        </p>

                        <div class="mt-3 border-top pt-3">
                            <button @click="openImageModal(project.image_url, getTitle(project))" 
                                    class="btn btn-info btn-sm btn-block mb-2 rounded-0">
                                <i class="fas fa-images mr-2"></i> 
                                {{ locale === 'vi' ? 'Xem ảnh' : 'View Images' }}
                            </button>

                            <div class="d-flex justify-content-between">
                                <a v-if="project.link_live" :href="project.link_live" target="_blank" class="btn btn-success btn-sm flex-fill mr-1 rounded-0">
                                    <i class="fas fa-external-link-alt mr-1"></i> Live
                                </a>
                                <a v-if="project.link_code" :href="project.link_code" target="_blank" class="btn btn-dark btn-sm flex-fill ml-1 rounded-0">
                                    <i class="fab fa-github mr-1"></i> Code
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <!-- Pagination -->
            <div v-if="totalPages > 1" class="row mt-4 mb-5">
                <div class="col-12 text-center">
                    <button @click="prevPage" :disabled="currentPage === 1" class="btn btn-secondary rounded-0 mr-2">
                        &laquo; {{ locale === 'vi' ? 'Trước' : 'Prev' }}
                    </button>
                    
                    <span class="text-white mx-3 font-weight-bold">
                        {{ locale === 'vi' ? `Trang ${currentPage} / ${totalPages}` : `Page ${currentPage} of ${totalPages}` }}
                    </span>
                    
                    <button @click="nextPage" :disabled="currentPage === totalPages" class="btn btn-secondary rounded-0 ml-2">
                        {{ locale === 'vi' ? 'Sau' : 'Next' }} &raquo;
                    </button>
                </div>
            </div>

        </div>
    </section>

    <!-- UPDATED IMAGE MODAL -->
    <div v-if="showModal" class="custom-modal-overlay" @click.self="closeModal">
        <div class="custom-modal-content">
            
            <!-- Modal Header -->
            <div class="modal-header border-0 pb-0 d-flex justify-content-between align-items-center">
                <h5 class="text-dark mb-0">{{ selectedTitle }}</h5>
                
                <!-- Counter (Only show if multiple images) -->
                <span v-if="selectedImages.length > 1" class="badge badge-secondary ml-2">
                    {{ currentImageIndex + 1 }} / {{ selectedImages.length }}
                </span>

                <button type="button" class="close ml-auto" @click="closeModal">
                    <span style="font-size: 1.5rem;">&times;</span>
                </button>
            </div>

            <!-- Modal Body / Carousel -->
            <div class="modal-body text-center position-relative p-0 mt-2">
                
                <!-- PREV Button (Only if > 1 image) -->
                <button v-if="selectedImages.length > 1" class="nav-btn prev-btn" @click.stop="prevSlide">
                    <i class="fas fa-chevron-left"></i>
                </button>

                <!-- The Image -->
                <div class="image-wrapper">
                    <img 
                        v-if="selectedImages.length > 0"
                        :src="selectedImages[currentImageIndex]" 
                        class="img-fluid" 
                        alt="Project Screenshot"
                        style="max-height: 80vh;"
                    >
                    <p v-else class="text-dark py-5">No image available</p>
                </div>

                <!-- NEXT Button (Only if > 1 image) -->
                <button v-if="selectedImages.length > 1" class="nav-btn next-btn" @click.stop="nextSlide">
                    <i class="fas fa-chevron-right"></i>
                </button>

            </div>
            
            <!-- Thumbnail Indicators (Optional, nice to have) -->
            <div v-if="selectedImages.length > 1" class="d-flex justify-content-center pb-2 mt-2">
                <span 
                    v-for="(img, idx) in selectedImages" 
                    :key="idx" 
                    class="dot-indicator"
                    :class="{ active: idx === currentImageIndex }"
                    @click="currentImageIndex = idx"
                ></span>
            </div>

        </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom Badge Styling */
.badge-secondary {
    background-color: rgba(255, 255, 255, 0.2);
    font-weight: normal;
}

/* Custom Modal Styles (No Bootstrap JS required) */
.custom-modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.85);
    z-index: 9999;
    display: flex;
    align-items: center;
    justify-content: center;
}

.custom-modal-content {
    background: white;
    padding: 10px;
    max-width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    border-radius: 4px;
    position: relative;
    animation: fadeIn 0.3s ease;
}

.custom-modal-content img {
    max-height: 80vh;
    object-fit: contain;
}

.tm-services-header {
  position: relative;
  z-index: 102;
  width: 100%;
  padding: 85px 15px 37px 15px;
}

@keyframes fadeIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
}

.tm-text-primary {
    color: #66CCFF; /* Match template theme */
}
/* Modal Structure */
.custom-modal-content {
    background: white;
    padding: 10px;
    width: 100%;
    max-width: 900px; /* Wider for gallery */
    max-height: 95vh;
    overflow: hidden; /* Prevent scroll, keep arrows visible */
    border-radius: 4px;
    display: flex;
    flex-direction: column;
}

.modal-body {
    background: #f8f9fa; /* Light gray bg for image container */
    flex-grow: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

/* Navigation Buttons */
.nav-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(0, 0, 0, 0.3);
    color: white;
    border: none;
    width: 40px;
    height: 60px;
    font-size: 20px;
    cursor: pointer;
    z-index: 10;
    transition: background 0.3s;
}

.nav-btn:hover {
    background: rgba(0, 0, 0, 0.7);
}

.prev-btn { left: 0; border-top-right-radius: 5px; border-bottom-right-radius: 5px; }
.next-btn { right: 0; border-top-left-radius: 5px; border-bottom-left-radius: 5px; }

/* Dot Indicators */
.dot-indicator {
    width: 10px;
    height: 10px;
    background-color: #ddd;
    border-radius: 50%;
    margin: 0 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}
.dot-indicator.active {
    background-color: #333;
}
</style>