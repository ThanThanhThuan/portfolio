<script setup>
import { ref, computed } from 'vue'

const form = ref({
  password: '',
  title: '',
  description: '',
  // NEW FIELDS
  title_vi: '',
  description_vi: '',
  
  tech_stack: '',
  image_filename: '',
  link_live: '',
  link_code: ''
})

const isLoading = ref(false)
const statusMessage = ref('')
const isSuccess = ref(false)

// 1. Image Path Logic
const computedImagePath = computed(() => {
  if (!form.value.image_filename) return ''
  
  // Combine Base URL + path
  // NOTE: import.meta.env.BASE_URL usually includes the trailing slash (e.g. "/portfolio/")
  return `${import.meta.env.BASE_URL}img/projects/${form.value.image_filename.trim()}`
})

const computedImagePath0 = computed(() => {
  if (!form.value.image_filename) return ''
  
  // Combine Base URL + path
  // NOTE: import.meta.env.BASE_URL usually includes the trailing slash (e.g. "/portfolio/")
  return `img/projects/${form.value.image_filename.trim()}`
})

const isValidFilename = computed(() => {
  const name = form.value.image_filename.toLowerCase()
  // Allow empty while typing, but submit will catch it. 
  // If not empty, must have extension.
  if (!name) return true 
  return /\.(jpg|jpeg|png|webp|gif)$/.test(name)
})

// 2. URL Validation Logic (Allow Empty)
const isValidUrl = (string) => {
  if (!string || string.trim() === '') return true; // Empty is considered valid
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

// Computed checks for UI feedback (Red borders)
const isLiveLinkInvalid = computed(() => !isValidUrl(form.value.link_live))
const isCodeLinkInvalid = computed(() => !isValidUrl(form.value.link_code))

const submitProject = async () => {
  // --- VALIDATION STEPS ---
  
  // 1. Password
  if (!form.value.password) {
    alert("Please enter the admin password.")
    return
  }

  // 2. Image Filename
  if (!form.value.image_filename || !isValidFilename.value) {
    alert("Please enter a valid image filename (e.g. project.jpg)")
    return
  }

  // 3. Optional Links (Check only if they have text)
  if (!isValidUrl(form.value.link_live)) {
    alert("Live Demo Link is invalid. It must start with http:// or https://, or leave it empty.")
    return
  }
  if (!isValidUrl(form.value.link_code)) {
    alert("Code Link is invalid. It must start with http:// or https://, or leave it empty.")
    return
  }

  // --- SUBMISSION ---
  isLoading.value = true
  statusMessage.value = ''
  isSuccess.value = false

  const formData = new FormData()
  formData.append('action', 'upload_project')
  formData.append('password', form.value.password)
  formData.append('title', form.value.title)
  formData.append('description', form.value.description)
  // Vietnamese
  formData.append('title_vi', form.value.title_vi)
  formData.append('description_vi', form.value.description_vi)

  formData.append('tech_stack', form.value.tech_stack)
  formData.append('image_url', computedImagePath.value)
  
  // Send empty strings if undefined/null
  formData.append('link_live', form.value.link_live || '')
  formData.append('link_code', form.value.link_code || '')

  try {
    const apiUrl = import.meta.env.VITE_API_URL
    
    await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors'
    })

    isSuccess.value = true
    statusMessage.value = 'Project info uploaded successfully!'

    // Reset Form
    form.value.title = ''
    form.value.description = ''
    form.value.title_vi = ''
    form.value.description_vi = ''
    form.value.tech_stack = ''
    form.value.image_filename = ''
    form.value.link_live = ''
    form.value.link_code = ''

  } catch (error) {
    isSuccess.value = false
    statusMessage.value = 'Network Error.'
    console.error(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <!-- <section class="row" id="tmServices">
      <div class="col-12">
        <div class="parallax-window tm-services-parallax-header"
             data-parallax="scroll" 
             data-z-index="101"
             data-image-src="/img/bg-01.jpg"
             style="height: 300px; display: flex; align-items: center; justify-content: center;">
             
             <div class="tm-bg-black-transparent text-center" style="padding: 30px;">
                <h2 class="text-uppercase tm-services-page-title">Admin Panel</h2>
            </div>
        </div>
      </div>   
    </section> -->

    <!-- Upload Form -->
    <!-- <section class="row tm-services-parallax-header" data-parallax="scroll" data-image-src="/img/bg-01.jpg" style="height:300px; display:flex; align-items:center; justify-content:center;">
        <h2 class="text-white text-uppercase">Admin Panel</h2>
    </section> -->

    <section class="row tm-contact-row justify-content-center">
        <div class="col-lg-8">
            <form @submit.prevent="submitProject" class="tm-bg-black-transparent tm-contact-form p-5" novalidate>
              
              <h4 class="text-white mb-4 border-bottom pb-2">1. Authentication</h4>
              <div class="form-group">
                <input v-model="form.password" type="password" class="form-control rounded-0" placeholder="Secret Password" required>
              </div>

              <h4 class="text-white mb-4 mt-5 border-bottom pb-2">2. Image & Tech</h4>
              <!-- Image & Tech Inputs (Same as before) -->
              <div class="form-group">
                <label class="text-white">Image Filename</label>
                <input v-model="form.image_filename" type="text" class="form-control rounded-0" placeholder="e.g. project-1.jpg">
              </div>
               <div class="form-group">
                <input v-model="form.tech_stack" type="text" class="form-control rounded-0" placeholder="Tech Stack (e.g. Vue, JS)" required>
              </div>

              <!-- CONTENT SECTION -->
              <h4 class="text-white mb-4 mt-5 border-bottom pb-2">3. Content (English)</h4>
              <div class="form-group">
                <input v-model="form.title" type="text" class="form-control rounded-0" placeholder="Title (EN)" required>
              </div>
              <div class="form-group">
                <textarea v-model="form.description" rows="3" class="form-control rounded-0" placeholder="Description (EN)" required></textarea>
              </div>

              <!-- NEW VIETNAMESE SECTION -->
              <h4 class="text-white mb-4 mt-5 border-bottom pb-2">4. Content (Vietnamese)</h4>
              <div class="form-group">
                <input v-model="form.title_vi" type="text" class="form-control rounded-0" placeholder="Tiêu đề (VI)">
              </div>
              <div class="form-group">
                <textarea v-model="form.description_vi" rows="3" class="form-control rounded-0" placeholder="Mô tả (VI)"></textarea>
              </div>

              <!-- LINKS SECTION (Same as before) -->
              <h4 class="text-white mb-4 mt-5 border-bottom pb-2">5. Links</h4>
              <div class="row">
                  <div class="col-md-6 form-group">
                    <input v-model="form.link_live" type="url" class="form-control rounded-0" placeholder="Live Link">
                  </div>
                  <div class="col-md-6 form-group">
                    <input v-model="form.link_code" type="url" class="form-control rounded-0" placeholder="Code Link">
                  </div>
              </div>

              <div v-if="statusMessage" :class="['alert', isSuccess ? 'alert-success' : 'alert-danger', 'mt-3']">
                {{ statusMessage }}
              </div>
              <div class="text-right mt-4">
                <button type="submit" class="btn btn-primary tm-btn-submit rounded-0" :disabled="isLoading">
                  {{ isLoading ? 'Uploading...' : 'Save Project' }}
                </button>
              </div>
            </form>
        </div>
    </section>
  </div>
</template>
<style scoped>
/* Target the placeholder text specifically */
.form-control::placeholder {
    /* 50% opacity white - looks gray/dim against the dark background */
    color: rgba(255, 255, 255, 0.4) !important; 
    opacity: 1; /* Required for Firefox to respect the alpha color */
}

/* Optional: When user clicks to type, make the placeholder slightly more visible */
.form-control:focus::placeholder {
    color: rgba(255, 255, 255, 0.2) !important; /* Even fainter when typing */
}
</style>