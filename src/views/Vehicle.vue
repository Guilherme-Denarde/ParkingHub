<template>
  <div class="container">
    <h1>Vehicles</h1>
    <div  class="input-section">
      <select v-model="newVehicleBrandId" class="brand-input">
        <option v-for="brand in brands" :key="brand.id" :value="brand.id">
          {{ brand.name }}
        </option>
      </select>
      <select v-model="newVehicleModelId" class="brand-input">
        <option   v-for="model in models" :key="model.id" :value="model.id">
          {{ model.name }}
        </option>
      </select>
      <!-- <input v-model="newVehicleBrand" placeholder="Brand" class="brand-input" />
      <input v-model="newVehicleModel" placeholder="Model" class="model-input" /> -->
      <select v-model="newVehicleColor" class="color-select">
        <option value="Red">Red</option>
        <option value="Blue">Blue</option>
        <option value="Green">Green</option>
        <option value="Yellow">Yellow</option>
        <option value="Black">Black</option>
        <option value="White">White</option>
      </select>
      <input v-model="newVehiclePlate" placeholder="Plate" class="plate-input" />
      <button @click="createVehicle" class="add-button">Add Vehicle</button>
    </div>
    <table class="vehicles-table">
      <thead>
        <tr>
          <th>Brand</th>
          <th>Model</th>
          <th>Color</th>
          <th>Plate</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(vehicle, index) in vehicles" :key="index">
          <td>{{ getBrandNameById(vehicle.brand) }}</td>
          <td>{{ getModelNameById(vehicle.model) }}</td>
          <td>{{ vehicle.color }}</td>
          <td>{{ vehicle.plate }}</td>
          <td>
            <button @click="updateVehicleInDB(vehicle)" class="add">Editar</button>
            <button @click="deleteVehicleFromDB(vehicle.id)">Excluir</button>
          </td>
        </tr>

      </tbody>
    </table>
  </div>
</template>

<script lang="ts">

import { defineComponent, ref, onMounted } from 'vue';

type Brand = {
  id: number;
  name: string;
};

type Model = {
  id: number;
  name: string;
};

export default defineComponent({
  setup() {
    const newVehicleBrandId = ref(null);
    const newVehicleModelId = ref(null);
    const brands = ref<Brand[]>([]);
    const models = ref<Model[]>([]);
    const newVehicleBrand = ref('');
    const newVehicleModel = ref('');
    const newVehicleColor = ref('Red');
    const newVehiclePlate = ref('');
    const vehicles = ref<any[]>([]);
    let db: any;

    const dbRequest = window.indexedDB.open('movementDatabase', 1);

    dbRequest.onupgradeneeded = function (event: any) {
      db = event.target.result;
      if (db) {
        if (!db.objectStoreNames.contains('vehicles')) {
          const vehicleStore = db.createObjectStore('vehicles', { keyPath: 'id', autoIncrement: true });
          vehicleStore.createIndex('brand', 'brand', { unique: false });
          vehicleStore.createIndex('model', 'model', { unique: false });
          vehicleStore.createIndex('color', 'color', { unique: false });
          vehicleStore.createIndex('plate', 'plate', { unique: false });
          vehicleStore.createIndex('register', 'register', { unique: false });
          vehicleStore.createIndex('update', 'update', { unique: false });
          vehicleStore.createIndex('active', 'active', { unique: false });
        }
      }
    };

    dbRequest.onsuccess = function (event: any) {
      db = event.target.result;
      fetchVehiclesFromDB();
    };


    const fetchBrandsFromDB = (): void => {
      if (!db) return;
      const transaction = db.transaction(['brands'], 'readonly');
      const objectStore = transaction.objectStore('brands');
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function (event: any) {
        brands.value = event.target.result;
      };
    };

    const fetchModelsFromDB = (): void => {
      if (!db) return;
      const transaction = db.transaction(['models'], 'readonly');
      const objectStore = transaction.objectStore('models');
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function (event: any) {
        models.value = event.target.result;
      };
    };

    const addVehicleToDB = (brand: string, model: string, color: string, plate: string): void => {
      if (!db) return;
      const transaction = db.transaction(['vehicles'], 'readwrite');
      const objectStore = transaction.objectStore('vehicles');
      const register = new Date().toLocaleTimeString();
      const vehicle = {
        brand,
        model,
        color,
        plate,
        register,
        update: null,
        active: true,
      };
      objectStore.add(vehicle);
      fetchVehiclesFromDB();
    };

    const updateVehicleInDB = (id: number): void => {
      if (!db) return;
      const transaction = db.transaction(['vehicles'], 'readwrite');
      const objectStore = transaction.objectStore('vehicles');
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = function () {
        const data = getRequest.result;

        const updatedBrand = prompt('Enter the updated Brand:', data.brand);
        const updatedModel = prompt('Enter the updated Model:', data.model);
        const updatedColor = prompt('Enter the updated Color:', data.color);
        const updatedPlate = prompt('Enter the updated Plate:', data.plate);

        if (updatedBrand && updatedModel && updatedColor && updatedPlate) {
          data.brand = updatedBrand;
          data.model = updatedModel;
          data.color = updatedColor;
          data.plate = updatedPlate;
          data.update = new Date();
          objectStore.put(data);
          fetchVehiclesFromDB();
        }
      };
    };

    const deleteVehicleFromDB = (id: number): void => {
      if (!db) return;
      const transaction = db.transaction(['vehicles'], 'readwrite');
      const objectStore = transaction.objectStore('vehicles');
      objectStore.delete(id);
      fetchVehiclesFromDB();
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

    const getBrandNameById = (brandId: number) => {
      const brand = brands.value.find(b => b.id === brandId);
      return brand ? brand.name : '';
    };

    const getModelNameById = (modelId: number) => {
      const model = models.value.find(m => m.id === modelId);
      return model ? model.name : '';
    };

    const createVehicle = (): void => {
      if (newVehicleBrandId.value === null || newVehicleModelId.value === null || newVehiclePlate.value.trim() === '')
        return;
      addVehicleToDB(
        newVehicleBrandId.value,
        newVehicleModelId.value,
        newVehicleColor.value,
        newVehiclePlate.value
      );
    };

    // Fetch vehicles from IndexedDB when the component is mounted
    // onMounted(fetchVehiclesFromDB);
    dbRequest.onsuccess = function (event: any) {
      db = event.target.result;
      fetchVehiclesFromDB();
      fetchBrandsFromDB();
      fetchModelsFromDB();
    };

    return {
      newVehicleBrandId,
      newVehicleModelId,
      brands,
      models,
      newVehicleColor,
      newVehiclePlate,
      vehicles,
      createVehicle,
      updateVehicleInDB,
      deleteVehicleFromDB,
      getBrandNameById,
      getModelNameById
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

.vehicles-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.vehicles-table th,
.vehicles-table td {
  border: 1px solid #ddd;
  padding: 0.8em;
  text-align: left;
}

.vehicles-table th {
  background-color: #f2f2f2;
}

.brand-input,
.model-input,
.plate-input {
  padding: 0.5em;
  font-size: 1.1em;
  width: 100%;
  margin-right: 1em;
}

.color-select {
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
