<script setup lang="ts">
const userStore = useUserStore()
const isEditPassword = ref<boolean>(false)
const fakeOldPassword = ref<string>('********')

const closeEditPassword = () => (isEditPassword.value = !isEditPassword.value)

onMounted(async () => {
  if (!userStore.userInfo) {
    await userStore.getProfile()
  }
})

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
          <div v-if="!isEditPassword" class="flex items-center justify-between">
            <div>
              <label class="mb-2">密碼</label>
              <input
                v-model="fakeOldPassword"
                class="pointer-events-none mt-1 block w-full cursor-default select-none rounded-md border-0 shadow-sm shadow-transparent placeholder:text-gray-400"
              />
            </div>
            <button
              class="self-end font-bold text-primary-300 underline underline-offset-1"
              @click="isEditPassword = true"
            >
              重設
            </button>
          </div>

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
