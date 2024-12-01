<script setup lang="ts">
import { useBooking } from '~/composables/useBooking'

const {
  signupName,
  signupEmail,
  signupPhone,
  zipcode,
  cityArea,
  detail,
  bookingErrors,
  handleBooking
} = useBooking()
const bookingStore = useBookingStore()
</script>

<template>
  <div class="w-full">
    <form class="grid grid-cols-1 gap-6" @submit.prevent="handleBooking">
      <fieldset>
        <legend id="signupNameLegend" class="flex items-start">
          姓名
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupName"
          v-model="signupName"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="請輸入姓名"
          aria-describedby="signupNameLegend"
          autocomplete="off"
          :disabled="bookingStore.isLoading"
        />
        <FormsErrorMessage :msg="bookingErrors.signupName" />
      </fieldset>
      <fieldset>
        <legend id="signupPhoneLegend" class="flex items-start">
          電話
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupPhone"
          v-model="signupPhone"
          type="text"
          class="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="請輸入電話"
          aria-describedby="signupPhoneLegend"
          autocomplete="off"
          :disabled="bookingStore.isLoading"
        />
        <FormsErrorMessage :msg="bookingErrors.signupPhone" />
      </fieldset>
      <fieldset>
        <legend id="signupEmailLegend" class="flex items-start">
          信箱
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="signupEmail"
          v-model="signupEmail"
          type="email"
          class="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="請輸入name@example.com"
          aria-describedby="signupEmailLegend"
          autocomplete="off"
          :disabled="bookingStore.isLoading"
        />
        <FormsErrorMessage :msg="bookingErrors.signupEmail" />
      </fieldset>
      <div class="grid grid-flow-row grid-cols-2 gap-2">
        <fieldset>
          <legend id="signupZipCodeLegend" class="flex items-start">
            郵遞區號
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="signupZipCode"
            v-model="zipcode"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="請輸入 3 碼郵遞區號"
            aria-describedby="signupZipCodeLegend"
            autocomplete="off"
            :disabled="bookingStore.isLoading"
          />
          <FormsErrorMessage :msg="bookingErrors.zipcode" />
        </fieldset>
        <fieldset>
          <legend id="signupCityAreaLegend" class="flex items-start">
            城市及區域
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="signupCityArea"
            v-model="cityArea"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="自動填入城市及區域"
            aria-describedby="signupCityAreaLegend"
            autocomplete="off"
            :disabled="bookingStore.isLoading"
            readonly
          />
        </fieldset>
        <fieldset class="col-span-2">
          <legend id="signupAddressLegend" class="flex items-start">
            地址
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="signupAddress"
            v-model="detail"
            type="text"
            class="mt-1 block w-full rounded-md border-gray-300 py-3 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            placeholder="請輸入地址"
            aria-describedby="signupAddressLegend"
            autocomplete="off"
            :disabled="bookingStore.isLoading"
          />
          <FormsErrorMessage :msg="bookingErrors.detail" />
        </fieldset>
      </div>
      <!-- <button type="submit" class="btn" :disabled="bookingStore.isLoading">註冊</button> -->
    </form>
  </div>
</template>

<style scoped></style>
