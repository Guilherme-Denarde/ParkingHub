<template>
    <div class="container">
      <div class="background-car"></div>
      <h1 class="not-found-text">Page Not Found</h1>
      <p class="emoji-car" @click="goHome">🚗</p>
      <p class="home-link">Go back to <router-link to="/">Home</router-link></p>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      goHome() {
        this.$router.push('/');
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #f5f5f5;
    position: relative;
  }
  
  .background-car {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    /* background-image: url(https://cdn-icons-png.flaticon.com/512/2867/2867625.png); */
    background-size: cover;
    background-repeat: no-repeat;
    opacity: 0.2;
  }
  
  .not-found-text {
    font-size: 3rem;
    margin-bottom: 1rem;
  }
  
  .emoji-car {
    font-size: 6rem;
    margin-bottom: 2rem;
    cursor: pointer;
  }
  
  .home-link {
    font-size: 1.2rem;
    color: #333;
  }
  
  .home-link a {
    color: #333;
    text-decoration: none;
  }
  
  .home-link a:hover {
    text-decoration: underline;
  }
  </style>
  