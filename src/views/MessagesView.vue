<script setup>
import { ref } from 'vue'

const password = ref('')
const messages = ref([])
const isLoading = ref(false)
const isAuthenticated = ref(false)
const error = ref('')

// Helper to format date
const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString()
}

const fetchMessages = async () => {
  if (!password.value) {
    alert("Please enter password")
    return
  }

  isLoading.value = true
  error.value = ''
  
  try {
    const apiUrl = import.meta.env.VITE_API_URL
    
    // Construct URL with parameters for GET request
    // e.g. script.google.com/.../exec?type=messages&password=123
    const url = `${apiUrl}?type=messages&password=${encodeURIComponent(password.value)}`
    
    const response = await fetch(url)
    const data = await response.json()

    if (data.error) {
      error.value = "Incorrect Password"
      isAuthenticated.value = false
    } else {
      messages.value = data
      isAuthenticated.value = true
    }

  } catch (err) {
    console.error(err)
    error.value = "Failed to load messages. Network error."
  } finally {
    isLoading.value = false
  }
}

// Simple Logout (just clear state)
const logout = () => {
  isAuthenticated.value = false
  messages.value = []
  password.value = ''
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
                <h2 class="text-uppercase tm-services-page-title">Inbox</h2>
                <p class="mb-0 small">Admin Message Center</p>
            </div>
        </div>
      </div>   
    </section> -->

    <section class="row tm-contact-row justify-content-center">
        <div class="col-12 col-lg-10">
            
            <!-- 1. AUTHENTICATION FORM -->
            <div v-if="!isAuthenticated" class="tm-bg-black-transparent tm-contact-form p-5 text-center">
                <h4 class="text-white mb-4">Enter Admin Password</h4>
                <div class="form-group" style="max-width: 400px; margin: 0 auto;">
                    <input 
                      v-model="password" 
                      type="password" 
                      class="form-control rounded-0 text-center" 
                      placeholder="Password" 
                      @keyup.enter="fetchMessages"
                    >
                </div>
                
                <div v-if="error" class="text-danger mt-3">{{ error }}</div>

                <button @click="fetchMessages" class="btn btn-primary tm-btn-submit rounded-0 mt-4" :disabled="isLoading">
                    {{ isLoading ? 'Checking...' : 'View Messages' }}
                </button>
            </div>

            <!-- 2. MESSAGES LIST -->
            <div v-else class="tm-bg-black-transparent p-4">
                <div class="d-flex justify-content-between align-items-center mb-4 border-bottom pb-2">
                    <h3 class="text-white">Recent Messages ({{ messages.length }})</h3>
                    <button @click="logout" class="btn btn-sm btn-secondary rounded-0">Logout</button>
                </div>

                <div v-if="messages.length === 0" class="text-center text-white py-5">
                    No messages found.
                </div>

                <!-- Message Cards -->
                <div v-else class="message-list">
                    <div v-for="(msg, index) in messages" :key="index" class="message-card mb-3 p-3">
                        <div class="d-flex justify-content-between align-items-start">
                            <div>
                                <h5 class="text-primary mb-1">{{ msg.name }}</h5>
                                <p class="text-muted small mb-2">
                                    <i class="fas fa-envelope mr-1"></i> <a :href="`mailto:${msg.email}`">{{ msg.email }}</a>
                                </p>
                            </div>
                            <span class="badge badge-dark">{{ formatDate(msg.timestamp) }}</span>
                        </div>
                        <div class="message-body mt-2 text-white">
                            {{ msg.message }}
                        </div>
                    </div>
                </div>

            </div>

        </div>
    </section>
  </div>
</template>

<style scoped>
.message-card {
    background: rgba(255, 255, 255, 0.05);
    border-left: 4px solid #66CCFF; /* Primary Theme Color */
    transition: background 0.3s;
}

.message-card:hover {
    background: rgba(255, 255, 255, 0.1);
}

.message-body {
    white-space: pre-wrap; /* Preserves line breaks from textarea */
    font-size: 0.95rem;
    line-height: 1.6;
}

a {
    color: #ccc;
    text-decoration: underline;
}
a:hover {
    color: white;
}
</style>