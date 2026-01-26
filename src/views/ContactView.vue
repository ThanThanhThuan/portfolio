<script setup>
import { ref, onMounted, computed } from 'vue'
import { useI18n } from 'vue-i18n' // Import i18n

const { t, locale } = useI18n() // Destructure locale to check current language

// Reactive state for the form
const form = ref({
  contact_name: '',
  contact_email: '',
  contact_message: ''
})


// Reactive state for Validation Errors
const errors = ref({})

const isLoading = ref(false)
const statusMessage = ref('')
const isSuccess = ref(false)
const welcomeMessage = computed(() => {
  return locale.value === 'en' 
    ? 'Welcome! Your messages will be replied as soon as possible.' : 'Chào mừng! Tin nhắn của bạn sẽ được trả lời sớm nhất có thể.'
})
// Initialize Parallax
onMounted(() => {
    if (window.jQuery) {
        window.jQuery('.tm-testimonials-parallax-header').parallax();
    }
  
})

// Helper: Email Regex Validation
const isValidEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Validation Logic
const validateForm = () => {
  errors.value = {} // Reset errors
  let isValid = true

  // 1. Validate Name
  if (!form.value.contact_name.trim()) {
    
    errors.value.contact_name = locale.value === 'en' ? 'Please enter a Name.' : 'Vui lòng điền tên.'
    isValid = false
  }

  // 2. Validate Email
  if (!form.value.contact_email.trim()) {
    
    errors.value.contact_email = locale.value === 'en' ? 'Please enter an email address.' : 'Vui lòng điền địa chỉ email.'
    isValid = false
  } else if (!isValidEmail(form.value.contact_email)) {
    
    errors.value.contact_email = locale.value === 'en' ? 'Please enter a valid email address.' : 'Vui lòng điền địa chỉ email hợp lệ.'
    isValid = false
  }

  // 3. Validate Message
  if (!form.value.contact_message.trim()) {
    errors.value.contact_message = locale.value === 'en' ? 'Please enter a message.' : 'Vui lòng điền tin nhắn.'
    isValid = false
  } else if (form.value.contact_message.length < 10) {
    errors.value.contact_message = locale.value === 'en' ? 'Message must be at least 10 characters long.' : 'Tin nhắn phải có ít nhất 10 ký tự.'
    isValid = false
  }

  return isValid
}

// Clear error when user starts typing
const clearError = (field) => {
  if (errors.value[field]) {
    delete errors.value[field]
  }
}

// Submit Handler
const submitForm = async () => {
  // 1. Run Validation
  if (!validateForm()) {
    return; // Stop if validation fails
  }

  isLoading.value = true
  statusMessage.value = ''
  isSuccess.value = false

  const formData = new FormData()
  formData.append('contact_name', form.value.contact_name)
  formData.append('contact_email', form.value.contact_email)
  formData.append('contact_message', form.value.contact_message)

  try {
    const apiUrl = import.meta.env.VITE_API_URL
    
    // Send POST request
    await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' 
    })

    isSuccess.value = true
    statusMessage.value = locale.value === 'en' ? 'Message sent successfully!' : 'Tin nhắn đã được gửi thành công!'

    // Clear form and errors
    form.value.contact_name = ''
    form.value.contact_email = ''
    form.value.contact_message = ''
    errors.value = {}

  } catch (error) {
    console.error('Error:', error)
    isSuccess.value = false
    statusMessage.value = locale.value === 'en' ? 'Failed to send message. Please try again.' : 'Gửi tin nhắn không thành công. Vui lòng thử lại.'
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <!-- Header -->
    <section class="row" id="tmServices">
      <div class="col-12">
       
             <div class="tm-bg-black-transparent text-center tm-services-header tm-testimonials-header">
                <h2 class="text-uppercase tm-services-page-title tm-testimonials-page-title">{{ $t('nav.contact') }}</h2>
           <h4>
               {{ welcomeMessage }}
           </h4>
            </div>
        
      </div>   
    </section>

    <!-- Contact Form Section -->
    <section class="row tm-contact-row">
        <div class="col-lg-6 tm-contact-col-left">
            
            <!-- Added @submit.prevent to handle submission via Vue -->
              <form @submit.prevent="submitForm" id="tmContactForm" class="tm-bg-black-transparent tm-contact-form" novalidate>
              
              <!-- Name Field -->
              <div class="form-group">
                <input 
                  v-model="form.contact_name"
                  @input="clearError('contact_name')"
                  type="text" 
                  id="contact_name" 
                  class="form-control rounded-0 border-top-0 border-right-0 border-left-0"
                  :class="{ 'is-invalid': errors.contact_name }"
                  :placeholder="$t('contact.name')"
                >
                <div class="invalid-feedback">
                  {{ errors.contact_name }}
                </div>
              </div>
              
              <!-- Email Field -->
              <div class="form-group">
                <input 
                  v-model="form.contact_email"
                  @input="clearError('contact_email')"
                  type="email" 
                  id="contact_email" 
                  class="form-control rounded-0 border-top-0 border-right-0 border-left-0" 
                  :class="{ 'is-invalid': errors.contact_email }"
                  placeholder="Email" 
                >
                <div class="invalid-feedback">
                  {{ errors.contact_email }}
                </div>
              </div>
              
              <!-- Message Field -->
              <div class="form-group">
                <textarea 
                  v-model="form.contact_message"
                  @input="clearError('contact_message')"
                  rows="6" 
                  id="contact_message" 
                  class="form-control rounded-0 border-top-0 border-right-0 border-left-0" 
                  :class="{ 'is-invalid': errors.contact_message }"
                  :placeholder="$t('contact.message')"
                ></textarea>
                <div class="invalid-feedback">
                  {{ errors.contact_message }}
                </div>
              </div>

              <!-- Status Message (Success/Fail from API) -->
              <div v-if="statusMessage" :class="['alert', isSuccess ? 'alert-success' : 'alert-danger']">
                {{ statusMessage }}
              </div>

              <div class="text-right">
                <button 
                  type="submit" 
                  class="btn btn-primary tm-btn-submit rounded-0"
                  :disabled="isLoading"
                >
                  {{ isLoading ? locale.value === 'en' ? 'Sending...' : 'Đang gửi...' : $t('contact.submit') }}
                </button>
              </div>

            </form>
        </div>

        <div class="col-lg-6 tm-contact-col-right">
            <div class="tm-bg-black-transparent tm-contact-text">
                <i class="mx-auto mb-5 fas fa-3x fa-address-card tm-app-feature-icon"></i>
                <h3 class="tm-service-tab-title">Than Thanh Thuan</h3>
                <p v-if="$i18n.locale === 'en'" class="tm-service-tab-p">
                    Full-stack developer.
                    Apps for business and everyone. <br />
                    25+ years of experiences.<br />
                    Freelancer on Upwork and other platforms.
                </p>
                <p v-else class="tm-service-tab-p">
                    Lập trình viên full-stack.
                    Ứng dụng cho doanh nghiệp và mọi người. <br />
                    Hơn 25 năm kinh nghiệm.<br />
                    Freelancer trên Upwork và các nền tảng khác.
                </p>

                <p class="mb-0">
                    Ho Chi Minh City, Vietnam
                </p>
            </div>
        </div>
    </section>
  </div>
</template>