<script setup lang="ts">
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
      <!-- md: Hero Section -->
      <div class="hidden sm:block sm:w-1/2">
        <picture>
          <source srcset="/images/login-hero.png" media="(min-width: 640px)" />
          <NuxtImg
            src="/images/login-hero.png"
            alt="login-hero"
            class="h-[600px] w-full object-cover"
          />
        </picture>
      </div>
      <!-- Login Section -->
      <div
        class="deco-line-horizontal relative z-10 flex h-[500px] w-full flex-col items-start justify-center gap-8 p-10 sm:w-1/2 lg:px-20"
      >
        <div v-if="currentForm == 'login'" class="flex flex-col gap-2 font-bold">
          <p class="text-sm text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-3xl text-white">立即開始旅程</h1>
        </div>
        <div v-else-if="currentForm === 'forgetPassword'" class="flex flex-col gap-2 font-bold">
          <p class="text-sm text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-3xl text-white">驗證註冊信箱</h1>
        </div>
        <div v-else-if="currentForm === 'changePassword'" class="flex flex-col gap-2 font-bold">
          <p class="text-sm text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-3xl text-white">重設密碼</h1>
        </div>

        <div class="w-full">
          <!-- 根據 currentForm 的值顯示對應的表單 -->
          <FormsLoginForm
            v-if="currentForm === 'login'"
            @toggle-forget-password="showVerifyEmailForm"
          />
          <FormsForgetVerifyEmailForm
            v-else-if="currentForm === 'forgetPassword'"
            @toggle-change-password="showNewPasswordForm"
          />
          <FormsForgetPasswordForm
            v-else-if="currentForm === 'changePassword'"
            @toggle-login="showLoginForm"
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
