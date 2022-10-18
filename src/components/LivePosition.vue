<template>
  <div class="centering">
    <div class="parent">
      <div class="position">4th</div>
      <div class="position">2nd</div>
      <div class="position">1st</div>
      <div class="position">3rd</div>
      <div class="position">5th</div>
    </div>
  </div>
</template>

<style scoped>
.centering {
  margin-top: 10px;
  text-align: center;
}
.parent {
  display: flex;
}

.position {
  border-radius: 10px;
  height: 40px;
  width: 40px;
  margin-left: 5px;
  background: green;
  justify-content: center;
  padding: 8px;
  color: aliceblue;
}
</style>
