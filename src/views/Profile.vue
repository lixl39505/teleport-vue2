<template>
  <div>
    <div>Name: {{ user?.name }}</div>
  </div>
</template>
<script lang="ts" setup>
defineProps({
  user: Object,
})
</script>
