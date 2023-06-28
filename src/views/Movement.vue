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
          <th>Register</th>
          <th>Active</th>
          <th>Departure</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="movement in movements" :key="movement.id" :class="{ 'gray-row': movement.departure !== '' }">
          <td>{{ movement.vehiclePlate }}</td>
          <td>{{ movement.conductorCPF }}</td>
          <td>{{ movement.register }}</td>
          <td>{{ movement.active }}</td>
          <td>{{ movement.departure }}</td>
          <td>
              <button @click="openReportPopup(); updateDeparture(movement) " :disabled="movement.departure !== ''" class="departure-button">Departure</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="showReportPopup" class="report-popup">
      <div class="report-content">
        <h2>Report</h2>
        <Report :reportText="currentMovementReport" />
        <!-- <p>{{ currentMovementReport }}</p> -->
        <button @click="closeReportPopup" class="close-button">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import Report from '@/components/Report.vue';

interface Vehicle {
  id: number;
  plate: string;
}

interface Movement {
  id: number;
  vehiclePlate: string;
  conductorCPF: string;
  register: string;
  active: boolean;
  departure: string;
  report: string; // Add report property to the Movement interface
}

export default defineComponent({
  setup() {
    const newMovementPlate = ref("");
    const newMovementConductorCPF = ref("");
    const vehicles = ref<Vehicle[]>([]);
    const movements = ref<Movement[]>([]);
    const showReportPopup = ref(false);
    const currentMovementReport = ref("");
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
      const transaction = db.transaction(["movements", "conductors"], "readwrite");
      const movementStore = transaction.objectStore("movements");
      const conductorStore = transaction.objectStore("conductors");

      // Check if conductor CPF exists in the database
      const conductorCPF = newMovementConductorCPF.value;
      const getRequest = conductorStore.index("cpf").get(conductorCPF);

      getRequest.onsuccess = (event: Event) => {
        const conductor = (event.target as IDBRequest).result;
        if (conductor) {
          const newMovement: Movement = {
            id: Date.now(),
            vehiclePlate: newMovementPlate.value,
            conductorCPF,
            register: new Date().toLocaleString(),
            active: true,
            departure: "",
            report: generateReportText(newMovementPlate.value, conductorCPF) // Generate the report text
          };
          movementStore.add(newMovement);

          newMovementPlate.value = "";
          newMovementConductorCPF.value = "";
          fetchMovements();
        } else {
          // Handle case when conductor is not found
          alert("Conductor not found in the database");
        }
      };
    };

    const updateDeparture = (movement: Movement) => {
      if (movement.active) {
    const transaction = db.transaction("movements", "readwrite");
    const objectStore = transaction.objectStore("movements");
    const updatedMovement = { ...movement };
    updatedMovement.departure = new Date().toLocaleString();
    updatedMovement.active = false; 
    objectStore.put(updatedMovement);

      fetchMovements();
      
      showReportPopup.value = true;
      currentMovementReport.value = updatedMovement.report;
      }
    };

    const generateReportText = (vehiclePlate: string, conductorCPF: string) => {
      
      return `Report for movement:\n\nVehicle: ${vehiclePlate}\nConductor: ${conductorCPF}`;
    };

    const openReportPopup = () => {
      showReportPopup.value = true;
    };

    const closeReportPopup = () => {
      showReportPopup.value = false;
    };

    return {
      newMovementPlate,
      newMovementConductorCPF,
      vehicles,
      movements,
      showReportPopup,
      currentMovementReport,
      createMovement,
      updateDeparture,
      openReportPopup,
      closeReportPopup
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

.departure-button {
  padding: 0.3em 0.6em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.departure-button button[disabled] {
  background-color: gray;
  cursor: not-allowed;
}

.gray-row {
  background-color: #f2f2f2;
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

.report-popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.report-content {
  background-color: white;
  padding: 2em;
  border-radius: 8px;
  text-align: center;
}

.close-button {
  padding: 0.3em 0.6em;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 1em;
}

.close-button:hover {
  background-color: #45a049;
}
</style>
