<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import TourCalculator from './TourCalculator.vue';
import HakoEventCalculator from './HakoEventCalculator.vue';

export default defineComponent({
  name: 'EnstMCalculator',
  components: {
    TourCalculator,
    HakoEventCalculator
  },
  setup() {
    const eventType = ref('tour');

    const saveData = () => {
      localStorage.setItem('enstM_event_type', eventType.value);
    };

    const loadData = () => {
      const data = localStorage.getItem('enstM_event_type');
      if (data) {
        eventType.value = data;
      }
    };

    onMounted(loadData);

    return {
      eventType,
      saveData
    };
  }
});
</script>

<template>
  <div class="container">
    <div class="form-container">
      <h2>enstMイベント計算ツール</h2>
      <div class="form-group">
        <label>イベントタイプ:
          <select v-model="eventType" @change="saveData">
            <option value="tour">ツアー用</option>
            <option value="hako">箱イベ用</option>
          </select>
        </label>
      </div>
      <TourCalculator v-if="eventType === 'tour'" />
      <HakoEventCalculator v-if="eventType === 'hako'" />
    </div>
  </div>
</template>


<style scoped>
.container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form-container {
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group select {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
