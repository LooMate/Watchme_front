<template>
  <div class="post-overview">
    <h2>Post Overview</h2>
    <div v-if="isLoading">
      <h2>Loading...</h2>
    </div>
    <div v-else class="post-list">
      <PostItem class="posts" v-for="post in posts" :key="post.postName" :post="post"/>
    </div>
  </div>
</template>

<script>
import PostItem from '@/components/PostItem.vue'; // Import the PostItem component

export default {
  components: {
    PostItem, // Register the PostItem component for use
  },
  data() {
    return {
      posts: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchPosts();
  },
  methods: {
    async fetchPosts() {

      try {
        const response = await this.$apiService.get('/api/post/overview');

        // Assuming the response.data is an array of PostDto objects
        this.posts = response.data;


        this.isLoading = false;
      } catch (error) {
        console.error('Error fetching posts:', error);
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.post-overview {
  padding-top: 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Add the following style to hide the scrollbar */
.posts::-webkit-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  width: 0; /* Set the width of the scrollbar to 0 */
}

.post-item h3 {
  margin-top: 0;
}

.post-item img {
  max-width: 100%;
  margin-top: 10px;
}


.post-list{
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;
}

</style>
