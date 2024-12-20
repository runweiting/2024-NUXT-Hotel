<script setup lang="ts">
const userStore = useUserStore()
const currentStep = ref(1)
const nextStep = () => {
  currentStep.value++
}

const setIconName = (step: number): string => {
  if (currentStep.value > step || currentStep.value === 3) {
    return 'mdi:check-circle'
  }
  return `mdi:numeric-${step}-circle`
}
const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}
const changeStep = (result: boolean) => {
  if (result) {
    nextStep()
  }
}

const reset = () => {
  currentStep.value = 1
  userStore.resetState()
}

useHeadSafe({
  title: '會員註冊'
})
</script>

<template>
  <div>
    <section class="flex overflow-hidden">
      <div class="hidden md:block md:w-1/2">
        <picture>
          <source srcset="/images/login-hero.png" media="(min-width: 640px)" />
          <NuxtImg
            src="/images/login-hero.png"
            alt="login-hero"
            class="h-[600px] w-full object-cover md:h-[650px]"
          />
        </picture>
      </div>
      <!-- signup Section -->
      <div
        class="deco-line-horizontal relative z-10 flex w-full flex-col items-start justify-start gap-4 p-10 sm:gap-8 sm:p-12 md:w-1/2 md:gap-4 md:p-10 lg:gap-8 lg:px-20"
      >
        <div class="flex flex-col gap-2 font-bold">
          <p class="text-sm text-primary-300">享樂酒店，誠摯歡迎</p>
          <h1 class="text-3xl text-white">立即註冊</h1>
        </div>
        <ol
          v-if="!userStore.error"
          class="flex flex-col items-start gap-2 font-bold sm:flex-row sm:text-center md:flex-col md:text-sm lg:flex-row"
        >
          <li
            class="after:border-1 after:mx-4 after:hidden after:h-1 after:w-10 after:border-b after:border-gray-300 sm:flex sm:items-center sm:after:inline-block sm:after:content-[''] md:after:hidden lg:after:inline-block"
            :class="{
              'text-white': currentStep === 1,
              'text-primary-300': currentStep > 1
            }"
            @click="prevStep"
          >
            <div class="flex items-center justify-center gap-2 sm:flex-col md:flex-row lg:flex-col">
              <Icon :name="setIconName(1)" class="h-8 w-8" />
              <span class="leading-tight md:text-lg md:leading-tight">輸入信箱及密碼</span>
            </div>
          </li>
          <li
            class="after:border-1 after:mx-4 after:hidden after:h-1 after:w-10 after:border-b after:border-gray-300 sm:flex sm:items-center sm:after:inline-block sm:after:content-[''] md:after:hidden lg:after:inline-block"
            :class="{
              'text-white': currentStep === 2,
              'text-primary-300': currentStep > 2,
              'text-white/50': currentStep < 2
            }"
          >
            <div class="flex items-center justify-center gap-2 sm:flex-col md:flex-row lg:flex-col">
              <Icon :name="setIconName(2)" class="h-8 w-8" />
              <span class="leading-tight md:text-lg md:leading-tight">填寫基本資料</span>
            </div>
          </li>
          <li
            :class="{
              'text-primary-300': currentStep > 2,
              'text-white/50': currentStep < 3
            }"
          >
            <div class="flex items-center justify-center gap-2 sm:flex-col md:flex-row lg:flex-col">
              <Icon :name="setIconName(3)" class="h-8 w-8" />
              <span class="leading-tight md:text-lg md:leading-tight">完成註冊</span>
            </div>
          </li>
        </ol>
        <!-- Signup Section -->
        <div class="w-full">
          <FormsSignupEmailPasswordForm v-if="currentStep === 1" @next="changeStep" />
          <FormsSignupProfileForm v-else-if="currentStep === 2" @submit="nextStep" />
          <div
            v-else
            class="my-4 flex flex-col items-center justify-center text-white sm:items-start"
          >
            <div v-if="!userStore.error">
              <div class="flex flex-col items-start gap-8">
                <div class="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-4">
                  <Icon
                    class="h-10 w-10 flex-shrink-0 rounded-full bg-green-500"
                    icon="material-symbols:check"
                  />
                  <div class="flex flex-col gap-2 font-bold">
                    <h1 class="text-4xl">恭喜，{{ userStore.userInfo?.name }}！</h1>
                    <p class="text-2xl">您已註冊成功</p>
                  </div>
                </div>
                <p class="font-medium">
                  我們已發送詳細註冊資訊至
                  <span class="underline underline-offset-2">
                    {{ userStore.userInfo?.email }}
                  </span>
                  ，<br />請查看您的電子信箱，謝謝您。
                </p>
              </div>
            </div>
            <div v-else class="flex flex-col gap-4">
              <p class="text-xl font-medium">{{ userStore.error }}</p>
              <button type="button" class="btn" :disabled="userStore.isLoading" @click="reset">
                請重新註冊
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped></style>
