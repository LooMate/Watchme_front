<template>
  <div>
    <div v-if="successMessage" class="message success">{{ successMessage }}</div>
    <div v-if="errorMessage" class="message error">{{ errorMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      successMessage: "",
      errorMessage: "",
    };
  },
  // mounted() {
  //   // Execute the script received in the response headers to store the message in sessionStorage
  //   console.log(document.head)
  //   const script = document.head.querySelector("[data-inject='X-Script']").textContent;
  //   // eval(script);
  //
  //   // Retrieve the message from sessionStorage
  //   const message = sessionStorage.getItem('message');
  //   console.log('Message:', message); // Output the message in the console
  // }
};
</script>

<style>
.message {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
  font-weight: bold;
  z-index: 9999;
  transition: top 0.3s ease;
}

.message.success {
  background-color: #28a745; /* Bright green color for success message */
  color: #fff;
}

.message.error {
  background-color: #ff5151; /* Bright red color for error message */
  color: #fff;
}
</style>
