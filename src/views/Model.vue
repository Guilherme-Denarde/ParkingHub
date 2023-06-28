<template>
  <div class="container">
    <h1>Models</h1>
    <div class="input-section">
      <input class="brand-input" v-model="newBrandName" placeholder="Brand Name" />
      <input class="model-input" v-model="newModelName" placeholder="Model Name" />
      <button @click="createModel" class="add-button">Add Model</button>
    </div>
    <table class="models-table">
      <thead>
        <tr>
          <th>Brand Name</th>
          <th>Model Name</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="model in models" :key="model.id">
          <td>{{ model.brand ? model.brand.name : 'Marca não definida'}}</td>
          <td>{{ model.name }}</td>
          <td>
            <button @click="updateModelInDB(model.id)" class="action-button">Update</button>
            <button @click="deleteModelFromDB(model.id)" class="action-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';

export default defineComponent({
  setup() {
    const newBrandName = ref<string>('');
    const newModelName = ref<string>('');
    const models = ref<any[]>([]);
    let db: any;

    const dbRequest = window.indexedDB.open('movementDatabase', 1);

    dbRequest.onupgradeneeded = function (event: any) {
      db = event.target.result;
      if (db) {
        const objectStore = db.createObjectStore('models', { keyPath: 'id', autoIncrement: true });
        // objectStore.createIndex('brand', 'brand', { unique: false });
        objectStore.createIndex('name', 'name', { unique: false });
        objectStore.createIndex('register', 'register', { unique: false });
        objectStore.createIndex('update', 'update', { unique: false });
        objectStore.createIndex('active', 'active', { unique: false });
      }
    };

    dbRequest.onsuccess = function (event: any) {
      db = event.target.result;
      fetchModelsFromDB();
    };

    const addModelToDB = (brand: any, name: string): void => {
      if (!db) return;
      const transaction = db.transaction(['models'], 'readwrite'); // Update the object store name to 'brands'
      const objectStore = transaction.objectStore('models'); // Update the object store name to 'brands'
      const register = new Date().toLocaleTimeString();
      const model = {
        brand: brand,
        name: name,
        register: register,
        update: null,
        active: true,
      };
      objectStore.add(model);
      fetchModelsFromDB();
    };

    const updateModelInDB = (id: number): void => {
      if (!db) return;
      const transaction = db.transaction(['models'], 'readwrite'); // Update the object store name to 'brands'
      const objectStore = transaction.objectStore('models'); // Update the object store name to 'brands'
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = function () {
        const data = getRequest.result;
        const updatedBrandName = prompt('Enter the updated brand name:', data.brand);
        const updatedModelName = prompt('Enter the updated model name:', data.name);
        if (updatedBrandName && updatedModelName) {
          data.brand = updatedBrandName;
          data.name = updatedModelName;
          data.update = new Date();
          objectStore.put(data);
          fetchModelsFromDB();
        }
      };
    };

    const deleteModelFromDB = (id: number): void => {
      if (!db) return;
      const transaction = db.transaction(['models'], 'readwrite'); // Update the object store name to 'brands'
      const objectStore = transaction.objectStore('models'); // Update the object store name to 'brands'
      objectStore.delete(id);
      fetchModelsFromDB();
    };

    const fetchModelsFromDB = (): void => {
      if (!db) return;
      const transaction = db.transaction(['models'], 'readonly'); // Update the object store name to 'brands'
      const objectStore = transaction.objectStore('models'); // Update the object store name to 'brands'
      const getRequest = objectStore.getAll();

      getRequest.onsuccess = function (event: any) {
        models.value = event.target.result;
      };
    };

    const createModel = (): void => {
      if (newBrandName.value.trim() === '' || newModelName.value.trim() === '') return;

      // Vamos buscar a marca pelo nome antes de criar o modelo
      const brandTransaction = db.transaction(['brands'], 'readonly');
      const brandObjectStore = brandTransaction.objectStore('brands');
      const brandIndex = brandObjectStore.index('name');
      const brandRequest = brandIndex.get(newBrandName.value);

      brandRequest.onsuccess = function (event: any) {
        const brand = event.target.result;
        if (brand) {
          // Se encontrarmos a marca, podemos criar o modelo com ela
          addModelToDB(brand, newModelName.value);
          newBrandName.value = '';
          newModelName.value = '';
        } else {
          alert('Marca não encontrada. Por favor, insira um nome de marca válido.');
        }
      };
    };

    onMounted(fetchModelsFromDB);

    return {
      newBrandName,
      newModelName,
      models,
      createModel,
      updateModelInDB,
      deleteModelFromDB,
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

.models-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.models-table th,
.models-table td {
  border: 1px solid #ddd;
  padding: 0.8em;
  text-align: left;
}

.models-table th {
  background-color: #f2f2f2;
}

.brand-input,
.model-input {
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
