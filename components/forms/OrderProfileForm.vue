<script setup lang="ts">
import { useOrderProfileForm } from '~/composables/useOrderProfileForm'

const {
  bookingName,
  bookingEmail,
  bookingPhone,
  bookingZipcode,
  bookingCity,
  bookingCounty,
  bookingDetail,
  errors,
  handleProfile,
  handleCopyUser
} = useOrderProfileForm()
const orderStore = useOrderStore()

/* 如何讓外部按鈕 submit handleProfile？
  1. 暴露方法給父元件
  2. 建立 ref 綁定子元件
  3. 建立 confirmBooking 觸發 ref 的 handleProfile
*/
defineExpose({
  handleProfile
})
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-xl font-bold md:text-2xl">訂房人資訊</h2>
    <button
      type="button"
      class="border-0 bg-transparent font-bold text-primary-300 underline"
      @click="handleCopyUser"
    >
      套用會員資料
    </button>
  </div>
  <div class="w-full">
    <form class="grid grid-cols-1 gap-6" @submit.prevent="handleProfile">
      <fieldset>
        <legend id="bookingNameLegend" class="flex items-start">
          姓名
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="bookingName"
          v-model="bookingName"
          type="text"
          placeholder="請輸入姓名"
          aria-describedby="bookingNameLegend"
          autocomplete="off"
          :disabled="orderStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.bookingName" />
      </fieldset>
      <fieldset>
        <legend id="bookingPhoneLegend" class="flex items-start">
          電話
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="bookingPhone"
          v-model="bookingPhone"
          type="text"
          placeholder="請輸入電話"
          aria-describedby="bookingPhoneLegend"
          autocomplete="off"
          :disabled="orderStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.bookingPhone" />
      </fieldset>
      <fieldset>
        <legend id="bookingEmailLegend" class="flex items-start">
          信箱
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="bookingEmail"
          v-model="bookingEmail"
          type="email"
          placeholder="請輸入name@example.com"
          aria-describedby="bookingEmailLegend"
          autocomplete="off"
          :disabled="orderStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.bookingEmail" />
      </fieldset>
      <div class="grid grid-flow-row grid-cols-3 gap-2">
        <fieldset>
          <legend id="bookingZipCodeLegend" class="flex items-start">
            郵遞區號
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="bookingZipCode"
            v-model="bookingZipcode"
            type="text"
            placeholder="請輸入 3 碼郵遞區號"
            aria-describedby="bookingZipCodeLegend"
            autocomplete="off"
            :disabled="orderStore.isLoading"
          />
          <FormsErrorMessage :msg="errors.bookingZipcode" />
        </fieldset>
        <fieldset>
          <legend id="bookingCityLegend" class="flex items-start">
            城市
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="bookingCity"
            v-model="bookingCity"
            type="text"
            placeholder="自動填入城市"
            aria-describedby="bookingCityLegend"
            autocomplete="off"
            :disabled="orderStore.isLoading"
            readonly
          />
        </fieldset>
        <fieldset>
          <legend id="bookingCountyLegend" class="flex items-start">
            區域
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="bookingCounty"
            v-model="bookingCounty"
            type="text"
            placeholder="自動填入區域"
            aria-describedby="bookingCountyLegend"
            autocomplete="off"
            :disabled="orderStore.isLoading"
            readonly
          />
        </fieldset>
      </div>
      <fieldset>
        <legend id="bookingAddressLegend" class="flex items-start">
          地址
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="bookingAddress"
          v-model="bookingDetail"
          type="text"
          placeholder="請輸入地址"
          aria-describedby="signupAddressLegend"
          autocomplete="off"
          :disabled="orderStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.bookingDetail" />
      </fieldset>
    </form>
  </div>
</template>

<style scoped></style>
