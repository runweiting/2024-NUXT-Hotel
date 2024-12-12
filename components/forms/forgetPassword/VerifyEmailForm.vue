<script setup lang="ts">
const { verifyEmail, errors, handleVerifyEmail } = useVerifyEmailForm()
const userStore = useUserStore()
</script>

<template>
  <div>
    <form class="mb-4 flex flex-col space-y-6" @submit.prevent="handleVerifyEmail">
      <fieldset>
        <legend id="verifyEmailLegend" class="flex items-start text-white">
          驗證電子信箱
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="verifyEmail"
          v-model="verifyEmail"
          type="email"
          placeholder="請輸入註冊使用的電子信箱"
          aria-describedby="verifyEmailLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.verifyEmail" />
      </fieldset>
      <button type="submit" class="btn" :disabled="userStore.isLoading">寄送驗證碼</button>
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
