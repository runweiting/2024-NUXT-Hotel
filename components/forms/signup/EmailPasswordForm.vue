<script setup lang="ts">
import { useSignupStepOneForm } from '~/composables/useSignupStepOneForm'
import { useUserStore } from '~/stores/useUserStore'

const { signupEmail, signupPassword, confirmPassword, stepOneErrors, handleStepOne } =
  useSignupStepOneForm()
const userStore = useUserStore()
const emit = defineEmits(['next'])

const onSubmit = async () => {
  const result = await handleStepOne()
  emit('next', result)
}
</script>

<template>
  <div>
    <form class="mb-4 flex flex-col gap-6" @submit.prevent="onSubmit">
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
        <FormsErrorMessage :msg="stepOneErrors.signupEmail" />
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
        <FormsErrorMessage :msg="stepOneErrors.signupPassword" />
      </fieldset>
      <fieldset>
        <legend id="confirmPasswordLegend" class="flex items-start text-white">
          確認密碼
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="請再次輸入密碼"
          aria-describedby="confirmPasswordLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="stepOneErrors.confirmPassword" />
      </fieldset>
      <button type="submit" class="btn" :disabled="userStore.isLoading">下一步</button>
    </form>
    <div class="text-white">
      <span class="me-2 font-medium">已經有會員了嗎？</span>
      <NuxtLink to="/account/login" class="font-bold text-primary-300 underline underline-offset-1"
        >立即登入</NuxtLink
      >
    </div>
  </div>
</template>

<style scoped></style>
