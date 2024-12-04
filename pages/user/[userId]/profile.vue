<script setup lang="ts">
const isEditPassword = ref(false)
const isEditProfile = ref(false)
const userStore = useUserStore()

const oldPassword = '**********'
const newPassword = '**********'
const confirmPassword = '**********'
const putName = 'Jessica Wang'
const putPhone = '+886 912 345 678'
const putBirthday = '1990-08-15'
const putZipcode = '333'
const putCityArea = ''
const putDetail = '中正路1號'

definePageMeta({
  layout: 'user-layout'
})
</script>

<template>
  <div class="mb-20 flex space-x-4 px-20">
    <!-- Password Section -->
    <div class="w-2/5">
      <section class="flex flex-col gap-6 rounded-3xl bg-white p-10">
        <h2 class="text-2xl font-bold">修改密碼</h2>
        <div class="flex flex-col gap-4">
          <div>
            <p class="mb-2 font-medium">電子信箱</p>
            <span class="font-bold">Jessica@exsample.com</span>
          </div>
          <!-- Password Display/Edit -->
          <div v-if="!isEditPassword" class="flex items-center justify-between">
            <fieldset>
              <legend id="oldPasswordLegend" class="flex items-start">密碼</legend>
              <FormsInputField
                id="oldPassword"
                v-model="oldPassword"
                type="password"
                :is-edit-mode="isEditPassword"
                aria-describedby="oldPasswordLegend"
                autocomplete="off"
              />
            </fieldset>
            <button
              class="self-end font-bold text-primary-300 underline underline-offset-1"
              @click="isEditPassword = true"
            >
              重設密碼
            </button>
          </div>

          <!-- Password Edit Form -->
          <div v-if="isEditPassword">
            <form class="flex flex-col gap-4" @submit.prevent="">
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
                <!-- <FormsErrorMessage :msg="errors.birthday" /> -->
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
                <!-- <FormsErrorMessage :msg="errors.birthday" /> -->
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
                <!-- <FormsErrorMessage :msg="errors.birthday" /> -->
              </fieldset>
              <button
                v-if="isEditPassword"
                type="submit"
                class="btn-outline self-start rounded-md text-primary-500 hover:text-white"
                :disabled="userStore.isLoading"
              >
                儲存設定
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>

    <!-- Profile Section -->
    <div class="w-3/5">
      <section class="flex flex-col gap-6 rounded-3xl bg-white p-10">
        <h2 class="text-2xl font-bold">基本資料</h2>
        <div class="flex flex-col gap-4">
          <!-- User Info Display -->
          <fieldset>
            <legend id="putNameLegend" class="flex items-start font-medium">
              姓名
              <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
            </legend>
            <FormsInputField
              id="putName"
              v-model="putName"
              type="text"
              :is-edit-mode="isEditProfile"
              aria-describedby="putNameLegend"
              autocomplete="off"
              :disabled="userStore.isLoading"
            />
            <!-- <FormsErrorMessage :msg="errors.birthday" /> -->
          </fieldset>
          <fieldset>
            <legend id="putPhoneLegend" class="flex items-start font-medium">
              手機號碼
              <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
            </legend>
            <FormsInputField
              id="putPhone"
              v-model="putPhone"
              type="tel"
              :is-edit-mode="isEditProfile"
              aria-describedby="putPhoneLegend"
              autocomplete="off"
              :disabled="userStore.isLoading"
            />
            <!-- <FormsErrorMessage :msg="errors.birthday" /> -->
          </fieldset>
          <fieldset>
            <legend id="putBirthdayLegend" class="flex items-start font-medium">
              出生年月日
              <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
            </legend>
            <FormsInputField
              id="putBirthday"
              v-model="putBirthday"
              type="date"
              :is-edit-mode="isEditProfile"
              placeholder="請輸入生日"
              aria-describedby="putBirthdayLegend"
              autocomplete="off"
              :disabled="userStore.isLoading"
            />
            <!-- <FormsErrorMessage :msg="errors.birthday" /> -->
          </fieldset>
          <div class="grid grid-cols-2 gap-2">
            <fieldset>
              <legend id="signupZipCodeLegend" class="flex items-start font-medium">
                郵遞區號
                <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
              </legend>
              <FormsInputField
                id="signupZipCode"
                v-model="putZipcode"
                type="text"
                :is-edit-mode="isEditProfile"
                placeholder="請輸入 3 碼郵遞區號"
                aria-describedby="signupZipCodeLegend"
                autocomplete="off"
                :disabled="userStore.isLoading"
              />
              <!-- <FormsErrorMessage :msg="errors.zipcode" /> -->
            </fieldset>
            <fieldset>
              <legend id="signupCityAreaLegend" class="flex items-start font-medium">
                城市及區域
                <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
              </legend>
              <FormsInputField
                id="signupCityArea"
                v-model="putCityArea"
                type="text"
                :is-edit-mode="isEditProfile"
                placeholder="自動填入城市及區域"
                aria-describedby="signupCityAreaLegend"
                autocomplete="off"
                :disabled="userStore.isLoading"
                readonly
              />
            </fieldset>
          </div>
          <fieldset>
            <legend id="signupAddressLegend" class="flex items-start font-medium">
              地址
              <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
            </legend>
            <FormsInputField
              id="signupAddress"
              v-model="putDetail"
              type="text"
              :is-edit-mode="isEditProfile"
              placeholder="請輸入地址"
              aria-describedby="signupAddressLegend"
              autocomplete="off"
              :disabled="userStore.isLoading"
            />
            <!-- <FormsErrorMessage :msg="errors.detail" /> -->
          </fieldset>
          <button
            v-if="!isEditProfile"
            type="button"
            class="btn-outline self-start"
            @click="isEditProfile = true"
          >
            編輯資料
          </button>
          <button
            v-if="isEditProfile"
            type="submit"
            class="btn-outline self-start"
            :disabled="userStore.isLoading"
          >
            儲存設定
          </button>
        </div>
      </section>
    </div>
  </div>
</template>

<style scoped></style>
