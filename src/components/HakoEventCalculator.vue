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
  normalLiveScore: number;
  eventLiveScore: number;
  normalLivePlayTime: number;
  liveBP: number;
}

interface Result {
  requiredPlays: number;
  requiredDiamonds: number;
  requiredTimeHours: number;
  requiredTimeMinutes: number;
  accumulatedPasses: number;
  restPlays: number;
  restRequiredDiamonds: number;
  restRequiredTime: number;
  restRequiredTimeMinutes: number;
  ribbons: number;
}

export default defineComponent({
  name: 'TourEventCalculator',
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
      normalLiveScore: 350,
      eventLiveScore: 350,
      normalLivePlayTime: 3,
      liveBP: 1
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
      normalLiveScore: '通常曲ライブSCORE(万pt)',
      eventLiveScore: 'イベントライブSCORE(万pt)',
      normalLivePlayTime: '通常曲ライブ時間（分）',
      liveBP: '通常曲ライブBP',
    };

    const options: Record<keyof FormData, number[]> = {
      special1_star3: [0, 1, 2, 3, 4, 5],
      special1_star4: [0, 1, 2, 3, 4, 5],
      special1_star5: [0, 1, 2, 3, 4, 5],
      special2_star3: [0, 1, 2, 3, 4, 5],
      special2_star4: [0, 1, 2, 3, 4, 5],
      special2_star5: [0, 1, 2, 3, 4, 5],
      liveBP: [1, 2, 3, 6, 10],
      currentPoints: [],
      targetPoints: [],
      normalLiveScore: [],
      eventLiveScore: [],
      normalLivePlayTime: []
    };

    const saveData = () => {
      localStorage.setItem('box_event_data', JSON.stringify(formData.value));
    };

    const loadData = () => {
      const data = localStorage.getItem('box_event_data');
      if (data) {
        Object.assign(formData.value, JSON.parse(data));
      }
    };

    const calculate = () => {
      const { special1_star3, special1_star4, special1_star5, special2_star3, special2_star4, special2_star5, currentPoints, targetPoints, normalLiveScore, eventLiveScore, normalLivePlayTime, liveBP } = formData.value;

      // 特効倍率
      const totalMultiplier = (
        special1_star3 +
        [0, 5, 15, 25, 35, 50][special1_star4] +
        [0, 20, 50, 75, 100, 150][special1_star5] +
        special2_star3 +
        [0, 5, 15, 25, 35, 50][special2_star4] +
        [0, 20, 50, 75, 100, 150][special2_star5]
      ) / 100 + 1;

      // 通常ライブのスコアボーナス
      const normalLiveScoreBonus = (normalLiveScore * 10000) / 5000;

      // 通常ライブの1BP当たりのpt
      const ptPerBPNormal = 2000 + normalLiveScoreBonus;

      // 通常曲獲得pt/1BP
      const normalLivePointsPerBP = ptPerBPNormal;

      // 100PASS獲得pt
      const passPoints = 10000;

      // イベントライブのスコアボーナス
      const eventLiveScoreBonus = (eventLiveScore * 10000) / 5000;

      // イベ曲獲得pt/100PASS
      const eventLivePointsPerPass =
        (passPoints + eventLiveScoreBonus) * totalMultiplier;

      // 合計獲得pt/1BP
      const totalPointsPerBP = normalLivePointsPerBP + eventLivePointsPerPass / 10;

      // 消費BP数
      const requiredBP = (targetPoints * 10000) / totalPointsPerBP;

      // 必要ライブ回数（消費BP数 / ライブBP）
      const requiredPlays = Math.floor(requiredBP / liveBP);

      // 必要ダイヤ数（消費BP数 / 合計獲得pt/1BP * 2）小数点以下切り上げ
      const requiredDiamonds = Math.floor(requiredBP * 2);

      // 通常ライブプレイ時間（必要ライブ回数 * 通常楽曲のプレイ時間 / 60）時間と分で表示
      const requiredTimeHours = Math.floor((requiredPlays * normalLivePlayTime) / 60);
      const requiredTimeMinutes = Math.floor((requiredPlays * normalLivePlayTime) % 60);

      // 貯まるPASS（ライブBP * 必要ライブ回数 * 10）
      const accumulatedPasses = liveBP * requiredPlays * 10;

      // 残りの必要ポイントを計算
      const restPoints = targetPoints - currentPoints;

      // 残りの必要ライブ回数
      const restPlays = Math.floor(restPoints * 10000 / (totalPointsPerBP* liveBP));

      // 残りの必要BP数
      const restRequiredBP = restPlays * liveBP;

      // 残りの必要ダイヤ数
      const restRequiredDiamonds = restRequiredBP * 2;

      // 残りの必要時間（分）
      const restRequiredTimeMinutes = Math.floor(restPlays * normalLivePlayTime);

      // リボン獲得数
      const ribbons = liveBP * requiredPlays * 3 + accumulatedPasses/10

      // 結果を更新
      result.value = {
        requiredPlays,
        requiredDiamonds,
        requiredTimeHours,
        requiredTimeMinutes,
        accumulatedPasses,
        restPlays,
        restRequiredDiamonds,
        restRequiredTime: Math.floor(restRequiredTimeMinutes / 60),
        restRequiredTimeMinutes: restRequiredTimeMinutes % 60,
        ribbons
      };
    };

    onMounted(loadData);

    return {
      formData,
      result,
      labels,
      options,
      saveData,
      calculate,
    };
  },
});
</script>

<template>
  <div>
    <div>
      <div class="form-group" v-for="(label, key) in labels" :key="key">
        <label>{{ label }}:
          <template v-if="key === 'targetPoints'">
            <span
              v-tippy="{ content: '報酬☆5<br>1枚目　350万<br>2枚目　750万<br>3枚目　1100万<br>4枚目　1500万<br>5枚目　2200万', allowHTML: true }"
              class="tooltip-icon"
            ><font-awesome-icon icon="fa-solid fa-circle-info" /></span>
          </template>
          <select v-model="formData[key]" @change="saveData" v-if="key.includes('star') || key === 'liveBP'">
            <option v-for="n in options[key]" :key="n" :value="n">{{ n }}</option>
          </select>
          <input type="number" v-model.number="formData[key]" @change="saveData" v-else />
        </label>
      </div>
      <button @click="calculate">計算を実行</button>
    </div>
    <div v-if="result" class="result-container">
      <h2>計算結果</h2>
      <h3>トータル数</h3>
      <p>必要通常ライブ回数: {{ result.requiredPlays }} 回</p>
      <p>必要ダイヤ数: {{ result.requiredDiamonds }} 個</p>
      <p>通常ライブプレイ時間: {{ result.requiredTimeHours }} 時間 {{ result.requiredTimeMinutes }} 分</p>
      <p>貯まるPASS: {{ result.accumulatedPasses }} 個</p>
      <p>リボン獲得数:{{ result.ribbons }} 個（ライブ数のみで算出） </p>
      <h3>獲得ptから算出した残数</h3>
      <p>残り通常ライブ回数: {{ result.restPlays }} 回</p>
      <p>残り必要ダイヤ数: {{ result.restRequiredDiamonds }} 個</p>
      <p>残り通常プレイ時間数: {{ result.restRequiredTime }} 時間{{ result.restRequiredTimeMinutes }} 分</p>
      <p>※獲得ポイントが0であっても計算方法によりトータル数と若干の差異が出ます</p>
      <p>※プレイ時間・回数にイベントライブは含まれていません</p>
    </div>
  </div>
</template>


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
.tooltip-icon {
  cursor: pointer;
  margin-left: 5px;
}
</style>
