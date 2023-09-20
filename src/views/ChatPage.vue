<template>
  <ChatBox />
</template>

<script>
import { defineComponent } from "vue";

// Components
import ChatBox from "../components/ChatBox.vue";

export default defineComponent({
  name: "ChatPage",

  components: {
    ChatBox,
  },
});
</script>
