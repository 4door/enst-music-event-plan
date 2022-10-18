<script setup lang="ts">
defineProps<{
  title: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="green">{{ title }}</h1>
    <h3>
      <div>
        <label for="name">12秒</label>
      </div>
      <input type="text" id="12sec" />
    </h3>
    <h3>
      <div>
        <label for="name">8秒</label>
      </div>
      <input type="text" id="8sec" />
    </h3>
    <h3>
      <div>
        <label for="name">5秒</label>
      </div>
      <input type="text" id="5sec" />
    </h3>
    <h3>
      <div>
        <label for="name">フリック8秒</label>
      </div>
      <input type="text" id="flick-8sec" />
    </h3>
    <h3>
      <div>
        <label for="name">ロング8秒</label>
      </div>
      <input type="text" id="long-8sec" />
    </h3>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 1.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

label {
  width: 100px;
}
input {
  width: 100px;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
