<script setup lang="ts">
const userStore = useUserStore()
// 使用單一變數管理當前顯示的表單
const currentForm = ref<'login' | 'forgetPassword' | 'changePassword'>('login')

const showVerifyEmailForm = () => {
  currentForm.value = 'forgetPassword'
}

const showNewPasswordForm = () => {
  currentForm.value = 'changePassword'
}

const showLoginForm = () => {
  currentForm.value = 'login'
}

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
        <div v-if="currentForm == 'login'" class="flex flex-col space-y-2">
          <p class="font-bold text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-4xl font-bold text-white">立即開始旅程</h1>
        </div>
        <div v-else-if="currentForm === 'forgetPassword'" class="flex flex-col space-y-2">
          <p class="font-bold text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-4xl font-bold text-white">驗證註冊信箱</h1>
        </div>
        <div v-else-if="currentForm === 'changePassword'" class="flex flex-col space-y-2">
          <p class="font-bold text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-4xl font-bold text-white">重設密碼</h1>
        </div>

        <!-- Login Section -->
        <div class="w-3/4">
          <!-- 根據 currentForm 的值顯示對應的表單 -->
          <FormsLoginForm
            v-if="currentForm === 'login'"
            @toggle-forget-password="showVerifyEmailForm"
          />
          <FormsForgetPasswordVerifyEmailForm
            v-else-if="currentForm === 'forgetPassword'"
            @toggle-change-password="showNewPasswordForm"
          />
          <FormsForgetPasswordNewPasswordForm
            v-else-if="currentForm === 'changePassword'"
            @toggle-login="showLoginForm"
          />
        </div>
      </div>
    </section>
    <VerifyLoading v-if="userStore.isLoading" />
  </div>
</template>

<style scoped></style>
