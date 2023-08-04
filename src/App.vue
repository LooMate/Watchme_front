<template>
  <div id="app" class="app-container">
    <!-- Main Content -->
    <main>
      <router-view></router-view>
    </main>

    <!-- Navigation Bar -->
    <nav class="navbar">
      <router-link to="/post/overview" class="nav-link" v-if="$route.path !== '/post/overview'">Post Overview</router-link>
      <router-link to="/auth" class="nav-link" v-if="$route.path !== '/auth' && !isAuthenticated">Login</router-link>
      <router-link to="/post/create" class="nav-link" v-if="$route.path !== '/post/create' && isAuthenticated">Post Create</router-link>
      <router-link to="/auth/logout" class="nav-link" v-if="$route.path !== '/auth/logout' && isAuthenticated">Logout</router-link>
      <!-- Add other navigation links as needed -->
    </nav>
  </div>
</template>`

<script>
import { mapGetters } from 'vuex'; // Import mapGetters to access Vuex store getters
export default {

  computed: {
    ...mapGetters('auth', ['isAuthenticated']), // Map the isAuthenticated getter from the auth store module
  },
  // Any additional configurations can be added here, but for a basic setup, this section can be empty.
};
</script>

<style>
/* Your global styles can be added here if needed */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.2)),
  url(https://images.unsplash.com/photo-1531113165519-5eb0816d7e02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: fixed;
  overflow: auto;
}

/* Style for the navigation bar */
.navbar {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-around;
  background-color: #333;
  padding: 10px 0;
}

.nav-link {
  color: #fff;
  text-decoration: none;
  padding: 5px 10px;
  border-radius: 5px;
}

.nav-link:hover {
  background-color: #555;
}

</style>
