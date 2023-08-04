<template>
</template>

<script>

export default {
  name: 'Logout',
  created() {
    // Call the logout method to clear tokens and redirect to the overview page
    this.logout();
  },
  methods: {
    logout() {
      // Clear the tokens from localStorage
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');

      this.$store.commit('auth/setIsAuthenticated', false);

      // Redirect the user to the overview page
      this.$router.push('/post/overview');
    },
  },
};
</script>
