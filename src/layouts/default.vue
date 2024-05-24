<template>
  <v-app>
    <v-toolbar class="header" image="@/assets/cat7.jpg">
      <template #image>
        <v-img position="center" />
      </template>
      <v-spacer />
      <v-btn @click="toggleTheme">toggle theme</v-btn>
      <v-icon :icon="themeIcon"></v-icon>
    </v-toolbar>

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useTheme } from "vuetify";

const theme = useTheme();

const isDarkTheme = computed(() => theme.global.current.value.dark);

const themeIcon = computed(() =>
  theme.global.current.value.dark ? "mdi-weather-night" : "mdi-sunglasses"
);

function toggleTheme() {
  theme.global.name.value = isDarkTheme.value ? "light" : "dark";
}
</script>
