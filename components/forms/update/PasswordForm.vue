<script setup lang="ts">
const { oldPassword, newPassword, confirmPassword, errors, handlePassword } =
  useUpdatePasswordForm()
const userStore = useUserStore()
const emit = defineEmits<{
  (e: 'toggle-edit-password'): void
}>()

const onSubmit = async () => {
  const isValid = await handlePassword()
  if (isValid) {
    emit('toggle-edit-password')
  }
}
</script>

<template>
  <div>
    <form class="flex flex-col gap-4" @submit.prevent="onSubmit">
      <fieldset>
        <legend id="oldPasswordLegend" class="flex items-start">
          舊密碼
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="oldPassword"
          v-model="oldPassword"
          type="password"
          placeholder="請輸入舊密碼"
          aria-describedby="oldPasswordLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.oldPassword" />
      </fieldset>
      <fieldset>
        <legend id="newPasswordLegend" class="flex items-start">
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
      <fieldset>
        <legend id="confirmPasswordLegend" class="flex items-start">
          確認新密碼
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="confirmPassword"
          v-model="confirmPassword"
          type="password"
          placeholder="請再次輸入新密碼"
          aria-describedby="confirmPasswordLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.confirmPassword" />
      </fieldset>
      <button
        type="submit"
        class="btn-outline self-end rounded-md text-primary-500 hover:text-white"
        :disabled="userStore.isLoading"
      >
        儲存設定
      </button>
    </form>
  </div>
</template>

<style scoped></style>
