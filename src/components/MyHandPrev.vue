<script setup lang="ts">
import MyHand from "../components/MyHand.vue";
</script>

<template>
  <main>
    <label v-for="(item, index) in 5" :key="index">
      <MyHand :numbering="index" />
    </label>
  </main>
</template>
