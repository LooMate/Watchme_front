<template>
  <div class="registration-login-container">
    <!-- Move the toggle buttons to the top -->
    <div class="toggle-buttons">
      <button :class="{ active: isLoginView }" @click="toggleView(true)">Login</button>
      <button :class="{ active: !isLoginView }" @click="toggleView(false)">Register</button>
    </div>

    <!-- Move the forms to the center -->
    <div class="form-container">
      <!-- Login Form -->
      <form v-if="isLoginView" @submit.prevent="login">
        <h2>Login</h2>
        <div class="form-field">
          <label for="login-username">Username:</label>
          <input v-model="loginForm.username" type="text" id="login-username" required @focus="onFocusGlow"
                 @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="login-password">Password:</label>
          <input v-model="loginForm.password" type="password" id="login-password" required @focus="onFocusGlow"
                 @blur="onBlurGlow"/>
        </div>
        <button type="submit" @mouseover="onMouseOverButton" @mouseleave="onMouseLeaveButton">Login</button>
      </form>

      <!-- Registration Form -->
      <form v-else @submit.prevent="register">
        <h2>Register</h2>
        <div class="form-field">
          <label for="registration-username">Username:</label>
          <input v-model="registrationForm.username" type="text" id="registration-username" required
                 @focus="onFocusGlow" @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="registration-email">Email:</label>
          <input v-model="registrationForm.email" type="email" id="registration-email" required @focus="onFocusGlow"
                 @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="registration-password">Password:</label>
          <input v-model="registrationForm.password" type="password" id="registration-password" required
                 @focus="onFocusGlow" @blur="onBlurGlow"/>
        </div>
        <div class="form-field">
          <label for="registration-referral">Referral code:</label>
          <input v-model="registrationForm.usedReferralCode" type="text" id="registration-referral"
                 @focus="onFocusGlow" @blur="onBlurGlow"/>
        </div>
        <button type="submit" @mouseover="onMouseOverButton" @mouseleave="onMouseLeaveButton">Register</button>
      </form>
    </div>

    <!-- Google Login Button -->
    <div>
      <a :href="googleLoginUrl" class="google-login-button">Google Login</a>
    </div>

    <!-- Show the success or error message -->
    <div class="message" :class="messageType">
      {{ messageText }}
    </div>

  </div>
</template>

<script>
import axios from 'axios'; // Import Axios

export default {
  data() {
    return {
      isLoginView: true,
      registrationForm: {
        timeZone: '',
        username: '',
        password: [],
        email: '',
        usedReferralCode: '',
        invitedFrom: '',
      },
      loginForm: {
        username: '',
        password: '',
      },
      messageText: '',
      messageType: '', // Can be 'success' or 'error'
    };
  },

  computed: {
    browserTimeZone() {
      // Get the browser's timezone offset in minutes
      const timezoneOffset = new Date().getTimezoneOffset();
      // Convert the timezone offset to a timezone identifier (e.g., "GMT-07:00" or "GMT+02:00")
      const timezoneIdentifier =
          (timezoneOffset > 0 ? '-' : '+') +
          ('00' + Math.floor(Math.abs(timezoneOffset) / 60)).slice(-2) +
          ':' +
          ('00' + (Math.abs(timezoneOffset) % 60)).slice(-2);
      return timezoneIdentifier;
    },
    isAuthenticated() {
      return this.$store.getters['auth/isAuthenticated']; // Access the isAuthenticated getter from the Vuex store
    },
    googleLoginUrl() {
      return 'https://watchmebacktest-production.up.railway.app/oauth2/authorization/google';
    },
  },

  methods: {

    toggleView(isLogin) {
      this.clearData()
      this.isLoginView = isLogin;
    },

    clearData() {
      this.registrationForm = {
        timeZone: '',
        username: '',
        password: [],
        email: '',
        usedReferralCode: '',
        invitedFrom: '',
      }
      this.loginForm = {
        username: '',
        password: '',
      }
    },

    // Dynamic glow effect when input fields and buttons are focused
    onFocusGlow(event) {
      const element = event.target;
      element.style.boxShadow = '0 0 10px rgba(0, 255, 0, 0.5)'; // Green glow on focus
    },

    // Remove glow effect when input fields and buttons are blurred
    onBlurGlow(event) {
      const element = event.target;
      element.style.boxShadow = 'none'; // Remove the glow on blur
    },

    // Dynamic glow effect when buttons are hovered
    onMouseOverButton(event) {
      const button = event.target;
      button.style.boxShadow = '0 0 10px rgba(255, 0, 0, 0.5)';
    },

    // Remove glow effect when buttons are not hovered
    onMouseLeaveButton(event) {
      const button = event.target;
      button.style.boxShadow = 'none';
    },

    async register() {
      try {
        const response = await axios.post('https://watchmebacktest-production.up.railway.app/api/user/register', {
          timeZone: this.registrationForm.timeZone,
          username: this.registrationForm.username,
          password: this.registrationForm.password,
          email: this.registrationForm.email,
          usedReferralCode: this.registrationForm.usedReferralCode,
          invitedFrom: 'REGULAR',
        });

        // Assuming your backend returns an access_token and refresh_token upon registration
        const {access_token, refresh_token} = response.data;

        // Save the tokens in localStorage or Vuex store for future use
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);


        this.showMessage('success', 'Registration successful!');

        setTimeout(() => {
          location.reload()
        }, 1500);
      } catch (error) {
        console.error('Error during registration:', error);
        // Handle registration error here (e.g., show an error message to the user)
        this.showMessage('error', error.response.data);//'Registration failed. Please try again.'
      }
      this.clearData()
    },
    async login() {
      try {
        // Create a new FormData object
        const formData = new FormData();
        formData.append('username', this.loginForm.username);
        formData.append('password', this.loginForm.password);

        // Set the appropriate headers for form-data
        const config = {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        };

        // Send the form-data in the request
        const response = await axios.post('https://watchmebacktest-production.up.railway.app/login', formData, config);

        // Assuming your backend returns an access_token and refresh_token upon successful login
        const {access_token, refresh_token} = response.data;

        // Save the tokens in localStorage or Vuex store for future use
        localStorage.setItem('access_token', access_token);
        localStorage.setItem('refresh_token', refresh_token);

        if (response.data.access_token === undefined) {
          this.showMessage('error', 'Login failed. Please check your credentials.');
        } else {
          this.$store.commit('auth/setIsAuthenticated', true);
          this.showMessage('success', 'Login successful!');
        }
        // Redirect to a specific page after successful login
        setTimeout(() => {
          this.$router.push('/post/overview');
        }, 1500);
      } catch (error) {
        console.error('Error during login:', error);
        // Handle login error here (e.g., show an error message to the user)
        this.showMessage('error', error.response.data);
      }
      this.clearData()
    },

    showMessage(type, text) {
      this.messageType = type;
      this.messageText = text;
      setTimeout(() => {
        this.clearMessage();
      }, 3000); // Automatically clear the message after 5 seconds (adjust the time as needed)
    },
    clearMessage() {
      this.messageType = '';
      this.messageText = '';
    },

  },
};
</script>


<style scoped>

/* The rest of your styles */
.registration-login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  width: 100%;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.form-container {
  width: 100%;
  max-width: 380px;
  padding: 20px;
  background-color: #73387c;; /* Bright purple background color */
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

input {
  padding: 10px;
  font-size: 16px;
  border: 2px solid #fff;
  border-radius: 5px;
  background-color: rgba(138, 21, 136, 0.93); /* Bright purple background color */
  color: #fff;
  transition: border-color 0.3s ease;
  width: -webkit-fill-available;
}

input:focus {
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

.toggle-buttons {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px; /* Reduce the top margin to align with the main styles */
}

.toggle-buttons button {
  flex: 1;
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  background-color: #34f1f5;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.8);
  /* Neon glowing effect */
  box-shadow: 0 0 10px #22a7ab, 0 0 20px #22a7ab;
}

.toggle-buttons button.active {
  background-color: #ff5151; /* Bright red button color for active button */
  /* Neon glowing effect on active button */
  box-shadow: 0 0 10px #d54646, 0 0 20px #d54646;
}


.google-login-button {
  font-family: 'AT Open Sans';
  font-size: 20px;

  width: 150px;
  height: 50px;
  margin: 50px 20px 20px 20px;
  padding: 10px 20px;
  background-color: #00cc08;
  color: #fff;
  border-radius: 5px;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition: background-color 0.3s ease;
  /* Add some shadow for a 3D effect */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);

  /* Neon glowing effect */
  position: relative;
  animation: glowing-neon 2s ease-in-out infinite;
}

@keyframes glowing-neon {
  0% {
    box-shadow: 0 0 10px #00cc08, 0 0 20px #00ffc6;
  }
  50% {
    box-shadow: 0 0 20px #00cc08, 0 0 40px #00ffc6;
  }
  100% {
    box-shadow: 0 0 10px #00cc08, 0 0 20px #00ffc6;
  }
}

.google-login-button:hover {
  background-color: #008807;
}

.google-login-button:focus {
  outline: none;
}


/* Style for the message */
.message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
  background-color: #34f1f5; /* Bright blue color for success message */
  color: #fff;
  font-weight: bold;
  transition: top 0.3s ease; /* Smooth transition effect for the message animation */
}

.message.error {
  background-color: #ff5151; /* Bright red color for error message */
}

.message.success {
  background-color: #28a745; /* Bright green color for success message */
}

/* Responsive styles for small tablets and large phones */
@media (min-width: 481px) and (max-width: 768px) {

  .form-container {
    max-width: 50%;
  }

  .toggle-buttons button {
    width: 180px; /* Adjust button width */
    font-size: 18px; /* Adjust font size for buttons */
    padding: 8px; /* Adjust button padding */
  }

  .form-field input {
    font-size: 18px;
  }
}

/* Responsive styles for medium-sized tablets and small laptops */
@media (min-width: 769px) and (max-width: 1024px) {
  .toggle-buttons button {
    width: 180px; /* Adjust button width */
    font-size: 20px; /* Adjust font size for buttons */
    padding: 10px; /* Adjust button padding */
  }

  .form-field input {
    font-size: 20px;
  }
}


/* Responsive styles for very small screens (less than 360 pixels) */
@media (min-width: 200px) and (max-width: 480px) {

  .toggle-buttons button {
    width: 70%;
    font-size: 14px; /* Adjust font size for buttons */
    padding: 8px; /* Adjust button padding */
  }

  .form-container {
    width: 75%;
  }

  .form-field input {
    font-size: 14px;
  }
}
</style>
