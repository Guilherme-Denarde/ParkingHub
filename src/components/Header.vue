<template>
    <header>
      <div class="logo">
        <img src="logo.png" alt="Brand Logo">
      </div>
      <nav>
        <ul class="main-nav">
          <li><a href="#">Home</a></li>
          <li><a href="#">Products</a></li>
          <li><a href="#">Services</a></li>
          <li><a href="#">About</a></li>
          <li><a href="#">Contact</a></li>
        </ul>
      </nav>
      <div class="menu-icon" @click="togglePopup">
        <span></span>
        <span></span>
        <span></span>
      </div>
      <div class="popup" :class="{ 'show': showPopup }">
        <nav class="popup-nav">
          <ul>
            <li><a href="#">Page 1</a></li>
            <li><a href="#">Page 2</a></li>
            <li><a href="#">Page 3</a></li>
            <li><a href="#">Page 4</a></li>
          </ul>
        </nav>
      </div>
    </header>
  </template>
  
  <script>
  export default {
    data() {
      return {
        showPopup: false
      };
    },
    methods: {
      togglePopup() {
        this.showPopup = !this.showPopup;
      }
    }
  };
  </script>
  
  <style scoped>
  /* Header styles */
  header {
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    padding: 10px;
  }
  
  .logo img {
    height: 40px;
  }
  
  nav ul {
    list-style: none;
    display: flex;
    margin: 0;
    padding: 0;
  }
  
  nav ul li {
    margin-right: 15px;
  }
  
  nav ul li a {
    text-decoration: none;
    color: #333;
  }
  
  /* Menu icon styles */
  .menu-icon {
    display: none;
    cursor: pointer;
  }
  
  .menu-icon span {
    display: block;
    width: 25px;
    height: 3px;
    background-color: #333;
    margin-bottom: 5px;
  }
  
  /* Popup styles */
  .popup {
    display: none;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
  }
  
  .popup.show {
    display: block;
  }
  
  .popup-nav {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 200px;
    background-color: #fff;
    padding: 20px;
    box-sizing: border-box;
  }
  
  .popup-nav ul {
    list-style: none;
    padding: 0;
  }
  
  .popup-nav ul li {
    margin-bottom: 10px;
  }
  
  .popup-nav ul li a {
    text-decoration: none;
    color: #333;
  }
  </style>
  