<script setup lang="ts">
import { ref } from "vue";
defineProps<{
  numbering: number;
}>();
const selected = ref("12sec");
const options = [
  {
    text: "12秒",
    value: "12sec",
  },
  {
    text: "8秒",
    value: "8sec",
  },
  {
    text: "5秒",
    value: "5sec",
  },
  {
    text: "フリック8秒",
    value: "flick-eight",
  },
  {
    text: "ロング8秒",
    value: "long-eight",
  },
];
</script>
<template>
  <div class="greetings">
    <dev>
      <label>{{ numbering + 1 }}</label>
    </dev>
    <select v-model="selected">
      <option
        v-for="option in options"
        :value="option.value"
        :key="option.value"
      >
        {{ option.text }}
      </option>
    </select>
  </div>
</template>
<style scoped>
.greetings {
  top: 15px;
  font-size: 1.1rem;
  text-align: center;
  width: 100px;
}
.greetings label {
  text-align: center;
  color: white;
}
.greetings select {
  text-align: center;
  color: green;
}
</style>
