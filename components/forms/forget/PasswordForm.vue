<script setup lang="ts">
const { signupEmail, verificationCode, newPassword, errors, handleForgetPassword } =
  useForgetPasswordForm()
const userStore = useUserStore()
const emit = defineEmits<{
  (e: 'toggle-login'): void
}>()
const handleSubmit = async () => {
  const isValid = await handleForgetPassword()
  if (isValid) {
    emit('toggle-login')
  }
}
</script>

<template>
  <div>
    <form class="flex flex-col space-y-6" @submit.prevent="handleSubmit">
      <fieldset>
        <legend id="signupEmailLegend" class="flex items-start text-white">
          註冊電子信箱
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupEmail"
          v-model="signupEmail"
          type="email"
          placeholder="請輸入註冊使用的電子信箱"
          aria-describedby="signupEmailLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.signupEmail" />
      </fieldset>
      <fieldset>
        <legend id="verificationCodeLegend" class="flex items-start text-white">
          驗證碼
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="verificationCode"
          v-model="verificationCode"
          type="password"
          placeholder="請輸入驗證碼"
          aria-describedby="verificationCodeLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.verificationCode" />
      </fieldset>
      <fieldset>
        <legend id="newPasswordLegend" class="flex items-start text-white">
          新密碼
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="newPassword"
          v-model="newPassword"
          type="password"
          placeholder="請輸入新密碼"
          aria-describedby="newPasswordLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.newPassword" />
      </fieldset>
      <button type="submit" class="btn" :disabled="userStore.isLoading">確認</button>
    </form>
  </div>
</template>

<style scoped></style>
