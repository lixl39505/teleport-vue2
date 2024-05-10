<template>
  <Teleport to="body" :disabled="disabled">
    <div v-if="value" class="modal">
      <slot :user="user"></slot>
      <button
        @click="
          $emit('input', false)
          $emit('close')
        "
      >
        Close
      </button>
    </div>
  </Teleport>
</template>

<script lang="ts" setup>
import { inject } from 'vue'
import Teleport from '../../lib/Teleport.vue'

export interface UserProfile {
  name: string
}

defineProps({
  value: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
})
const user = inject<UserProfile>('user')
</script>
<style>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
