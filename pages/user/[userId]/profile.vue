<script setup lang="ts">
const userStore = useUserStore()
const isEditPassword = ref<boolean>(false)
const fakeOldPassword = '********'

const closeEditPassword = () => (isEditPassword.value = !isEditPassword.value)

useHeadSafe({
  title: '個人資料'
})
</script>

<template>
  <div class="mb-20 flex flex-col gap-4 sm:gap-8 md:flex-row md:gap-4 lg:gap-8">
    <!-- Password Section -->
    <div class="flex-1 md:w-2/5">
      <section class="flex flex-col gap-6 rounded-3xl bg-white p-8">
        <h2 class="text-xl font-bold">修改密碼</h2>
        <div class="flex flex-col gap-4">
          <div>
            <p class="mb-2">電子信箱</p>
            <span class="font-bold">{{ userStore.userInfo?.email }}</span>
          </div>
          <!-- Fake Password Display/Edit -->
          <form v-if="!isEditPassword" class="flex items-center justify-between">
            <fieldset>
              <legend id="fakeOldPasswordLegend" class="flex items-start">密碼</legend>
              <FormsInputField
                id="fakeOldPassword"
                v-model="fakeOldPassword"
                type="password"
                :is-edit-mode="isEditPassword"
                aria-describedby="fakeOldPasswordLegend"
                autocomplete="off"
              />
            </fieldset>
            <button
              class="self-end font-bold text-primary-300 underline underline-offset-1"
              @click="isEditPassword = true"
            >
              重設
            </button>
          </form>

          <!-- Password Edit Form -->
          <FormsUpdatePasswordForm
            v-if="isEditPassword"
            @toggle-edit-password="closeEditPassword"
          />
        </div>
      </section>
    </div>

    <!-- Profile Section -->
    <div class="flex-1 md:w-3/5">
      <section class="flex flex-col gap-6 rounded-3xl bg-white p-8">
        <h2 class="text-xl font-bold">基本資料</h2>
        <!-- Profile Edit Form -->
        <FormsUpdateProfileForm />
      </section>
    </div>
  </div>
</template>

<style scoped></style>
