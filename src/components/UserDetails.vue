<template>
  <div class="user-details">
    <h2 class="neon-purple">User Details</h2>
    <div class="user-info">
      <p><strong>Username:</strong> {{ user.username }}</p>
      <p><strong>Posts:</strong> {{ user.postsIdsList.length }}</p>
      <p><strong>Subscribers:</strong> {{ user.subscribersIdsList.length }}</p>
      <p><strong>Is Premium:</strong> {{ user.isPremium ? 'Yes' : 'No' }}</p>
      <!-- Add other user fields as needed -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    user: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style>
/* Your styles can be added here */
.user-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  padding: 20px;
  margin: 0 auto;
  background-color: #292929;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  position: relative; /* Set the position to relative */
}

.neon-purple {
  font-size: 24px;
  margin-bottom: 20px;
  color: #c115d2;
  text-shadow: 0 0 5px #c115d2, 0 0 20px #c115d2, 0 0 40px #c115d2;
}

.user-info {
  text-align: center;
}

.user-info p {
  font-size: 16px;
  margin-bottom: 10px;
}

.user-info strong {
  font-weight: bold;
  color: #fff;
}

/* Neon glow effect on hover */
.user-details:hover {
  box-shadow: 0 0 20px rgba(193, 21, 210, 0.8);
}

/* Cool background pattern */
.user-details::before {
  content: '';
  position: absolute;
  top: -10px;
  left: -10px;
  right: -10px;
  bottom: -10px;
  background-image: linear-gradient(45deg, #c115d2, #381595);
  z-index: -1;
  opacity: 0.8;
  border-radius: 15px;
}
</style>
