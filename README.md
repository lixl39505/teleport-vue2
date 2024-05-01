# Intro

Just like using '<Teleport>' in Vue3. Support for dynamic binding of 'to' and 'disabled' props.

## Cautions

Due to the limitation of Vue2, '<Teleport>' can only contain exactly one root element.

## example

```vue
<template>
  <div>
    <button @click="open = true">Open Modal</button>
    <Teleport to="body" :disabled="disabled">
      <div v-if="open" class="modal">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </Teleport>
  </div>
</template>
<script setup>
import Teleport from 'teleport-vue2'

const disabled = ref(false)
const open = ref(false)
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
```
