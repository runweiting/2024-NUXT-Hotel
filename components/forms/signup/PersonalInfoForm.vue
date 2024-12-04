<script setup lang="ts">
import { useSignupForm } from '~/composables/useSignupForm'

const { signupName, signupPhone, birthday, zipcode, cityArea, detail, errors, handleSignup } =
  useSignupForm()
const userStore = useUserStore()
const emit = defineEmits(['submit'])

const onSubmit = async () => {
  await handleSignup()
  emit('submit')
}
</script>

<template>
  <div class="max-w-md">
    <form class="grid grid-cols-1 gap-6" @submit.prevent="onSubmit">
      <fieldset>
        <legend id="signupNameLegend" class="flex items-start text-white">
          姓名
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupName"
          v-model="signupName"
          type="text"
          placeholder="請輸入姓名"
          aria-describedby="signupNameLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.signupName" />
      </fieldset>
      <fieldset>
        <legend id="signupPhoneLegend" class="flex items-start text-white">
          電話
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupPhone"
          v-model="signupPhone"
          type="text"
          placeholder="請輸入電話"
          aria-describedby="signupPhoneLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.signupPhone" />
      </fieldset>
      <fieldset>
        <legend id="signupBirthdayLegend" class="flex items-start text-white">
          出生年月日
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupBirthday"
          v-model="birthday"
          type="date"
          placeholder="請輸入生日"
          aria-describedby="signupBirthdayLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.birthday" />
      </fieldset>
      <div class="grid grid-cols-2 gap-2">
        <fieldset>
          <legend id="signupZipCodeLegend" class="flex items-start text-white">
            郵遞區號
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="signupZipCode"
            v-model="zipcode"
            type="text"
            placeholder="請輸入 3 碼郵遞區號"
            aria-describedby="signupZipCodeLegend"
            autocomplete="off"
            :disabled="userStore.isLoading"
          />
          <FormsErrorMessage :msg="errors.zipcode" />
        </fieldset>
        <fieldset>
          <legend id="signupCityAreaLegend" class="flex items-start text-white">
            城市及區域
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="signupCityArea"
            v-model="cityArea"
            type="text"
            placeholder="自動填入城市及區域"
            aria-describedby="signupCityAreaLegend"
            autocomplete="off"
            :disabled="userStore.isLoading"
            readonly
          />
        </fieldset>
      </div>
      <fieldset>
        <legend id="signupAddressLegend" class="flex items-start text-white">
          地址
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupAddress"
          v-model="detail"
          type="text"
          placeholder="請輸入地址"
          aria-describedby="signupAddressLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.detail" />
      </fieldset>
      <button type="submit" class="btn" :disabled="userStore.isLoading">註冊</button>
    </form>
  </div>
</template>

<style scoped></style>
