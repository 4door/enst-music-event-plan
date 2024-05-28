<script setup lang="ts">
import SpecialCards from "../components/SpecialCards.vue";
import Result from "../components/Result.vue";
var point: number = 0;
var aveScore: number = 0;
var fourthScore: number = 0;
const bpList:number[] = [3,6,10];
var aveBp: number = 3;
var lastBp: number = 10;
</script>

<template>
  <main>
    <v-row>
      <SpecialCards title="特効①" />
    </v-row>
    <v-row>
      <SpecialCards title="特効②" />
    </v-row>
    
    <v-row>
      <p><br/>目標ポイント数</p>
      <v-col  sm="6">
        <input style="width: 75px;" v-model="point">
      </v-col>
      <v-col sm="2">
        万pt
      </v-col>
    </v-row>
    <v-row>
      <p><br/>1〜3曲目ライブ平均スコア</p>
      <v-col  sm="6">
        <input style="width: 75px;" v-model="aveScore">
      </v-col>
      <v-col sm="2">
        万pt
      </v-col>
      <v-col sm="2">
        &nbsp;&nbsp;&nbsp;&nbsp;BP
      </v-col>
      <v-col  sm="6">
        <select v-model="aveBp">
            <option v-for="bp in bpList"
                    v-bind:value="bp"
                    v-bind:key="bp">
                {{ bp }}
            </option>
        </select>
      </v-col>
    </v-row>
    <v-row>
      <p><br/>４曲目ライブスコア</p>
      <v-col  sm="6">
        <input style="width: 75px;" v-model="fourthScore">
      </v-col>
      <v-col sm="2">
        万pt
      </v-col>
      <v-col sm="2">
        &nbsp;&nbsp;&nbsp;&nbsp;BP
      </v-col>
      <v-col  sm="6">
        <select v-model="lastBp">
            <option v-for="bp in bpList"
                    v-bind:value="bp"
                    v-bind:key="bp">
                {{ bp }}
            </option>
        </select>
      </v-col>
    </v-row>
    <v-row>
      <br/>
      <br/>
      <button>計算を実行する</button>
      <v-col  sm="6">
        <Result point="350" />
      </v-col>
    </v-row>
    
  </main>
</template>

<style>
h1 {
  font-weight: 500;
  font-size: 1.55rem;
  top: 10px;
}
</style>
