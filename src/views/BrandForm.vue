<template>
    <div class="container">
      <h1>Brands</h1>
      <div class="input-section">
        <input v-model="newBrandName" placeholder="Brand Name" @keyup.enter="createBrand" />
        <button @click="createBrand" class="add-button">Add Brand</button>
      </div>
      <table class="brands-table">
        <thead>
          <tr>
            <th>Brand Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="brand in brands" :key="brand.id">
            <td>{{ brand.name }}</td>
            <td>
                <button @click="updateBrandInDB(brand.id, 'newName')" class="action-button">Update</button>
                <button @click="deleteBrandFromDB(brand.id)" class="action-button">Delete</button>
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
      const brands = ref<any[]>([]);
      let db: any;
  
      const dbRequest = window.indexedDB.open("brandDatabase", 1);
  
      dbRequest.onupgradeneeded = function (event: any) {
        db = event.target.result;
        if (db) {
          db.createObjectStore("brands", { keyPath: "id", autoIncrement: true });
        }
      };
  
      dbRequest.onsuccess = function (event: any) {
        db = event.target.result;
        fetchBrandsFromDB();
      };
  
      const addBrandToDB = (name: string): void => {
        if (!db) return;
        const transaction = db.transaction(["brands"], "readwrite");
        const objectStore = transaction.objectStore("brands");
        objectStore.add({ name: name });
        fetchBrandsFromDB();
      };
  
      const updateBrandInDB = (id: number, newName: string): void => {
        if (!db) return;
        const transaction = db.transaction(["brands"], "readwrite");
        const objectStore = transaction.objectStore("brands");
        const getRequest = objectStore.get(id);
  
        getRequest.onsuccess = function () {
          const data = getRequest.result;
          data.name = newName;
          objectStore.put(data);
          fetchBrandsFromDB();
        }
      };
  
      const deleteBrandFromDB = (id: number): void => {
        if (!db) return;
        const transaction = db.transaction(["brands"], "readwrite");
        const objectStore = transaction.objectStore("brands");
        objectStore.delete(id);
        fetchBrandsFromDB();
      };
  
      const fetchBrandsFromDB = (): void => {
        if (!db) return;
        const transaction = db.transaction(["brands"], "readonly");
        const objectStore = transaction.objectStore("brands");
        const getRequest = objectStore.getAll();
  
        getRequest.onsuccess = function (event: any) {
          brands.value = event.target.result;
        };
      };
  
      const createBrand = (): void => {
        if (newBrandName.value.trim() === '') return;
        addBrandToDB(newBrandName.value);
        newBrandName.value = '';
      };
  
      // Fetch brands from IndexedDB when the component is mounted
      onMounted(fetchBrandsFromDB);
  
      return { newBrandName, brands, createBrand, updateBrandInDB, deleteBrandFromDB };
    },
  });
  </script>
  
  
  <style scoped>
  .container {
    text-align: center;
    margin: 2em;
  }
  
  .input-section {
    margin: 1em 0;
  }
  
  .add-button {
    margin-left: 1em;
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
  
  .brands-table {
    width: 100%;
    border-collapse: collapse;
    margin: 1em 0;
  }
  
  .brands-table th,
  .brands-table td {
    border: 1px solid #ddd;
    padding: 0.8em;
    text-align: left;
  }
  
  .brands-table th {
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
  </style>
  