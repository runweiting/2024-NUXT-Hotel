<script setup lang="ts">
// 定義型別
type InputTypes = 'text' | 'password' | 'email' | 'number' | 'date' | 'url' | 'tel' | 'search'
interface Props {
  id: string
  type?: InputTypes
  isEditMode?: boolean
}

/* withDefaults 為 defineProps 函數設定預設值，
接受 2 個參數：defineProps 返回的 props、定義 props 預設值的物件 */
const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  isEditMode: true
})
/* defineModel 讓父子組件使用同一個變數進行 v-model 雙向綁定，不需手動定義 props 和 emits
1. 父組件通過 v-model 傳遞數據給子組件
2. 子組件內的 defineModel 自動將 v-model 傳入的變數綁定到本地的 modelValue
3. 當修改 modelValue 時，父組件的數據也會同步更新 */
const modelValue = defineModel<string>({
  default: ''
})
</script>

<template>
  <input
    :id="id"
    v-model="modelValue"
    :type="type"
    :readonly="!isEditMode"
    :class="[
      'mt-1 block w-full rounded-md border-gray-300 shadow-sm placeholder:text-gray-400 focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50',
      {
        'pointer-events-none cursor-default select-none border-0 shadow-transparent': !isEditMode
      }
    ]"
    :tabindex="isEditMode ? 0 : -1"
  />
</template>

<style scoped></style>
