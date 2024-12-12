<script setup lang="ts">
const { signupEmail, signupPassword, errors, handleLogin } = useLoginForm()
const userStore = useUserStore()
const rememberAccount = ref<boolean>(false)

// 新增從 Cookie 讀取預設值的邏輯
const emailCookie = useCookie('signupEmail')
if (emailCookie.value) {
  signupEmail.value = emailCookie.value
  rememberAccount.value = true
}

defineEmits<{
  (e: 'toggle-forget-password'): void
}>()
</script>

<template>
  <div>
    <form class="mb-4 flex flex-col space-y-6" @submit.prevent="handleLogin">
      <fieldset>
        <legend id="signupEmailLegend" class="flex items-start text-white">
          電子信箱
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupEmail"
          v-model="signupEmail"
          type="email"
          placeholder="請輸入name@example.com"
          aria-describedby="signupEmailLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.signupEmail" />
      </fieldset>
      <fieldset>
        <legend id="signupPasswordLegend" class="flex items-start text-white">
          密碼
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupPassword"
          v-model="signupPassword"
          type="password"
          placeholder="請輸入密碼"
          aria-describedby="signupPasswordLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.signupPassword" />
      </fieldset>
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-2">
          <input
            id="rememberAccount"
            v-model="rememberAccount"
            type="checkbox"
            class="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            aria-describedby="rememberAccountLegend"
          />
          <label for="rememberAccount" class="text-white">記住帳號</label>
        </div>
        <button
          class="font-bold text-primary-300 underline underline-offset-1"
          @click="$emit('toggle-forget-password')"
        >
          忘記密碼？
        </button>
      </div>
      <button type="submit" class="btn" :disabled="userStore.isLoading">會員登入</button>
      <div class="text-white">
        <span class="me-2 font-medium">沒有會員嗎？</span>
        <NuxtLink
          to="/account/signup"
          class="font-bold text-primary-300 underline underline-offset-1"
          >前往註冊</NuxtLink
        >
      </div>
    </form>
  </div>
</template>

<style scoped></style>
