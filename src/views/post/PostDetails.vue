<template>
  <div class="post-details-page">
    <div class="post-details">
      <div class="m-image">
        <img
            v-if="post.image"
            :src="'data:image/jpeg;base64,' + post.image"
            alt="Preview Image"
            class="post-image"
        />
      </div>
      <div class="post-description">
        <pre>{{ post.description }}</pre>
      </div>
      <div class="timestamp-section">
        <p class="timestamp"><h5>created:{{ formatDateTime(post.createdAt) }}</h5></p>
        <p class="timestamp"><h5>changed: {{ formatDateTime(post.lastChangedAt) }} </h5></p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        id: this.$route.params.postId,
        invitorUsername: '',
        viewer: '',
      },
    };
  },
  created() {
    this.fetchPostDetails();
  },
  methods: {
    async fetchPostDetails() {
      try {
        const response = await fetch(`https://watchmebacktest-production.up.railway.app/api/post/more?pI=${this.post.id}&inv=${this.post.invitorUsername}&view=${this.post.viewer}`);
        if (response.ok) {
          const data = await response.json();
          this.post = data;
        } else {
          console.error('Error fetching post details:', response.status);
        }
      } catch (error) {
        console.error('Error fetching post details:', error);
      }
    },
    formatDateTime(dateTimeString) {
      const dateTime = new Date(dateTimeString);
      const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        hour12: true,
      };
      return dateTime.toLocaleString(undefined, options);
    },
  },
};
</script>

<style scoped>
.post-details-page {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.post-details {
  max-height: 1000px;
  max-width: 1000px;
  margin: 30px 30px 10vh 30px;
  padding: 20px 20px 0 20px;
  background-color: hsl(285.68deg 89.57% 15.7% / 90%);
  box-shadow: 0 0 10px rgba(108, 15, 122, 0.5);
  border-radius: 5px;
  color: #fff;
  position: relative; /* Set position to relative for positioning the timestamp section */
}

.post-image {
  border-radius: 5px;
  margin: 10px;
  max-height: inherit;
}

.post-description {
  min-height: 65px;
  border: 2px solid #c52abb; /* Set the border to neon glowing blue color */
  margin: 15px 10px 25px 10px;
  font-size: 18px;
  flex-grow: 1;

  /* Neon glowing effect using CSS animation */
  box-shadow: 0 0 10px rgb(52, 241, 245);
  animation: neonGlow 1s ease-in-out infinite alternate;
}

@keyframes neonGlow {
  from {
    box-shadow: 0 0 10px rgb(231 44 219);
  }
  to {
    box-shadow: 0 0 20px rgb(52, 241, 245);
  }
}
.timestamp-section {
  display: flex;
  position: relative;
  bottom: 0;
  left: 0;
  margin: 5px;
}

.timestamp {
  font-size: 14px;
}

.m-image {
  max-height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h5,
p {
  margin: 5px;
}

pre{
  white-space: pre-wrap;
  font-size: 15px;
  margin: 5px;
  padding: 5px;
}




@media (min-width: 201px) and (max-width: 480px) {
  .post-details {
    width: 80%; /* Adjust the width for small tablets and large phones */
  }
}

/* Responsive styles for small tablets and large phones */
@media (min-width: 481px) and (max-width: 768px) {
  .post-details {
    width: 50%; /* Adjust the width for small tablets and large phones */
  }

  pre{
    font-size: 10px;
  }
}

/* Responsive styles for medium-sized tablets and small laptops */
@media (min-width: 769px) and (max-width: 1024px) {
  .post-details {
    width: 70%; /* Adjust the width for small tablets and large phones */
  }

  pre{
    font-size: 14px;
  }
}

/* Responsive styles for very small screens (less than 360 pixels) */
@media (max-width: 200px) {
  .post-details {
    width: 70%; /* Adjust the width for small tablets and large phones */
  }

  pre{
    font-size: 20px;
  }

}

</style>