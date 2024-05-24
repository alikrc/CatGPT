<template>
  <v-container>
    <v-row align="center">
      <v-text-field
        v-model="searchQuery"
        label="Search Breeds"
        clearable
        @click:prepend="toggleBreeds"
      />

      <v-col cols="4">
        <v-row>
          <v-col cols="2" offset="4">
            <v-icon
              :icon="includeBreeds ? 'mdi-paw' : 'mdi-paw-off'"
              @click="toggleBreeds"
            ></v-icon>
          </v-col>
          <v-col cols="6">
            <v-btn @click="getRandomCats">Random 😺</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <v-row>
      <v-col v-for="data in datas" :key="data.id" cols="12" md="4">
        <v-card :text="data.description">
          <v-img :src="data.url" height="200px"></v-img>

          <v-card-title>{{ data.title }}</v-card-title>

          <v-card-subtitle>{{ data.subtitle }}</v-card-subtitle>

          <v-text>{{ data.description }}</v-text>
        </v-card>
      </v-col>
    </v-row>
    <v-pagination
      v-if="totalPages > 1"
      v-model="currentPage"
      :length="totalPages"
    />
  </v-container>
</template>
<script setup>
import { ref, watch } from "vue";
import api from "@/api/service";

const searchQuery = ref("");
const datas = ref([]);
const currentPage = ref(1);
const totalPages = ref(1);
let includeBreeds = ref(true);
let timerId = undefined;

class Card {
  constructor(id, title, url, subtitle, description) {
    this.id = id;
    this.title = title;
    this.url = url;
    this.subtitle = subtitle;
    this.description = description;
  }
}

watch(searchQuery, (v) => {
  clearTimeout(timerId);

  timerId = setTimeout(async () => {
    await fetchCats(v);
  }, 500);
});

const toggleBreeds = () => {
  includeBreeds.value = !includeBreeds.value;
};

async function getRandomCats() {
  let response = await api.getRandomCatImage(includeBreeds.value);
  datas.value = response.map(
    (r) => new Card(r.id, r.breeds?.[0]?.name ?? "", r.url)
  );
}

async function fetchCats(searchQuery) {
  try {
    console.log(searchQuery);

    let response = await api.searchBreeds(searchQuery);

    datas.value = response.map(
      (r) => new Card(r.id, r.name, r.image?.url, r.origin, r.description)
    );
  } catch (error) {
    console.error("Error fetching cats:", error);
  }
}
</script>
