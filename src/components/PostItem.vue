<template>
  <div class="post-item" :style="getPostItemStyle()" @click="$router.push(`/post/more/${post.id}`)">
    <div class="post-preview" :style="getPostPreviewStyle()">
      <img v-if="post.previewImage" :src="'data:image/jpeg;base64,' + post.previewImage" alt="Preview Image" class="post-image" />
    </div>
    <div class="post-info">
      <h3 class="post-title">{{ post.postName }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
    getPostItemStyle() {
      const backgroundColor = this.post.isHot ? '#ffb811' : '#6c0f7a';
      return {
        background: `linear-gradient(to bottom, ${backgroundColor}, #65314e)`,
      };
    },
    getPostPreviewStyle() {
      // Adjust the height of the post preview based on the screen width
      if(window.innerWidth < 480){
        return {
          height: '200px',
        };
      }else if (window.innerWidth < 768) {
        return {
          height: '250px',
        };
      } else if (window.innerWidth < 1024) {
        return {
          height: '300px',
        };
      } else {
        return {
          height: '350px',
        };
      }
    },
  },
};
</script>

<style>
.post-item {
  background-color: #b490bf;
  box-shadow: 0 0 10px rgba(108, 15, 122, 0.5);
  width: 575px;
  height: 430px;
  padding: 10px;
  border-radius: 5px;
  display: flex;
  overflow: hidden;
  margin: 30px 50px 50px;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}

.post-preview {
  border-radius: 5px;
}

.post-image {
  width: 100%;
  height: 100%;
  border-radius: 5px; /* Optional: Add rounded corners to the image */
  object-fit: contain;
}

.post-info {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  margin: 10px;
  color: #fff;
  text-shadow: 2px 2px 4px rgba(108, 15, 122, 0.8);
  align-items: center;
}

.post-title {
  font-size: 24px;
  margin-bottom: 10px; /* Add some margin below the title */
}

.post-details p {
  font-size: 16px;
  margin-bottom: 5px;
}

.post-details strong {
  font-weight: bold;
}

@media (min-width: 201px) and (max-width: 480px) {
  .post-item {
    width: 70%; /* Adjust the width for small tablets and large phones */
    height: 280px; /* Adjust the height for small tablets and large phones */
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .post-title {
    font-size: 14px;
  }
}

/* Responsive styles for small tablets and large phones */
@media (min-width: 481px) and (max-width: 768px) {
  .post-item {
    width: 70%; /* Adjust the width for small tablets and large phones */
    height: 370px; /* Adjust the height for small tablets and large phones */
  }
}

/* Responsive styles for medium-sized tablets and small laptops */
@media (min-width: 769px) and (max-width: 1024px) {
  .post-item {
    width: 60%; /* Adjust the width for medium-sized tablets and small laptops */
    height: 400px; /* Adjust the height for medium-sized tablets and small laptops */
  }
}

/* Responsive styles for very small screens (less than 360 pixels) */
@media (max-width: 200px) {
  .post-item {
    width: 75%; /* Adjust the width for very small screens */
    height: 260px; /* Adjust the height for very small screens */
  }

  .post-title {
    font-size: 15px; /* Adjust the font size of the post titles for very small screens */
  }
}
</style>
