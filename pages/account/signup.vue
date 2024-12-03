<script setup lang="ts">
const currentStep = ref(1)
const nextStep = () => {
  currentStep.value++
}
const prevStep = () => {
  currentStep.value--
}
const changeStep = (result: boolean) => {
  if (result) {
    nextStep()
  }
}
definePageMeta({
  layout: 'account-layout'
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
          <h1 class="text-4xl font-bold text-white">立即註冊</h1>
        </div>
        <ol class="flex items-center text-center text-sm font-bold">
          <li
            class="after:border-1 flex items-center justify-between after:mx-4 after:hidden after:h-1 after:w-10 after:border-b after:border-gray-300 sm:after:inline-block sm:after:content-['']"
            :class="{
              'text-white': currentStep === 1,
              'text-primary-300': currentStep > 1
            }"
          >
            <div class="flex flex-col items-center justify-center space-y-2">
              <Icon name="mdi:numeric-1-circle" class="me-2 h-8 w-8" />
              <span class="text-lg">輸入信箱及密碼</span>
            </div>
          </li>
          <li
            class="after:border-1 flex items-center after:mx-4 after:hidden after:h-1 after:w-10 after:border-b after:border-gray-300 sm:after:inline-block sm:after:content-['']"
            :class="{
              'text-white': currentStep === 2,
              'text-primary-300': currentStep > 2,
              'text-white/50': currentStep < 2
            }"
          >
            <div class="flex flex-col items-center justify-center space-y-2">
              <Icon name="mdi:numeric-2-circle" class="me-2 h-8 w-8" />
              <span class="text-lg">填寫基本資料</span>
            </div>
          </li>
          <li
            class="flex items-center"
            :class="{
              'text-primary-300': currentStep > 2,
              'text-white/50': currentStep < 3
            }"
          >
            <div class="flex flex-col items-center justify-center space-y-2">
              <Icon name="mdi:numeric-3-circle" class="me-2 h-8 w-8" />
              <span class="text-lg">完成註冊</span>
            </div>
          </li>
        </ol>
        <!-- Signup Step One Section -->
        <div class="w-3/4">
          <FormsSignupEmailPasswordForm v-if="currentStep === 1" @next="changeStep" />
          <FormsSignupPersonalInfoForm v-else-if="currentStep === 2" @submit="nextStep" />
          <div v-else class="mt-14 flex flex-col items-center justify-center text-white">
            <div class="mb-10 flex items-center justify-center space-x-5">
              <Icon class="h-10 w-10 rounded-full bg-green-500" icon="material-symbols:check" />
              <div class="flex flex-col space-y-2 font-bold">
                <h1 class="text-4xl">恭喜，Jessica！</h1>
                <p class="text-2xl">您已註冊成功</p>
              </div>
            </div>
            <p class="font-medium">
              我們已發送詳細註冊資訊至你的電子信箱，<br />請查看您的電子信箱，謝謝您。
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
