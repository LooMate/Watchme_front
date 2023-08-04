<template>
  <div class="post-create-container">
    <!-- Move the form to the center -->
    <div class="form-container">
      <!-- Post Creation Form -->
      <form @submit.prevent="createPost">
        <h2>Create New Post</h2>
        <!-- Post Form -->
        <div class="form-field">
          <label for="post-name">Post Name:</label>
          <input v-model="post.postName" type="text" id="post-name" required @focus="onFocusGlow" @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="post-link">Post Link:</label>
          <input v-model="post.postLink" type="text" id="post-link" required @focus="onFocusGlow" @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="post-priority">Priority:</label>
          <input v-model="post.priority" type="number" id="post-priority" required @focus="onFocusGlow"
                 @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="post-exclusive">Is Exclusive:</label>
          <label class="switch">
            <input v-model="post.isExclusive" type="checkbox" id="post-exclusive" @change="onCheckboxChange"/>
            <span class="slider"></span>
          </label>
        </div>
        <div class="form-field" v-if="post.isExclusive">
          <label for="post-users">Users with Access:</label>
          <input v-model="post.usersIdWithAccess" type="text" id="post-users" @focus="onFocusGlow" @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="post-preview">Preview Image:</label>
          <input type="file" id="post-preview" accept="image/*" @change="onPhotoPreviewChange"/>
        </div>
        <!-- Post Details Form -->
        <div class="form-field">
          <label for="post-description">Description:</label>
          <textarea v-model="postDetails.description" id="post-description" rows="4" required @focus="onFocusGlow"
                    @blur="onBlurGlow"></textarea>
        </div>
        <div class="form-field">
          <label for="post-image">Image:</label>
          <input type="file" id="post-image" accept="image/*" @change="onPhotoChange"/>
        </div>
        <div class="form-field">
          <label for="post-hot">Hot:</label>
          <input v-model="post.hot" type="checkbox" id="post-hot"/>
        </div>
        <button type="submit" @mouseover="onMouseOverButton" @mouseleave="onMouseLeaveButton">Create Post</button>
      </form>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {
      post: {
        postName: '',
        postLink: '',
        priority: '',
        isExclusive: false,
        previewImage: null,
        hot: false
      },
      postDetails: {
        description: '',
        image: null
      },
    };
  },

  methods: {
    onFocusGlow(event) {
      const element = event.target;
      element.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'; // Green glow on focus
    },

    onBlurGlow(event) {
      const element = event.target;
      element.style.boxShadow = 'none'; // Remove the glow on blur
    },

    onCheckboxChange(event) {
      this.post.usersIdWithAccess = event.target.checked ? [] : '';
    },

    onPhotoPreviewChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.post.previewImage = Array.from(new Uint8Array(reader.result));
      };

      // Read the file as binary data (ArrayBuffer)
      reader.readAsArrayBuffer(file);
    },
    onPhotoChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        this.postDetails.image = Array.from(new Uint8Array(reader.result));
        console.log(this.postDetails.image)
      };

      // Read the file as binary data (ArrayBuffer)
      reader.readAsArrayBuffer(file);
    },
    onMouseOverButton(event) {
      const button = event.target;
      button.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
    },

    onMouseLeaveButton(event) {
      const button = event.target;
      button.style.boxShadow = 'none';
    },

    async createPost() {
      try {
        // Set the appropriate headers for form-data, including the Bearer token
        const config = {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('access_token'), // Set the Bearer token in the Authorization header
          },
        };

        // Send the form-data in the request
        const response = await this.$apiService.post('/api/post/create?username=ko&send_type=gmail', {
          post: {
            timeZone: 'WARSZAW',
            postName: this.post.postName,
            postLink: this.post.postLink,
            priority: this.post.priority,
            usersIdWithAccess: [2, 15],
            exclusive: this.post.isExclusive,
            previewImage: this.post.previewImage,
            hot: this.post.hot
          },
          postDetails: {
            description: this.postDetails.description,
            image: this.postDetails.image
          }
        }, config);

        // Handle the response as needed
        console.log('Post created:', response.data);

        // Redirect to a specific page after successful post creation
        // this.$router.push('/'); // Replace '/dashboard' with the desired route
      } catch (error) {
        console.error('Error during post creation:', error);
        // Handle post creation error here (e.g., show an error message to the user)
      }
    },
  },
};
</script>
<style>
/* The rest of your styles */
.post-create-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
}

.form-container {
  width: 100%;
  max-width: 380px;
  padding: 20px;
  background-color: #73387c; /* Bright purple background color */
  box-shadow: 0 0 10px #c115d2, 0 0 20px #c115d2, 0 0 40px #c115d2;
  border-radius: 10px;
  margin: 40px 0 0 0;
}

h2 {
  margin: 0 0 20px;
  color: #fff;
  text-align: center;
  font-size: 24px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
}

.form-field {
  margin-bottom: 20px;
}

label {
  display: block;
  font-weight: bold;
  color: #fff;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  font-size: 16px;
}

input,
textarea {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: rgba(138, 21, 136, 0.93); /* Bright purple background color */
  color: #fff;
  transition: border-color 0.3s ease;
  width: -webkit-fill-available;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #ff0000; /* Bright red border color on focus */
  box-shadow: 0 0 10px rgba(255, 0, 0, 0.5);
}

button {
  margin: 10px;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #34f1f5; /* Bright red button color */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  /* Neon glowing effect */
  box-shadow: 0 0 10px #22a7ab, 0 0 20px #22a7ab;
}

button:hover {
  background-color: #800000; /* Darker red button color on hover */
  /* Neon glowing effect on hover */
  box-shadow: 0 0 10px #800000, 0 0 20px #800000, 0 0 40px #800000, 0 0 60px #800000;
}

.switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  border-radius: 34px;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  border-radius: 50%;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #800080; /* Purple color for the switch when checked */
}

input:focus + .slider {
  box-shadow: 0 0 1px #800080;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

/* Add the following style to hide the scrollbar */
.posts::-webkit-scrollbar {
  width: 0; /* Set the width of the scrollbar to 0 */
}

/* Responsive styles for small tablets and large phones */
@media (min-width: 481px) and (max-width: 768px) {
  .form-container {
    max-width: 50%;
  }
}

/* Responsive styles for medium-sized tablets and small laptops */
@media (min-width: 769px) and (max-width: 1024px) {
  .form-container {
    max-width: 60%;
  }
}

/* Responsive styles for very small screens (less than 360 pixels) */
@media (max-width: 359px) {
  .form-container {
    max-width: 80%;
  }
}
</style>