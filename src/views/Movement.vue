<template>
  <div class="container">
    <h1>Movements</h1>
    <div class="input-section">
      <select v-model="newMovementPlate" class="plate-input">
        <option disabled value="">Select a plate</option>
        <option v-for="vehicle in vehicles" :key="vehicle.id" :value="vehicle.plate">
          {{ vehicle.plate }}
        </option>
      </select>
      <input v-model="newMovementConductorCPF" placeholder="Conductor CPF" class="cpf-input" />
      <button @click="createMovement" class="add-button">Add Movement</button>
    </div>
    <table class="movements-table">
      <thead>
        <tr>
          <th>Vehicle</th>
          <th>Conductor</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movement in movements" :key="movement.id">
          <td>{{ movement.vehiclePlate }}</td>
          <td>{{ movement.conductorCPF }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

interface Vehicle {
  id: number;
  plate: string;
}

interface Movement {
  id: number;
  vehiclePlate: string;
  conductorCPF: string;
}

export default defineComponent({
  setup() {
    const newMovementPlate = ref("");
    const newMovementConductorCPF = ref("");
    const vehicles = ref<Vehicle[]>([]);
    const movements = ref<Movement[]>([]);
    let db: IDBDatabase;

    const dbRequest = window.indexedDB.open("movementDatabase", 1);

    onMounted(() => {
      dbRequest.onupgradeneeded = (event: IDBVersionChangeEvent) => {
        db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        const vehicleStore = db.createObjectStore("vehicles", { keyPath: "id", autoIncrement: true });
        vehicleStore.createIndex("plate", "plate", { unique: true });

        const conductorStore = db.createObjectStore("conductors", { keyPath: "id", autoIncrement: true });
        conductorStore.createIndex("cpf", "cpf", { unique: true });

        db.createObjectStore("movements", { keyPath: "id", autoIncrement: true });
      };

      dbRequest.onsuccess = (event: Event) => {
        db = (event.target as IDBOpenDBRequest).result as IDBDatabase;
        fetchVehicles();
        fetchMovements();
      };
    });

    const fetchVehicles = () => {
      const transaction = db.transaction("vehicles", "readonly");
      const objectStore = transaction.objectStore("vehicles");
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = (event: Event) => {
        vehicles.value = (event.target as IDBRequest).result as Vehicle[];
      };
    };

    const fetchMovements = () => {
      const transaction = db.transaction("movements", "readonly");
      const objectStore = transaction.objectStore("movements");
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = (event: Event) => {
        movements.value = (event.target as IDBRequest).result as Movement[];
      };
    };

    const createMovement = () => {
      const transaction = db.transaction("movements", "readwrite");
      const objectStore = transaction.objectStore("movements");
      const newMovement: Movement = {
        id: Date.now(),
        vehiclePlate: newMovementPlate.value,
        conductorCPF: newMovementConductorCPF.value
      };
      objectStore.add(newMovement);

      newMovementPlate.value = "";
      newMovementConductorCPF.value = "";
      fetchMovements();
    };

    return {
      newMovementPlate,
      newMovementConductorCPF,
      vehicles,
      movements,
      createMovement
    };
  }
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

.plate-input,
.cpf-input {
  padding: 0.5em;
  font-size: 1.1em;
  width: 50%;
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