<template>
  <header>
    <div class="logo">
      <img src="https://cdn-icons-png.flaticon.com/512/103/103946.png" alt="Brand Logo">
    </div>
    <nav>
      <ul class="main-nav" :class="{ 'show': showLinks }">
        <li v-for="link in navLinks" :key="link.to">
          <router-link :to="link.to" @click.native="hidePopup">{{ link.label }}</router-link>
        </li>
      </ul>
    </nav>
    <div class="menu-icon" @click="togglePopup">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="popup" :class="{ 'show': showPopup }">
      <div class="popup-content">
        <button class="close-icon" @click="hidePopup">X</button>
        <nav class="popup-nav">
          <ul>
            <li v-for="link in navLinks" :key="link.to">
              <router-link :to="link.to">{{ link.label }}</router-link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data() {
    return {
      showPopup: false,
      showLinks: true,
      navLinks: [
        { to: "/", label: "Movement" },
        { to: "/brand", label: "Brand" },
        { to: "/model", label: "Model" },
        { to: "/vehicle", label: "Vehicle" },
        { to: "/conductor", label: "Conductor" },
        { to: "/settings", label: "Settings" }
      ]
    };
  },
  methods: {
    togglePopup() {
      this.showPopup = !this.showPopup;
      this.showLinks = false; // Hide the links in the main navigation when the popup is shown
    },
    hidePopup() {
      this.showPopup = false;
      this.showLinks = true; // Show the links in the main navigation when the popup is hidden
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
  width: 200px;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.popup.show {
  display: block;
}

.popup-content {
  position: absolute;
  top: 0;
  right: -200px;
  height: 100%;
  width: 200px;
  background-color: #fff;
  padding: 20px;
  box-sizing: border-box;
  transition: right 0.3s ease-in-out;
}

.popup.show .popup-content {
  right: 0;
}

.popup-nav ul {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.popup-nav ul li {
  margin-bottom: 10px;
}

.popup-nav ul li a {
  text-decoration: none;
  color: #333;
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 16px;
  background: none;
  border: none;
  cursor: pointer;
}

@media (max-width: 768px) {
  nav ul li {
    display: none;
  }

  .menu-icon {
    display: block;
    margin-left: auto;
  }

  .popup-content {
    width: 100%;
    right: -100%;
    transition: right 0.3s ease-in-out;
  }

  .popup.show .popup-content {
    right: 0;
  }

  .main-nav.show {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-top: 10px;
  }
}
</style>
