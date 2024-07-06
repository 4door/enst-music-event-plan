<script setup lang="ts">
defineProps<{
  point: string;
}>();
var aveScore: number = 0;
var fourthScore: number = 0;
var aveBp: number = 3;
var lastBp: number = 10;
var countAve: number = 18;
var countLast: number = 6;
var diamond: number = 2;

var resultDiamond: number = (aveBp * countAve + lastBp * countLast) * diamond;
var time: number = (countAve + countLast)* 3/60
var hour: number = Math.floor(time)
var minutes: number = Math.ceil(time*60)-hour*60
</script>

<template>
  <main>
    <h1 class="green">計算結果</h1>
    <v-row>
      <v-col>
        必要ダイヤ数：{{ resultDiamond }}個
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <br/>
        必要公演回数：6回
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <br/>
        必要時間：{{ hour }}時間{{ minutes }}分
      </v-col>
    </v-row>
  </main>
</template>
