<script setup>
import { ref, onMounted } from 'vue'

const totalVisits = ref('...')
const isLoading = ref(true)

onMounted(async () => {
  const apiUrl = import.meta.env.VITE_API_URL

  // 1. TRACK VISIT (Increment)
  // Only do this if user hasn't visited in this session
  if (!sessionStorage.getItem('has_visited_site')) {
    try {
      const formData = new FormData()
      formData.append('action', 'track_visit')
      
      await fetch(apiUrl, {
        method: 'POST',
        body: formData,
        mode: 'no-cors' 
      })
      
      sessionStorage.setItem('has_visited_site', 'true')
    } catch (e) {
      console.error("Tracking failed", e)
    }
  }

  // 2. FETCH COUNT (Read & Display)
  // We do this every time page loads so the number is fresh
  try {
    // Construct URL: script.google.com/.../exec?type=get_visitor_count
    const fetchUrl = `${apiUrl}?type=get_visitor_count`
    
    const response = await fetch(fetchUrl)
    const data = await response.json()
    
    totalVisits.value = data.count
  } catch (error) {
    console.error("Fetch count failed", error)
    totalVisits.value = 'N/A'
  } finally {
    isLoading.value = false
  }
})
</script>

<template>
  <div class="visitor-counter text-center text-white-50 mt-3 small">
    <span v-if="isLoading">
        <i class="fas fa-spinner fa-spin"></i> Loading visits...
    </span>
    <span v-else>
        <i class="fas fa-eye"></i> Total Visits: <strong>{{ totalVisits }}</strong>
    </span>
  </div>
</template>

<style scoped>
.visitor-counter {
    font-size: 0.85rem;
    opacity: 0.7;
}
</style>