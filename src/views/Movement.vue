<template>
    <div class="container">
      <h1>Movements</h1>
      <div class="input-section">
        <select v-model="selectedVehicle" class="vehicle-select">
          <option value="0">Select Vehicle</option>
          <option v-for="vehicle in vehicles" :value="vehicle.id" :key="vehicle.id">{{ vehicle.brand }} - {{ vehicle.model }}</option>
        </select>
        <select v-model="selectedConductor" class="conductor-select">
          <option value="0">Select Conductor</option>
          <option v-for="conductor in conductors" :value="conductor.id" :key="conductor.id">{{ conductor.fullName }}</option>
        </select>
        <input v-model="newMovementTime" placeholder="Time" class="time-input" />
        <button @click="createMovement" class="add-button">Add Movement</button>
      </div>
      <table class="movements-table">
        <thead>
          <tr>
            <th>Vehicle</th>
            <th>Conductor</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="movement in movements" :key="movement.id">
            <td>{{ getVehicleById(movement.vehicleId).brand }} - {{ getVehicleById(movement.vehicleId).model }}</td>
            <td>{{ getConductorById(movement.conductorId).fullName }}</td>
            <td>{{ movement.time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  
  export default defineComponent({
    setup() {
      const selectedVehicle = ref("0");
      const selectedConductor = ref("0");
      const newMovementTime = ref("");
      const vehicles = ref<any[]>([]);
      const conductors = ref<any[]>([]);
      const movements = ref<any[]>([]);
      let db: any;
  
      const dbRequest = window.indexedDB.open("movementDatabase", 1);
  
      dbRequest.onupgradeneeded = function (event: any) {
        db = event.target.result;
        if (db) {
          db.createObjectStore("vehicles", { keyPath: "id", autoIncrement: true });
          db.createObjectStore("conductors", { keyPath: "id", autoIncrement: true });
          db.createObjectStore("movements", { keyPath: "id", autoIncrement: true });
        }
      };
  
      dbRequest.onsuccess = function (event: any) {
        db = event.target.result;
        fetchVehiclesFromDB();
        fetchConductorsFromDB();
        fetchMovementsFromDB();
      };
  
        const fetchVehiclesFromDB = (): void => {
    if (!db) return;
    const transaction = db.transaction(['vehicles'], 'readonly');
    const objectStore = transaction.objectStore('vehicles');
    const getRequest = objectStore.getAll();

    getRequest.onsuccess = function (event: any) {
        vehicles.value = event.target.result;
    };
    };

    const fetchConductorsFromDB = (): void => {
    if (!db) return;
    const transaction = db.transaction(['conductors'], 'readonly');
    const objectStore = transaction.objectStore('conductors');
    const getRequest = objectStore.getAll();

    getRequest.onsuccess = function (event: any) {
        conductors.value = event.target.result;
    };
    };

  
      const fetchMovementsFromDB = (): void => {
        if (!db) return;
        const transaction = db.transaction(["movements"], "readonly");
        const objectStore = transaction.objectStore("movements");
        const getRequest = objectStore.getAll();
  
        getRequest.onsuccess = function (event: any) {
          movements.value = event.target.result;
        };
      };
  
      const createMovement = (): void => {
        if (!db || selectedVehicle.value === "0" || selectedConductor.value === "0" || newMovementTime.value.trim() === "")
          return;
  
        const transaction = db.transaction(["movements"], "readwrite");
        const objectStore = transaction.objectStore("movements");
        const time = new Date().toLocaleTimeString();
  
        objectStore.add({
          vehicleId: parseInt(selectedVehicle.value),
          conductorId: parseInt(selectedConductor.value),
          time: newMovementTime.value + " - " + time,
        });
  
        fetchMovementsFromDB();
  
        selectedVehicle.value = "0";
        selectedConductor.value = "0";
        newMovementTime.value = "";
      };
  
      const getVehicleById = (id: number) => {
        return vehicles.value.find((vehicle: any) => vehicle.id === id);
      };
  
      const getConductorById = (id: number) => {
        return conductors.value.find((conductor: any) => conductor.id === id);
      };
  
      // Fetch vehicles and conductors from IndexedDB when the component is mounted
      onMounted(() => {
        fetchVehiclesFromDB();
        fetchConductorsFromDB();
        fetchMovementsFromDB();
      });
  
      return {
        selectedVehicle,
        selectedConductor,
        newMovementTime,
        vehicles,
        conductors,
        movements,
        createMovement,
        getVehicleById,
        getConductorById,
      };
    },
  });
  </script>
  
  <style scoped>
  .container {
    text-align: center;
    margin: 2em;
  }
  
  .input-section {
    display: flex;
    justify-content: center;
    margin: 1em 0;
  }
  
  .add-button {
    padding: 0.5em 1em;
    font-size: 1.1em;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .add-button:hover {
    background-color: #45a049;
  }
  
  .movements-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }
  
  .movements-table th,
  .movements-table td {
    border: 1px solid #ddd;
    padding: 0.8em;
    text-align: left;
  }
  
  .movements-table th {
    background-color: #f2f2f2;
  }
  
  .vehicle-select,
  .conductor-select,
  .time-input {
    padding: 0.5em;
    font-size: 1.1em;
    width: 100%;
    margin-right: 1em;
  }
  
  .action-button {
    padding: 0.3em 0.6em;
    margin-right: 0.3em;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
  }
  
  .action-button:last-child {
    margin-right: 0;
  }
  
  .action-button:hover {
    background-color: #45a049;
  }
  </style>
  