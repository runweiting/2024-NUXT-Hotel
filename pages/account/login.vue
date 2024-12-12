<script setup lang="ts">
const isShowForgetPassword = ref<boolean>(false)
const showForgetPasswordForm = () => (isShowForgetPassword.value = true)

useHeadSafe({
  title: '會員登入'
})
</script>

<template>
  <div>
    <section class="flex overflow-hidden">
      <div class="w-1/2">
        <picture>
          <!-- 螢幕寬度 >= 768 px，瀏覽器優先載入 :srcset 所指定圖片 -->
          <source srcset="/images/login-hero.png" media="(min-width: 768px)" />
          <!-- <NuxtImg> 提供一個備用圖片，當沒有 <source> 標籤的圖片匹配時，就會顯示這個備用圖片 -->
          <NuxtImg
            src="/images/login-hero.png"
            alt="login-hero"
            class="h-[700px] w-full object-cover"
          />
        </picture>
      </div>
      <div
        class="signup-info relative z-10 flex w-1/2 flex-col items-center justify-start space-y-10 px-20"
      >
        <div class="flex flex-col space-y-2">
          <p class="font-bold text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-4xl font-bold text-white">立即開始旅程</h1>
        </div>

        <!-- Login Section -->
        <div class="w-3/4">
          <FormsLoginForm
            v-if="!isShowForgetPassword"
            @toggle-forget-password="showForgetPasswordForm"
          />
          <FormsForgetPasswordVerifyEmailForm v-else />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
