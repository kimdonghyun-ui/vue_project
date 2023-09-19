<template>
  <v-card class="mx-auto" style="max-width: 500px">
    <v-toolbar color="deep-purple-accent-4" cards dark flat>
      <v-btn icon @click="goBack">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-card-title class="text-h6 font-weight-regular">
        회원가입
      </v-card-title>
    </v-toolbar>
    <v-form ref="form" v-model="isValid" class="pa-4 pt-6">
      <v-textarea
        v-model="userData.username"
        auto-grow
        variant="filled"
        color="deep-purple"
        label="이름"
        :rules="[rules.required]"
        type="name"
        rows="1"
      ></v-textarea>
      <v-textarea
        v-model="userData.email"
        auto-grow
        variant="filled"
        color="deep-purple"
        label="이메일"
        :rules="[rules.email]"
        type="email"
        rows="1"
      ></v-textarea>

      <v-text-field
        v-model="userData.password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :rules="[rules.password, rules.length(6)]"
        variant="filled"
        color="deep-purple"
        counter="6"
        label="비번"
        style="min-height: 96px"
        :type="visible ? 'text' : 'password'"
        @click:append-inner="visible = !visible"
      ></v-text-field>
    </v-form>
    <v-divider></v-divider>
    <v-card-actions>
      <v-btn variant="text" @click="form.reset()"> 초기화 </v-btn>
      <v-spacer></v-spacer>
      <v-btn
        :disabled="!isValid"
        :loading="isLoading"
        color="deep-purple-accent-4"
        @click="submitForm"
      >
        회원가입
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script setup>
import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

const store = useStore();
const router = useRouter();
const visible = ref(false);
const isValid = ref(false);

const form = ref(null);
let isLoading = false;
const userData = ref({
  username: "",
  email: "",
  password: "",
  confirmed: false,
  blocked: false,
});

const rules = {
  email: (v) => !!(v || "").match(/@/) || "Please enter a valid email",
  length: (len) => (v) =>
    (v || "").length >= len || `Invalid character length, required ${len}`,
  password: (v) =>
    !!(v || "").match(/^(?=.*[a-z])(?=.*\d)(?=.*(_|[^\w])).+$/) ||
    "비밀번호는 반드시 대문자, 숫자, 특수문자를 포함해야 합니다.",

  required: (v) => !!v || "This field is required",
};

// 이전 페이지로 돌아가는 함수
const goBack = () => {
  router.go(-1); // 이전 페이지로 이동
};

const submitForm = async () => {
  try {
    await store.dispatch("SIGNUP", userData.value);
    router.push("/home");
  } catch (error) {
    console.log("catch", error);
  } finally {
    console.log("finally");
  }
};
</script>
