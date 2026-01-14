<template>
  <div class="min-h-screen bg-white flex items-center justify-center">
    <div class="text-center">
      <h1 class="text-4xl font-bold mb-4">测试页面</h1>
      <p class="text-gray-600 mb-4">如果你能看到这个，说明 Vue 运行正常</p>
      <button @click="count++" class="px-4 py-2 bg-black text-white rounded">
        点击次数: {{ count }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>
