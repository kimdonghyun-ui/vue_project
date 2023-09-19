<template>
  <v-app>
    <v-layout>
      <LnbMenu />
      <v-main>
        <router-view />
      </v-main>
    </v-layout>
  </v-app>
</template>

<script setup>
import LnbMenu from "./components/LnbMenu.vue";
</script>
