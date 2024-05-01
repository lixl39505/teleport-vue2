<template>
  <div v-if="isAlive">
    <button @click="open = true">Open Modal</button>
    <Modal v-model="open" :disabled="disabled">
      <template #default="{ user }">
        <p>Hello from the modal!</p>
        <Profile :user="user"></Profile>
      </template>
    </Modal>
    <div v-for="i in list" :key="i">
      <button>{{ i }}</button>
    </div>
    <div id="cc"></div>
    <Teleport :to="target" :disabled="disabled">
      <template v-if="!empty">
        <button v-if="swap">A</button>
        <button v-else>B</button>
      </template>
    </Teleport>
    <div class="b">
      <button @click="onAdd">Add</button>
      <button @click="onPop">Pop</button>
      <button @click="onMove">Move</button>
      <button @click="onToggle">{{ disabled ? 'Enable' : 'Disable' }}</button>
      <button @click="onSwap">Swap</button>
      <button @click="onShow">{{ empty ? 'Show' : 'Hide' }}</button>
      <button @click="onClosePage">ClosePage</button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref, provide } from 'vue'
import Teleport from '../components/Teleport.vue'
import Modal from './Modal.vue'
import Profile from './Profile.vue'

// Test provider/inject
provide('user', { name: 'foo' })

export interface UserProfile {
  name: string
}

const list = ref(['button1'])
let count = 1

function onAdd() {
  list.value.push(`button${++count}`)
}
function onPop() {
  list.value.pop()
}

const isAlive = ref(true)
function onClosePage() {
  isAlive.value = false
}

const disabled = ref(false)
function onToggle() {
  disabled.value = !disabled.value
}

const target = ref('body')
function onMove() {
  target.value = target.value === 'body' ? '#cc' : 'body'
}

const swap = ref(true)
function onSwap() {
  swap.value = !swap.value
}

const empty = ref(false)
function onShow() {
  empty.value = !empty.value
}

const open = ref(false) // bug open -> close -> disable -> open -> error
</script>
<style>
.b {
  position: fixed;
  top: 100px;
  left: 100px;
}
</style>
