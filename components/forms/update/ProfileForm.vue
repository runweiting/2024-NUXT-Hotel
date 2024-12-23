<script setup lang="ts">
const userStore = useUserStore()
const isEditProfile = ref<boolean>(false)
const { warningToast } = useSweetAlert()

const {
  putName,
  putPhone,
  putBirthday,
  putZipcode,
  putCity,
  putCounty,
  putDetail,
  errors,
  handleUpdateProfile
} = useUpdateProfileForm()

const toggleEditMode = () => {
  if (!userStore.oldPassword && !userStore.newPassword) {
    warningToast('請先重設密碼，才能編輯資料')
    return
  }
  isEditProfile.value = !isEditProfile.value
}

const handleSubmit = async () => {
  await handleUpdateProfile()
  toggleEditMode()
}
</script>

<template>
  <div>
    <form class="flex flex-col gap-4">
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
        <FormsErrorMessage :msg="errors.putName" />
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
        <FormsErrorMessage :msg="errors.putPhone" />
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
        <FormsErrorMessage :msg="errors.putBirthday" />
      </fieldset>
      <div class="grid grid-cols-3 gap-2">
        <fieldset>
          <legend id="putZipCodeLegend" class="flex items-start font-medium">
            郵遞區號
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="putZipCode"
            v-model="putZipcode"
            type="text"
            :is-edit-mode="isEditProfile"
            placeholder="請輸入 3 碼郵遞區號"
            aria-describedby="putZipCodeLegend"
            autocomplete="off"
            :disabled="userStore.isLoading"
          />
          <FormsErrorMessage :msg="errors.putZipcode" />
        </fieldset>
        <fieldset>
          <legend id="putCityLegend" class="flex items-start font-medium">
            城市
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="putCity"
            v-model="putCity"
            type="text"
            :is-edit-mode="isEditProfile"
            placeholder="自動填入城市"
            aria-describedby="putCityLegend"
            autocomplete="off"
            :disabled="userStore.isLoading"
            readonly
          />
        </fieldset>
        <fieldset>
          <legend id="putCountyLegend" class="flex items-start font-medium">
            區域
            <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
          </legend>
          <FormsInputField
            id="putCounty"
            v-model="putCounty"
            type="text"
            :is-edit-mode="isEditProfile"
            placeholder="自動填入區域"
            aria-describedby="putCountyLegend"
            autocomplete="off"
            :disabled="userStore.isLoading"
            readonly
          />
        </fieldset>
      </div>
      <fieldset>
        <legend id="putAddressLegend" class="flex items-start font-medium">
          地址
          <Icon class="m-1 h-2 w-2 text-red-500" name="mdi:required" />
        </legend>
        <FormsInputField
          id="putAddress"
          v-model="putDetail"
          type="text"
          :is-edit-mode="isEditProfile"
          placeholder="請輸入地址"
          aria-describedby="putAddressLegend"
          autocomplete="off"
          :disabled="userStore.isLoading"
        />
        <FormsErrorMessage :msg="errors.putDetail" />
      </fieldset>
      <button
        v-if="!isEditProfile"
        type="button"
        class="btn-outline self-end"
        :disabled="userStore.isLoading"
        @click="toggleEditMode"
      >
        編輯資料
      </button>
      <button
        v-else
        type="button"
        class="btn-outline self-end"
        :disabled="userStore.isLoading"
        @click="handleSubmit"
      >
        確認更新
      </button>
    </form>
  </div>
</template>

<style scoped></style>
