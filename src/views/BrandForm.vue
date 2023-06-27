<template>
  <div class="container">
    <h1>Brands</h1>
    <div class="input-section">
      <input class="brand-input" v-model="newBrandName" placeholder="Brand Name" @keyup.enter="createBrand" />
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
            <button @click="openUpdatePopup(brand)" class="action-button">Update</button>
            <button @click="deleteBrandFromDB(brand.id)" class="action-button">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="popup" :class="{ 'show': showPopup }">
      <div class="popup-content">
        <h2>Update Brand</h2>
        <input class="brand-input" v-model="updatedBrandName" placeholder="New Brand Name" />
        <div class="popup-buttons">
          <button @click="updateBrand" class="update-button">Update</button>
          <button @click="cancelUpdate" class="cancel-button">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Brand } from '@/model/Brand';
import { defineComponent, ref, onMounted } from 'vue';
export default defineComponent({
  setup() {
    const newBrandName = ref<string>('');
    const updatedBrandName = ref<string>('');
    const brands = ref<any[]>([]);
    let db: any;
    let brandToUpdate: any;
    let showPopup = ref<boolean>(false);

    const dbRequest = window.indexedDB.open('brandDatabase', 1);

    dbRequest.onupgradeneeded = function (event: any) {
      db = event.target.result;
      if (db) {
        db.createObjectStore('brands', { keyPath: 'id', autoIncrement: true });
      }
    };

    dbRequest.onsuccess = function (event: any) {
      db = event.target.result;
      fetchBrandsFromDB();
    };

    const addBrandToDB = (name: string): void => {
      if (!db) return;
      const transaction = db.transaction(['brands'], 'readwrite');
      const objectStore = transaction.objectStore('brands');
      objectStore.add({ name: name });
      fetchBrandsFromDB();
    };
//     const addBrandToDB = (name: string): void => {
//   if (!db) return;

//   const transaction = db.transaction(['brands'], 'readwrite');
//   const objectStore = transaction.objectStore('brands');

//   try {
//     const brand = new Brand(name);
//     brand.name = name;

//     const request = objectStore.add(brand);
//     request.onerror = (event: Event) => {
//       console.error('Error adding brand to IndexedDB:', (event.target as any).error);
//     };
//     request.onsuccess = () => {
//       console.log('Brand added to IndexedDB successfully');
//       fetchBrandsFromDB();
//     };
//   } catch (error) {
//     console.error('Error creating brand:', error);
//   }
// };



    const updateBrandInDB = (id: number, newName: string): void => {
      if (!db) return;
      const transaction = db.transaction(['brands'], 'readwrite');
      const objectStore = transaction.objectStore('brands');
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = function () {
        const data = getRequest.result;
        data.name = newName;
        objectStore.put(data);
        fetchBrandsFromDB();
      };
    };

    const deleteBrandFromDB = (id: number): void => {
      if (!db) return;
      const transaction = db.transaction(['brands'], 'readwrite');
      const objectStore = transaction.objectStore('brands');
      objectStore.delete(id);
      fetchBrandsFromDB();
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

    const createBrand = (): void => {
      if (newBrandName.value.trim() === '') return;
      // console.log('Brand Name:', newBrandName.value);
      addBrandToDB(newBrandName.value);
      newBrandName.value = '';
    };

    const openUpdatePopup = (brand: any): void => {
      brandToUpdate = brand;
      updatedBrandName.value = brand.name;
      showPopup.value = true;
    };

    const updateBrand = (): void => {
      if (brandToUpdate && updatedBrandName.value.trim() !== '') {
        updateBrandInDB(brandToUpdate.id, updatedBrandName.value);
        closePopup();
      }
    };

    const cancelUpdate = (): void => {
      brandToUpdate = null;
      updatedBrandName.value = '';
      closePopup();
    };

    const closePopup = (): void => {
      showPopup.value = false;
    };

    // Fetch brands from IndexedDB when the component is mounted
    onMounted(fetchBrandsFromDB);
    
    return {
      newBrandName,
      updatedBrandName,
      brands,
      createBrand,
      openUpdatePopup,
      updateBrand,
      cancelUpdate,
      deleteBrandFromDB,
      showPopup,
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
  background-color: #4caf50;
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

.brand-input {
  padding: 0.5em;
  font-size: 1.1em;
  width: 50%;
  margin-right: 1em;
}

.action-button {
  padding: 0.3em 0.6em;
  margin-right: 0.3em;
  border: none;
  background-color: #4caf50;
  color: white;
  cursor: pointer;
}

.action-button:last-child {
  margin-right: 0;
}

.action-button:hover {
  background-color: #45a049;
}

.popup {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.3s ease;
}

.popup.show {
  opacity: 1;
  pointer-events: auto;
}

.popup-content {
  background-color: #fff;
  padding: 2em;
  border-radius: 4px;
  max-width: 400px;
}

.popup-buttons {
  display: flex;
  justify-content: flex-end;
  margin-top: 1em;
}

.update-button {
  padding: 0.3em 0.6em;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-button {
  padding: 0.3em 0.6em;
  background-color: #ccc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5em;
}

.update-button:hover,
.cancel-button:hover {
  opacity: 0.8;
}
</style>
