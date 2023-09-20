<template>
  <v-container fluid>
    <v-row>
      <v-col cols="3">
        <!-- 사용자 목록 -->
        <v-card class="user-list-card">
          <v-card-title class="headline">사용자 목록</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <!-- 사용자 목록 아이템 -->
            <v-list-item
              v-for="(user, index) in users"
              :key="index"
              class="user-list-item"
            >
              <v-list-item-avatar>
                <v-img :src="user.avatar" alt="User"></v-img>
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>{{ user.name }}</v-list-item-title>
                <v-list-item-subtitle>{{ user.status }}</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="9">
        <!-- 채팅 화면 -->
        <v-card class="chat-card">
          <v-card-title class="headline">채팅</v-card-title>
          <v-divider></v-divider>
          <v-card-text class="chat-messages">
            <!-- 메시지 목록 -->
            <v-list dense>
              <v-list-item
                v-for="(message, index) in messages"
                :key="index"
                :class="{ 'user-message': message.isMe }"
              >
                <v-list-item-content>
                  <v-list-item-title class="message-text">
                    {{ message.text }}
                  </v-list-item-title>
                  <v-list-item-subtitle class="message-timestamp">
                    {{ message.timestamp }}
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-divider></v-divider>
          <!-- 메시지 입력 폼 -->
          <v-card-actions class="chat-input">
            <v-text-field
              v-model="newMessage"
              label="메시지 입력"
              outlined
              dense
              class="flex-grow-1"
            ></v-text-field>
            <v-btn @click="sendMessage" color="primary" class="ml-2">
              보내기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      users: [
        { name: "친구 1", status: "온라인", avatar: "user1.jpg" },
        { name: "친구 2", status: "오프라인", avatar: "user2.jpg" },
        // 다른 사용자 추가
      ],
      messages: [
        { text: "안녕하세요!", timestamp: "2023-09-15 10:00", isMe: false },
        {
          text: "안녕하세요! 반갑습니다.",
          timestamp: "2023-09-15 10:00",
          isMe: true,
        },
        // 다른 메시지 추가
      ],
      newMessage: "",
    };
  },
  methods: {
    sendMessage() {
      if (this.newMessage.trim() !== "") {
        this.messages.push({
          text: this.newMessage,
          timestamp: new Date().toLocaleString(),
          isMe: true,
        });
        this.newMessage = "";
        this.scrollToBottom();
      }
    },
    scrollToBottom() {
      this.$nextTick(() => {
        const chatMessages = this.$refs.chatMessages;
        if (chatMessages) {
          chatMessages.scrollTop = chatMessages.scrollHeight;
        }
      });
    },
  },
};
</script>

<style scoped>
/* 사용자 목록 스타일 */
.user-list-card {
  max-width: 300px;
  margin-right: 10px;
}

.user-list-item {
  cursor: pointer;
}

/* 채팅 화면 스타일 */
.chat-card {
  flex-grow: 1;
  overflow: hidden;
}

.chat-messages {
  max-height: 500px;
  overflow-y: scroll;
}

.user-message {
  text-align: right;
}

.message-text {
  padding: 10px;
  background-color: #4caf50;
  color: #fff;
  border-radius: 10px;
}
.user-message .message-timestamp {
  text-align: right;
}
.message-timestamp {
  font-size: 12px;
  color: #999;
  text-align: left;
}
.chat-input {
  padding: 10px;
  background-color: #f5f5f5;
}
</style>
