import { posts } from "./index";

function getUserList() {
  return posts.get("/users");
}

function fetchPosts() {
  return posts.get("/");
}

function createPosts(postData) {
  return posts.post("/", postData);
}

export { getUserList, fetchPosts, createPosts };
