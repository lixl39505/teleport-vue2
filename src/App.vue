<template>
  <div v-if="isAlive">
    <button @click="open = true">Open Modal</button>
    <Teleport to="body" :disabled="disabled">
      <div v-if="open" class="modal">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </Teleport>
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
import { ref } from 'vue'
import Teleport from './components/Teleport.vue'

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
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>
