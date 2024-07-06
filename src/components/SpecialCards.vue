<script setup lang="ts">
defineProps<{
  title: string;
}>();
const rare: number = 0;
const highRare: number = 0;
const ultraRare: number = 0;
const rareMap = [
  {
    number: 1,
    score: 1
  },
  {
    number: 2,
    score: 2
  },
  {
    number: 3,
    score: 3
  },
  {
    number: 4,
    score: 4
  },
  {
    number: 5,
    score: 5
  }
]
const highRareMap = [
  {
    number: 1,
    score: 5
  },
  {
    number: 2,
    score: 15
  },
  {
    number: 3,
    score: 25
  },
  {
    number: 4,
    score: 35
  },
  {
    number: 5,
    score: 50
  }
]
const ultraRareMap = [
  {
    number: 1,
    score: 20
  },
  {
    number: 2,
    score: 50
  },
  {
    number: 3,
    score: 75
  },
  {
    number: 4,
    score: 100
  },
  {
    number: 5,
    score: 150
  }
]
</script>

<template>
  <v-main class="greetings col-xs-12 mx-auto my-12">
    <h1 class="green">{{ title }}</h1>
    <v-row>
      <v-col sm="6">
        <label for="name">星3 </label>
        <select v-model="rare">
            <option value=0>0</option>
            <option v-for="currentRare in rareMap"
                    v-bind:value="currentRare.score"
                    v-bind:key="currentRare.number">
                {{ currentRare.number }}
            </option>
        </select>
      </v-col>
      <v-col sm="6">
        <label for="name">  星4 </label>
        <select v-model="highRare">
            <option value=0>0</option>
            <option v-for="currentHr in highRareMap"
                    v-bind:value="currentHr.score"
                    v-bind:key="currentHr.number">
                {{ currentHr.number }}
            </option>
        </select>
      </v-col>
      <v-col sm="6">
        <label for="name">  星5 </label>
        <select v-model="ultraRare">
            <option value=0>0</option>
            <option v-for="currentUr in ultraRareMap"
                    v-bind:value="currentUr.score"
                    v-bind:key="currentUr.number">
                {{ currentUr.number }}
            </option>
        </select>
      </v-col>
    </v-row>
  </v-main>
</template>
