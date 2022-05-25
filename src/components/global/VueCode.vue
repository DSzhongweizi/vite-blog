<script lang="ts" setup>
defineProps({source: { type: String, default: '' }})
</script>
<template>
  <div class="code">
    <div class="code-preview">
      <slot></slot>
    </div>
    <div class="code-source" v-html="decodeURIComponent(source)"></div>
  </div>
</template>