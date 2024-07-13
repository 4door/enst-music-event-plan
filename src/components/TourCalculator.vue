<!-- TourCalculator.vue -->
<template>
  <div>
    <div class="form-group" v-for="(label, key) in labels" :key="key">
      <label>{{ label }}: 
          <template v-if="key === 'targetPoints'">
            <span
              v-tippy="{ content: '報酬☆5<br>1枚目　300万 350万<br>2枚目　750万 600万<br>3枚目　950万 1100万<br>4枚目　1500万 1350万<br>5枚目　2100万 2200万', allowHTML: true }"
              class="tooltip-icon"
            ><font-awesome-icon icon="fa-solid fa-circle-info" /></span>
          </template>
        <select v-model="formData[key]" @change="saveData" v-if="key.includes('star') || key === 'bp123' || key === 'bp4'">
          <option v-for="n in options[key]" :key="n" :value="n">{{ n }}</option>
        </select>
        <input type="number" v-model="formData[key]" @change="saveData" v-else />
      </label>
    </div>
    <button @click="calculate">計算を実行</button>
    <div v-if="result" class="result-container">
      <h3>特効倍率</h3>
      <p>{{ result.totalMultiplier }} ％</p>
      <h3>トータル数</h3>
      <p>必要公演回数: {{ result.requiredPlays }} 回</p>
      <p>イベント必要ダイヤ数: {{ result.requiredDiamonds }} 個</p>
      <p>必要プレイ時間数: {{ result.requiredTime }} 時間{{ result.requiredTimeMinutes }} 分</p>
      <h3>獲得ptから算出した残数</h3>
      <p>残り公演回数: {{ result.restPlays }} 回</p>
      <p>残り必要ダイヤ数: {{ result.restRequiredDiamonds }} 個</p>
      <p>残りプレイ時間数: {{ result.restRequiredTime }} 時間{{ result.restRequiredTimeMinutes }} 分</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface FormData {
  special1_star3: number;
  special1_star4: number;
  special1_star5: number;
  special2_star3: number;
  special2_star4: number;
  special2_star5: number;
  currentPoints: number;
  targetPoints: number;
  score123: number;
  score4: number;
  bp123: number;
  bp4: number;
  fever: number;
  time: number;
}

interface Result {
  requiredPlays: number;
  requiredDiamonds: number;
  requiredTime: number;
  requiredTimeMinutes: number;
  totalMultiplier: number;
  restPlays: number;
  restRequiredDiamonds: number;
  restRequiredTime: number;
  restRequiredTimeMinutes: number;
}

export default defineComponent({
  name: 'TourCalculator',
  setup() {
    const formData = ref<FormData>({
      special1_star3: 0,
      special1_star4: 0,
      special1_star5: 0,
      special2_star3: 0,
      special2_star4: 0,
      special2_star5: 0,
      currentPoints: 0,
      targetPoints: 350,
      score123: 350,
      score4: 380,
      bp123: 3,
      bp4: 10,
      fever: 100,
      time: 12
    });

    const result = ref<Result | null>(null);

    const labels: Record<keyof FormData, string> = {
      special1_star3: '特効①の☆3 枚数',
      special1_star4: '特効①の☆4 枚数',
      special1_star5: '特効①の☆5 枚数',
      special2_star3: '特効②の☆3 枚数',
      special2_star4: '特効②の☆4 枚数',
      special2_star5: '特効②の☆5 枚数',
      currentPoints: '現在のpt数(万pt)',
      targetPoints: '目標pt(万pt)',
      score123: '１～３曲目ライブSCORE(万pt)',
      score4: '４曲目ライブSCORE(万pt)',
      bp123: '１～３曲目ライブBP',
      bp4: '４曲目ライブBP',
      fever: 'FEVER',
      time: '1公演あたりの時間（分）'
    };

    const options: Record<keyof FormData, number[]> = {
      special1_star3: [0, 1, 2, 3, 4, 5],
      special1_star4: [0, 1, 2, 3, 4, 5],
      special1_star5: [0, 1, 2, 3, 4, 5],
      special2_star3: [0, 1, 2, 3, 4, 5],
      special2_star4: [0, 1, 2, 3, 4, 5],
      special2_star5: [0, 1, 2, 3, 4, 5],
      bp123: [3, 6, 10],
      bp4: [3, 6, 10],
      currentPoints: [],
      targetPoints: [],
      score123: [],
      score4: [],
      fever: [],
      time: []
    };

    const saveData = () => {
      localStorage.setItem('enstM_tour_data', JSON.stringify(formData.value));
    };

    const loadData = () => {
      const data = localStorage.getItem('enstM_tour_data');
      if (data) {
        Object.assign(formData.value, JSON.parse(data));
      }
    };

    const calculate = () => {
      const { special1_star3, special1_star4, special1_star5, special2_star3, special2_star4, special2_star5, currentPoints, targetPoints, score123, score4, bp123, bp4, fever, time } = formData.value;

      const totalMultiplier = (
        special1_star3 +
        [0, 5, 15, 25, 35, 50][special1_star4] +
        [0, 20, 50, 75, 100, 150][special1_star5] +
        special2_star3 +
        [0, 5, 15, 25, 35, 50][special2_star4] +
        [0, 20, 50, 75, 100, 150][special2_star5]
      ) / 100 + 1;

      const ptPerBP123 = (
        2500 + (score123 * 10000 / 5000)
      ) * totalMultiplier;

      const ptPerBP4 = (
        2250 + (score4 * 10000 / 5000)
      ) * totalMultiplier * (1 + fever / 100);

      const ptPerPlay = (
        ptPerBP123 * 3 * bp123 +
        ptPerBP4 * bp4
      );

      const requiredPlays = Math.ceil(targetPoints * 10000 / ptPerPlay);

      const requiredBP = requiredPlays * (bp123 * 3 + bp4);

      const requiredDiamonds = requiredBP * 2;

      const requiredTimeMinutes = requiredPlays * (time || 12);

      const restPoints = targetPoints - currentPoints;

      const restPlays = Math.ceil(restPoints * 10000 / ptPerPlay);

      const restRequiredBP = restPlays * (bp123 * 3 + bp4);

      const restRequiredDiamonds = restRequiredBP * 2;

      const restRequiredTimeMinutes = Math.trunc(restPlays * (time || 12));

      result.value = {
        requiredPlays,
        requiredDiamonds,
        requiredTime: Math.trunc(requiredTimeMinutes / 60),
        requiredTimeMinutes: requiredTimeMinutes % 60,
        totalMultiplier: (totalMultiplier - 1) * 100,
        restPlays,
        restRequiredDiamonds,
        restRequiredTime: Math.trunc(restRequiredTimeMinutes / 60),
        restRequiredTimeMinutes: restRequiredTimeMinutes % 60
      };

      console.log('計算の実行ありがとう♪');
    };

    onMounted(loadData);

    return {
      formData,
      result,
      labels,
      options,
      saveData,
      calculate
    };
  }
});
</script>

<style scoped>
.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  font-weight: bold;
  margin-bottom: 5px;
}

.form-group select, 
.form-group input[type="number"] {
  width: calc(100% - 22px);
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

button {
  display: inline-block;
  padding: 10px 20px;
  font-size: 16px;
  color: white;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 10px;
}

button:hover {
  background-color: #0056b3;
}

.result-container {
  padding: 20px;
  border-radius: 8px;
}

.result-container p {
  margin: 10px 0;
  font-size: 15px;
}
</style>
