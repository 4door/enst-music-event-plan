<template>
  <div class="container">
    <!-- 入力フォーム -->
    <div class="form-container">
      <h2>enstMツアー計算ツール</h2>
      <div class="form-group">
        <label>特効①の☆3 枚数: 
          <select v-model="special1_star3">
            <option v-for="n in 6" :key="n" :value="n-1">{{ n-1 }}</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>特効①の☆4 枚数: 
          <select v-model="special1_star4">
            <option v-for="n in 6" :key="n" :value="n-1">{{ n-1 }}</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>特効①の☆5 枚数: 
          <select v-model="special1_star5">
            <option v-for="n in 6" :key="n" :value="n-1">{{ n-1 }}</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>特効②の☆3 枚数: 
          <select v-model="special2_star3">
            <option v-for="n in 6" :key="n" :value="n-1">{{ n-1 }}</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>特効②の☆4 枚数: 
          <select v-model="special2_star4">
            <option v-for="n in 6" :key="n" :value="n-1">{{ n-1 }}</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>特効②の☆5 枚数: 
          <select v-model="special2_star5">
            <option v-for="n in 6" :key="n" :value="n-1">{{ n-1 }}</option>
          </select>
        </label>
      </div>

      <div class="form-group">
        <label>現在のpt数(万pt): <input type="number" v-model="currentPoints"></label>
      </div>

      <div class="form-group">
        <label>目標pt(万pt): <input type="number" v-model="targetPoints"></label>
      </div>

      <div class="form-group">
        <label>１～３曲目ライブSCORE(万pt): <input type="number" v-model="score123"></label>
      </div>

      <div class="form-group">
        <label>４曲目ライブSCORE(万pt): <input type="number" v-model="score4"></label>
      </div>

      <div class="form-group">
        <label>１～３曲目ライブBP: <input type="number" v-model="bp123"></label>
      </div>

      <div class="form-group">
        <label>４曲目ライブBP: <input type="number" v-model="bp4"></label>
      </div>

      <div class="form-group">
        <label>FEVER: <input type="number" v-model="fever"></label>
      </div>

      <button @click="calculate">計算を実行</button>
    </div>
    <h2>計算結果</h2>
    <!-- 結果表示 -->
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

<script>
export default {
  data() {
    return {
      special1_star3: 0,
      special1_star4: 0,
      special1_star5: 0,
      special2_star3: 0,
      special2_star4: 0,
      special2_star5: 0,
      currentPoints: 0,
      targetPoints: 0,
      score123: 0,
      score4: 0,
      bp123: 3,
      bp4: 10,
      fever: 0,
      result: null
    };
  },
  methods: {
    calculate() {
      // 特効倍率の算出ロジック
      let totalMultiplier = (
        this.special1_star3 +
        [0, 5, 15, 25, 35, 50][this.special1_star4] +
        [0, 20, 50, 75, 100, 150][this.special1_star5] +
        this.special2_star3 +
        [0, 5, 15, 25, 35, 50][this.special2_star4] +
        [0, 20, 50, 75, 100, 150][this.special2_star5]
      ) / 100 + 1;

      // １～３曲目の1BP当たりのpt
      let ptPerBP123 = (
        2500 + (this.score123 * 10000 / 5000)
      ) * totalMultiplier;

      // ４曲目の1BP当たりのpt
      let ptPerBP4 = (
        2250 + (this.score4 * 10000 / 5000)
      ) * totalMultiplier * (1 + this.fever / 100);

      // 1公演当たりのpt
      let ptPerPlay = (
        ptPerBP123 * 3 * this.bp123 +
        ptPerBP4 * this.bp4
      );

      // 必要公演回数
      let requiredPlays = Math.ceil(this.targetPoints * 10000 / ptPerPlay);

      // 必要BP数
      let requiredBP = requiredPlays * (this.bp123 * 3 + this.bp4);

      // イベント必要ダイヤ数
      let requiredDiamonds = requiredBP * 2;

      // 必要プレイ時間数（分）
      let requiredTimeMinutes = requiredPlays * 12;

      // 現在の獲得ポイント数を考慮し、残りの必要時間等を求める
      // 残りpt
      let restPoints = this.targetPoints - this.currentPoints;
      
      // 残り公演回数
      let restPlays = Math.ceil(restPoints * 10000 / ptPerPlay);

      // 残り必要BP数
      let restRequiredBP =restPlays * (this.bp123 * 3 + this.bp4);

      // 残り必要ダイヤ数
      let restRequiredDiamonds = restRequiredBP * 2;

      // 残り必要プレイ時間数（分）
      let restRequiredTimeMinutes = restPlays * 12;

      // 結果を保存
      this.result = {
        requiredPlays: requiredPlays,
        requiredDiamonds: requiredDiamonds,
        requiredTime: Math.trunc(requiredTimeMinutes / 60),
        requiredTimeMinutes: requiredTimeMinutes -  Math.trunc(requiredTimeMinutes / 60)*60,
        totalMultiplier: (totalMultiplier - 1) * 100,
        restPlays: restPlays,
        restRequiredDiamonds: restRequiredDiamonds,
        restRequiredTime: Math.trunc(restRequiredTimeMinutes / 60),
        restRequiredTimeMinutes: restRequiredTimeMinutes -  Math.trunc(restRequiredTimeMinutes / 60)*60
      };

      console.log('計算の実行ありがとう♪');
    }
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

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
