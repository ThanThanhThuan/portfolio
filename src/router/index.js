import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import AboutView from '../views/AboutView.vue'
import ServicesView from '../views/ServicesView.vue'
import TestimonialsView from '../views/TestimonialsView.vue'
import ContactView from '../views/ContactView.vue'
import AdminView from '../views/AdminView.vue' // Import the new view
import ProjectsView from '../views/ProjectsView.vue'
import MessagesView from '../views/MessagesView.vue'
import TestimonialsView2 from '../views/TestimonialsView2.vue'

const router = createRouter({
    history: createWebHashHistory(import.meta.env.BASE_URL),
    routes: [
        { path: '/', name: 'home', component: HomeView },
        { path: '/about', name: 'about', component: AboutView },
        { path: '/services', name: 'services', component: ServicesView },
        { path: '/testimonials', name: 'testimonials', component: TestimonialsView2 },
        { path: '/contact', name: 'contact', component: ContactView },
        { path: '/a', name: 'admin', component: AdminView },
        { path: '/projects', name: 'projects', component: ProjectsView }, // Add the new route
        { path: '/m', name: 'messages', component: MessagesView }, // Add the new route
    ],
    // Simulate anchor scrolling behavior
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        } else {
            return { top: 0 }
        }
    }
})

export default router