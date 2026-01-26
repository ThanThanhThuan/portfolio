<script setup>
import { onMounted, ref, nextTick, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const subtest = computed(() => {
  return locale.value === 'vi' 
    ? 'Ý kiến thực sự của khách hàng về dịch vụ của tôi trên Upwork. Nhấn vào các ô vuông nhỏ để di chuyển.'
    : 'Real client reviews about my services on Upwork. Click the small squares to move.'
})
// 1. Rename your old list to _en
const clientReviews_en = [
  "An awesome contractor to work with and I would hire him again any time. Great job, knew what he was doing, had good design and skills.",
  "Precise and punctual, recommended",
  "Great professional. Highly recommended.",
  "Than was very proactive and helpful trying to understand what is needed and providing the optimal solution.",
  "Than is great freelancer, he is easy to work with, he has good communication skills, asks the right questions to keep the project moving, and we're glad we found him.",
  "This is the second project we have with Than and the quality of his work is very good, he's very responsive to our suggestions and also very cooperative.",
  "Excellent work Than, I wish we continue working together in future projects.",
  "Than did a fine job of delivering what I needed very quickly. I highly recommend him.",
  "Another great experience. Very easy to communicate with. Did a great job understanding the complicated specs of the project.",
  "Than is a really good coder and I highly recommend his services.",
  "Fantastic job understanding the requirements and completing the job as requested. Great communication and fast response with requested changes or clarification of requirements. Will certainly use again. Can't say enough about the quality and communication!",
  "Good work experience with this Freelancer and hope to work him again later.",
  "Excellent work as always! Is able to pursue a specific programming path if needed but is also flexible and can find alternative solutions that might be more efficient.",
  "Great work - is able to take the vision and successfully implement it.",
  "Creative and resourceful programmer who did exactly what I needed!",
  "What to say about THAN… Exactly deliver the product what I required. I have suggest countless changes to him and THAN Deliver that in time with precision Very Fast. Accurate Understanding of every problem is great I will work with him next time. and recommend him to everyone.",
  "Great work on my VB .NET project. He was very fast and quickly worked through testing and development to deliver a quality solution. Very pleased and would use again.",
  "Great at communicating, understanding the clients requirements and delivering the solution appropriately.",
  "This is the first time I have worked with Than and will surely work with him in the future. He is intelligent, asks when needed and he is keen on the quality of his work. I recommend him if you need a programmer.",
  "Competent and reliable developer. He provided what I requested in a few hours.",
  "Perfect as always, thanks",
  "Professional skilled developer and good Communicator.",
  "Than did a great job. He understood what was needed and accomplished it, fulfilling my expectations.",
  "Great as usual.",
  "Great work. Very fast.",
  "Great professional. Highly recommended.",
  "It was great working with this freelancer. Every aspect of his service was top notch. Outstanding. Thanks!",
  "Fast as well as great communication !"
]

// 2. Add the Vietnamese List
const clientReviews_vi = [
  "Một nhà thầu tuyệt vời để hợp tác và tôi sẽ thuê anh ấy lại bất cứ lúc nào. Công việc tuyệt vời, biết rõ mình đang làm gì, có thiết kế và kỹ năng tốt.",
  "Chính xác và đúng giờ, rất đáng giới thiệu.",
  "Chuyên nghiệp tuyệt vời. Rất đáng giới thiệu.",
  "Than rất chủ động và hữu ích trong việc cố gắng hiểu những gì cần thiết và cung cấp giải pháp tối ưu.",
  "Than là một freelancer tuyệt vời, anh ấy dễ làm việc cùng, có kỹ năng giao tiếp tốt, đặt ra những câu hỏi đúng để dự án tiến triển, và chúng tôi rất vui vì đã tìm thấy anh ấy.",
  "Đây là dự án thứ hai chúng tôi hợp tác với Than và chất lượng công việc của anh ấy rất tốt, anh ấy rất nhanh nhạy với các đề xuất của chúng tôi và cũng rất hợp tác.",
  "Công việc xuất sắc Than, tôi hy vọng chúng ta sẽ tiếp tục hợp tác trong các dự án tương lai.",
  "Than đã hoàn thành xuất sắc những gì tôi cần rất nhanh chóng. Tôi rất khuyến khích anh ấy.",
  "Một trải nghiệm tuyệt vời khác. Rất dễ giao tiếp. Đã làm rất tốt trong việc hiểu các thông số kỹ thuật phức tạp của dự án.",
  "Than là một lập trình viên thực sự giỏi và tôi rất khuyến khích sử dụng dịch vụ của anh ấy.",
  "Công việc tuyệt vời trong việc hiểu các yêu cầu và hoàn thành công việc theo yêu cầu. Giao tiếp tuyệt vời và phản hồi nhanh chóng với các yêu cầu thay đổi hoặc làm rõ yêu cầu. Chắc chắn sẽ sử dụng lại dịch vụ này. Không thể nói hết lời khen ngợi về chất lượng và khả năng giao tiếp!",
  "Trải nghiệm làm việc tốt với Freelancer này và hy vọng sẽ hợp tác với anh ấy lần nữa trong tương lai.",
  "Công việc xuất sắc như mọi khi! Có khả năng theo đuổi một hướng lập trình cụ thể nếu cần nhưng cũng linh hoạt và có thể tìm ra các giải pháp thay thế hiệu quả hơn.",
  "Công việc tuyệt vời - có khả năng nắm bắt tầm nhìn và thực hiện thành công.",
  "Lập trình viên sáng tạo và tháo vát, đã làm chính xác những gì tôi cần!",
  "Nói gì về THAN… Chính xác là sản phẩm tôi yêu cầu. Tôi đã đề xuất vô số thay đổi cho anh ấy và THAN đã hoàn thành đúng thời hạn với độ chính xác rất nhanh. Hiểu rõ mọi vấn đề là điều tuyệt vời. Tôi sẽ làm việc với anh ấy lần sau và giới thiệu anh ấy cho mọi người.",
  "Công việc tuyệt vời trên dự án VB .NET của tôi. Anh ấy rất nhanh và đã hoàn thành việc kiểm thử và phát triển để cung cấp một giải pháp chất lượng. Rất hài lòng và sẽ sử dụng lại dịch vụ này.",
  "Giao tiếp tuyệt vời, hiểu rõ yêu cầu của khách hàng và cung cấp giải pháp phù hợp.",
  "Đây là lần đầu tiên tôi làm việc với Than và chắc chắn sẽ tiếp tục hợp tác với anh ấy trong tương lai. Anh ấy thông minh, biết hỏi khi cần và rất chú trọng đến chất lượng công việc. Tôi khuyên bạn nên chọn anh ấy nếu cần một lập trình viên.",
  "Lập trình viên giỏi và đáng tin cậy. Anh ấy đã hoàn thành yêu cầu của tôi chỉ trong vài giờ.",
  "Hoàn hảo như mọi khi, cảm ơn!",
  "Lập trình viên chuyên nghiệp, tay nghề cao và giao tiếp tốt.",
  "Than đã làm rất tốt. Anh ấy hiểu rõ những gì cần thiết và hoàn thành nó, đáp ứng kỳ vọng của tôi.",
  "Tuyệt vời như thường lệ.",
  "Công việc tuyệt vời. Rất nhanh chóng.",
  "Chuyên nghiệp tuyệt vời. Rất đáng giới thiệu.",
  "Thật tuyệt vời khi được làm việc với lập trình viên tự do này. Mọi khía cạnh trong dịch vụ của anh ấy đều tuyệt vời. Xuất sắc. Cảm ơn!",
  "Nhanh chóng và giao tiếp tuyệt vời!"
]

// 3. Computed Property to switch lists automatically
const displayedReviews = computed(() => {
  return locale.value === 'vi' ? clientReviews_vi : clientReviews_en
})

// Helper to init slick (to avoid code duplication)
const initSlick = () => {
  if (window.jQuery) {
    window.jQuery('.tm-carousel').slick({
      dots: true,
      infinite: true,
      arrows: false,
      speed: 600,
      slidesToShow: 3,
      slidesToScroll: 3,
      responsive: [
        { breakpoint: 1024, settings: { slidesToShow: 2, slidesToScroll: 2, infinite: true, dots: true } },
        { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
        { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } }
      ]
    });
  }
}

// 4. Watcher: When language changes, destroy and re-init Slick
watch(locale, async () => {
  if (window.jQuery) {
    // Destroy existing carousel to avoid glitches
    try {
        window.jQuery('.tm-carousel').slick('unslick');
    } catch(e) {} // ignore error if not initialized
    
    // Wait for DOM to update with new text
    await nextTick()
    
    // Re-initialize
    initSlick()
  }
})

onMounted(async () => {
    if (window.jQuery) {
        window.jQuery('.tm-testimonials-parallax-header').parallax();
    }
    await nextTick()
    initSlick()
})
</script>
<template>
  <div>
    <!-- Testimonials header -->
    <section class="row" id="tmServices">
      <div class="col-12">
     
             <div class="tm-bg-black-transparent text-center tm-services-header tm-testimonials-header">
                <h2 class="text-uppercase tm-services-page-title tm-testimonials-page-title">{{ $t('nav.testimonials') }}</h2>
                  <h4>
            {{ subtest }}
          </h4>
            </div>
           
       
      </div>   
    </section>

<section class="row tm-testimonials-section">
    <div class="col-12 tm-carousel">              
        
        <!-- USE displayedReviews HERE -->
        <div v-for="(review, index) in displayedReviews" :key="index" class="tm-bg-black-transparent tm-testimonial-box text-center">
          
          <div class="tm-person-img-container">
            <img 
              :src="`/img/person-${(index % 3) + 1}.png`" 
              alt="Image" 
              class="img-fluid mx-auto"
            />
          </div>              
          
          <h3 class="tm-about-name tm-uppercase">
            {{ locale === 'vi' ? 'Ý kiến khách hàng' : 'Client Review' }}
          </h3>
          
          <p class="tm-about-description">
            "{{ review }}"
          </p>
        </div>

  </div>
</section>

    <!-- NEW SECTION: 3/4 Width Image -->
    <section class="row mb-5 pb-5">
      <div class="col-12 text-center">
        <!-- 
             style="width: 75%" makes it 3/4 of screen width 
             mx-auto centers it block-level (if needed)
             mb-5 pb-5 adds spacing so it doesn't touch the footer
        -->
        <img 
          src="/img/upwork8k.png" 
          alt="Bottom Banner" 
          class="img-fluid shadow-lg"
          style="width: 75%; height: auto; border-radius: 5px; display: inline-block;"
        />
      </div>
    </section>
  </div>
</template>
<style scoped>
/* ... your existing styles ... */

/* 1. Inactive Dots: Make them semi-transparent white */
:deep(.slick-dots li button::before) {
    font-size: 14px;             /* Size of the dot */
    /*color: rgba(255, 255, 255, 0.5) !important; /* 50% White */
    color: #ffffff !important;   /* 100% White */
    opacity: 1;                  /* Force our custom color to show */
}

/* 2. Active Dot: Make it bright white */
:deep(.slick-dots li.slick-active button::before) {
    /*color: #ffffff !important;   /* 100% White */
    color:yellow !important;   /* Custom Color */
    opacity: 1;                  /* Force our custom color to show */
}

/* Optional: Move them down slightly if they overlap text */
:deep(.slick-dots) {
    bottom: -30px; 
}
</style>
