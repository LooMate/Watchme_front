<template>
  <div class="user-page">
    <div v-if="isLoadingUser">Loading...</div>
    <div v-else>
      <UserDetails :user="user" :ready="true" class="userDet"/>
    </div>
    <div class="posts-section">
      <h3>Posts</h3>
      <div v-if="isLoadingPosts">Loading...</div>
      <div v-else class="post-grid">
        <PostItem class="post" v-for="post in user.posts" :key="post.id" :post="post" />
      </div>
    </div>
  </div>
</template>

<script>

import axios from 'axios';
import UserDetails from '@/components/UserDetails.vue';
import PostItem from '@/components/PostItem.vue';

export default {
  components: {
    UserDetails,
    PostItem,
  },
  data() {
    return {
      user: {},
      isLoadingUser: true,
      isLoadingPosts: true,
    };
  },
  created() {
    const username = this.$route.params.username;
    this.fetchUser(username);
    this.fetchUserPosts(username);
  },
  methods: {
    async fetchUser(username) {
      try {
        const response = await axios.get(`http://192.168.0.101:8080/api/user/show/${username}`);
        this.user = response.data;
        this.isLoadingUser = false;
      } catch (error) {
        console.error('Error fetching user:', error);
        this.isLoadingUser = false;
      }
    },
    async fetchUserPosts(username) {
      try {
        const response = await axios.get(`http://192.168.0.101:8080/api/post/${username}/overview`);
        this.user.posts = response.data;
        this.isLoadingPosts = false;
      } catch (error) {
        console.error('Error fetching user posts:', error);
        this.isLoadingPosts = false;
      }
    },
  },
};
</script>

<style>
/* Your global styles can be added here if needed */
.user-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userDet{
  margin: 50px 0 20px 0;
  width: 300px;
}

.posts-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 900px;
  width: 100%;
}

.posts-section h3 {
  font-size: 24px;
  margin-bottom: 20px;
}

.post-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Set two columns for the posts */
  gap: 20px;
}

.post {
  color: white;
  background-color: #b490bf; /* Added a background color to each post */
  box-shadow: 0 0 10px rgba(108, 15, 122, 0.5);
  border-radius: 5px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px; /* Add margin between posts */
}
div{
  color: white;
}
</style>
