import { createI18n } from 'vue-i18n'

const messages = {
    en: {
        nav: {
            home: 'Home',
            about: 'About',
            services: 'Services',
            testimonials: 'Testimonials',
            contact: 'Contact',
            language: 'English',
            contact_me: 'Contact Me',
            projects: 'Projects'
        },
        home: {
            slogan: 'I can develop',
            title: 'Apps for Business and Everyone',
            desc: 'Full-stack developer',
            btn: 'Learn More',
            feat_perf: 'Language',
            feat_support: 'Database',
            feat_marketing: 'UI/UX',
            introduction: 'Introduction'
        },
        global: {
            copyright: 'Copyright © 2020 App Landing Page. Designed by TemplateMo'
        },
        contact: {
            name: 'Name',
            email: 'Email',
            message: 'Message',
            submit: 'Submit'
        }
    },
    vi: {
        nav: {
            home: 'Trang chủ',
            about: 'Giới thiệu',
            services: 'Dịch vụ',
            testimonials: 'Đánh giá',
            contact: 'Liên hệ',
            language: 'Tiếng Việt',
            contact_me: 'Liên hệ với tôi',
            projects: 'Dự án'
        },
        home: {
            slogan: 'Tôi phát triển',
            title: 'Ứng dụng cho doanh nghiệp và mọi người',
            desc: 'Lập trình viên full-stack',
            btn: 'Xem thêm',
            feat_perf: 'Ngôn ngữ',
            feat_support: 'Cơ sở dữ liệu',
            feat_marketing: 'Giao diện',
            introduction: 'Giới thiệu'
        },
        global: {
            copyright: 'Bản quyền © 2020 App Landing Page. Thiết kế bởi TemplateMo'
        },
        contact: {
            name: 'Họ và tên',
            email: 'Email',
            message: 'Tin nhắn',
            submit: 'Gửi'
        }
    }
}

const i18n = createI18n({
    legacy: false, // Use Composition API mode
    globalInjection: true,
    locale: 'en', // Default locale
    fallbackLocale: 'en',
    messages
})

export default i18n