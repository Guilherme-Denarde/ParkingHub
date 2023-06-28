<template>
    <div class="container">
      <h1>Settings</h1>
      <div class="option">
        <label for="hourValue">Hour Value:</label>
        <input v-model="hourValue" type="number" min="0" step="0.01" class="rounded-input" />
      </div>
      <div class="option">
        <label for="trafficTicket">Traffic Ticket:</label>
        <input v-model="trafficTicket" type="number" min="0" step="0.01" class="rounded-input" />
      </div>
      <div class="option">
        <label for="startWorkHr">Start Work Hour:</label>
        <input v-model="startWorkHr" type="time" class="rounded-input" />
      </div>
      <div class="option">
        <label for="endWorkHr">End Work Hour:</label>
        <input v-model="endWorkHr" type="time" class="rounded-input" />
      </div>
      <div class="option">
        <label for="discountTime">Discount value:</label>
        <input v-model="discountValue" type="number" min="0" step="0.01" class="rounded-input" />
      </div>
      <div class="option">
        <label for="discountTime">Discount Time:</label>
        <input v-model="discountTime" type="number" min="0" step="0.01" class="rounded-input" />
      </div>
      <div class="option">
        <label for="discountShift">Discount Shift:</label>
        <div class="toggle-button" @click="toggleDiscountShift" :class="{ active: discountShift }">
          <div class="handle"></div>
        </div>
      </div>
      <div class="option">
        <label for="carVacancy">Car Vacancy:</label>
        <input v-model="carVacancy" type="number" min="0" class="rounded-input" />
      </div>
      <div class="option">
        <label for="bikeVacancy">Bike Vacancy:</label>
        <input v-model="bikeVacancy" type="number" min="0" class="rounded-input" />
      </div>
      <div class="option">
        <label for="vanVacancy">Van Vacancy:</label>
        <input v-model="vanVacancy" type="number" min="0" class="rounded-input" />
      </div>
      <div class="dark-mode">
        <label for="darkMode">Dark Mode:</label>
        <div class="toggle-button" @click="toggleDarkMode" :class="{ active: darkMode }">
          <div class="handle"></div>
        </div>
      </div>
    </div>
  </template>
  
  
<script>
export default {
  data() {
    return {
      hourValue: 0,
      trafficTicket: 0,
      startWorkHr: '',
      endWorkHr: '',
      discountTime: 0,
      discountShift: false,
      carVacancy: 0,
      bikeVacancy: 0,
      vanVacancy: 0,
      darkMode: false
    };
  },
  mounted() {
    this.loadSettings();
  },
  methods: {
    loadSettings() {
      const request = window.indexedDB.open('settingsDatabase', 1);

      request.onupgradeneeded = (event) => {
        const db = event.target.result;
        const objectStore = db.createObjectStore('settings', { keyPath: 'id' });
        objectStore.transaction.oncomplete = () => {
          const settingsStore = db.transaction('settings', 'readwrite').objectStore('settings');
          settingsStore.add(this.getDefaultSettings());
        };
      };

      request.onsuccess = (event) => {
        const db = event.target.result;
        const settingsStore = db.transaction('settings', 'readwrite').objectStore('settings');
        const getRequest = settingsStore.get(1);

        getRequest.onsuccess = (event) => {
          const settings = event.target.result;
          if (settings) {
            this.updateSettings(settings);
          }
        };
      };
    },
    getDefaultSettings() {
      return {
        id: 1,
        hourValue: 0,
        trafficTicket: 0,
        startWorkHr: '',
        endWorkHr: '',
        discountTime: 0,
        discountShift: false,
        carVacancy: 0,
        bikeVacancy: 0,
        vanVacancy: 0,
        darkMode: false
      };
    },
    updateSettings(settings) {
      this.hourValue = settings.hourValue;
      this.trafficTicket = settings.trafficTicket;
      this.startWorkHr = settings.startWorkHr;
      this.endWorkHr = settings.endWorkHr;
      this.discountTime = settings.discountTime;
      this.discountShift = settings.discountShift;
      this.carVacancy = settings.carVacancy;
      this.bikeVacancy = settings.bikeVacancy;
      this.vanVacancy = settings.vanVacancy;
      this.darkMode = settings.darkMode;
      document.body.classList.toggle('dark', this.darkMode);
    },
    saveSettings() {
      const request = window.indexedDB.open('settingsDatabase', 1);

      request.onsuccess = (event) => {
        const db = event.target.result;
        const settingsStore = db.transaction('settings', 'readwrite').objectStore('settings');
        const settings = {
          id: 1,
          hourValue: this.hourValue,
          trafficTicket: this.trafficTicket,
          startWorkHr: this.startWorkHr,
          endWorkHr: this.endWorkHr,
          discountTime: this.discountTime,
          discountShift: this.discountShift,
          carVacancy: this.carVacancy,
          bikeVacancy: this.bikeVacancy,
          vanVacancy: this.vanVacancy,
          darkMode: this.darkMode
        };
        settingsStore.put(settings);
      };
    },
    toggleDiscountShift() {
      this.discountShift = !this.discountShift;
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode;
      document.body.classList.toggle('dark', this.darkMode);
    }
  },
  watch: {
    hourValue: 'saveSettings',
    trafficTicket: 'saveSettings',
    startWorkHr: 'saveSettings',
    endWorkHr: 'saveSettings',
    discountTime: 'saveSettings',
    discountShift: 'saveSettings',
    carVacancy: 'saveSettings',
    bikeVacancy: 'saveSettings',
    vanVacancy: 'saveSettings',
    darkMode: 'saveSettings'
  }
};
</script>
<style>
  .container {
  text-align: center;
  margin: 2em;
}

.rounded-input {
  padding: 0.5em;
  font-size: 1.1em;
  width: 150px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
  .container {
    text-align: center;
    margin: 2em;
  }
  .option input[type="number"],
.option input[type="time"] {
  padding: 0.5em;
  font-size: 1.1em;
  width: 150px;
}
  .option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1em;
  }
  
  .option label {
    margin-right: 1em;
  }
  
  .toggle-button {
    position: relative;
    width: 60px;
    height: 30px;
    background-color: #ddd;
    border-radius: 15px;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  
  .toggle-button .handle {
    position: absolute;
    top: 2px;
    left: 2px;
    width: 26px;
    height: 26px;
    background-color: #fff;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }
  
  .toggle-button.active {
    background-color: #4CAF50;
  }
  
  .toggle-button.active .handle {
    transform: translateX(30px);
  }
  
  .dark-mode {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1em;
  }
  
  .dark-mode label {
    margin-right: 0.5em;
  }
  
  .dark-mode .toggle-button {
    background-color: #555;
  }
  
  .dark-mode .toggle-button.active {
    background-color: #2196F3;
  }
  
  .dark {
    background-color: #333;
    color: #fff;
  }
  </style>
  