<template>
  <v-table>
    <thead>
      <tr>
        <th class="text-left">ID</th>
        <th class="text-left">USERNAME</th>
        <th class="text-left">EMAIL</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, idx) in hello" :key="idx">
        <td>{{ item.id }}</td>
        <td>{{ item.username }}</td>
        <td>{{ item.email }}</td>
      </tr>
    </tbody>
  </v-table>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex"; // Vuex에서 useStore 함수를 가져옵니다.
const store = useStore(); // useStore 함수를 사용하여 스토어에 액세스합니다.
let hello = ref([]);
onMounted(() => {
  submitForm();
});

const submitForm = async () => {
  try {
    const response = await store.dispatch("userStore/getUsers");
    hello.value = response;
    console.log("서브밋", hello);
  } catch (error) {
    console.log("catch", error);
  } finally {
    console.log("finally");
  }
};
</script>
