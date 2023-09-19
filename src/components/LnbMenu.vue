<template>
  <v-navigation-drawer v-model="drawerOpen" app permanent location="left">
    <template v-slot:prepend>
      <v-list-item
        lines="two"
        prepend-avatar="https://randomuser.me/api/portraits/women/81.jpg"
        :title="`${$store.state.user.email}`"
        :subtitle="`${$store.state.user.username} 님 안녕하세요`"
      ></v-list-item>
      <button
        @click="Logout"
        style="position: absolute; top: 18px; right: 12px"
      >
        <v-icon left>mdi-logout</v-icon>
      </button>
    </template>
    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="(menu, idx) in $store.state.menus"
        :key="idx"
        :prepend-icon="menu.icon"
        :title="menu.title"
        :value="menu.value"
        @click="router.push(menu.link)"
      ></v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { watch, onMounted, ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Logout } from "../utils/common";

const store = useStore();
const router = useRouter();

const drawerOpen = ref(false);
const isLoginComputed = computed(() => store.getters.isLogin);

onMounted(() => {
  drawerOpen.value = isLoginComputed.value;
});

watch(isLoginComputed, (newValue) => {
  drawerOpen.value = newValue;
});
</script>
