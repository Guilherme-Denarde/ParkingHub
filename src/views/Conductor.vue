<template>
  <div class="container">
    <h1>Conductors</h1>
    <div class="input-section">
      <input class="full-name-input" v-model="newConductorFullName" placeholder="Full Name" />
      <input class="phone-number-input" v-model="newConductorPhoneNumber" placeholder="Phone Number" />
      <input class="cpf-input" v-model="newConductorCPF" placeholder="CPF" />
      <input class="gmail-input" v-model="newConductorGmail" placeholder="Gmail" />
      <button @click="createConductor" class="add-button">Add Conductor</button>
    </div>
    <table class="conductors-table">
      <thead>
        <tr>
          <th>Full Name</th>
          <th>Phone Number</th>
          <th>CPF</th>
          <th>Gmail</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="conductor in conductors" :key="conductor.id">
          <td>{{ conductor.fullName }}</td>
          <td>{{ conductor.phoneNumber }}</td>
          <td>{{ conductor.cpf }}</td>
          <td>{{ conductor.gmail }}</td>
          <td>
            <button @click="updateConductorInDB(conductor.id)" class="action-button">Update</button>
            <button @click="deleteConductorFromDB(conductor.id)" class="action-button">Delete</button>
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
    const newConductorFullName = ref<string>('');
    const newConductorPhoneNumber = ref<string>('');
    const newConductorCPF = ref<string>('');
    const newConductorGmail = ref<string>('');
    const conductors = ref<any[]>([]);
    let db: any;

    const dbRequest = window.indexedDB.open('movementDatabase', 1);

    dbRequest.onupgradeneeded = function (event: any) {
      db = event.target.result;
      if (db) {
        const objectStore = db.createObjectStore('conductors', { keyPath: 'id', autoIncrement: true });
        objectStore.createIndex('fullName', 'fullName', { unique: false });
        objectStore.createIndex('phoneNumber', 'phoneNumber', { unique: false });
        objectStore.createIndex('cpf', 'cpf', { unique: false });
        objectStore.createIndex('gmail', 'gmail', { unique: false });
        objectStore.createIndex('register', 'register', { unique: false });
        objectStore.createIndex('update', 'update', { unique: false });
        objectStore.createIndex('active', 'active', { unique: false });
      }
    };

    dbRequest.onsuccess = function (event: any) {
      db = event.target.result;
      fetchConductorsFromDB();
    };

    const addConductorToDB = (
      fullName: string,
      phoneNumber: string,
      cpf: string,
      gmail: string
    ): void => {
      if (!db) return;
      const transaction = db.transaction(['conductors'], 'readwrite');
      const objectStore = transaction.objectStore('conductors');
      const register = new Date().toLocaleTimeString();
      const conductor = {
        fullName,
        phoneNumber,
        cpf,
        gmail,
        register,
        update: null,
        active: true,
      };
      objectStore.add(conductor);
      fetchConductorsFromDB();
    };

    const updateConductorInDB = (id: number): void => {
      if (!db) return;
      const transaction = db.transaction(['conductors'], 'readwrite');
      const objectStore = transaction.objectStore('conductors');
      const getRequest = objectStore.get(id);

      getRequest.onsuccess = function () {
        const data = getRequest.result;
        const updatedFullName = prompt('Enter the updated full name:', data.fullName);
        const updatedPhoneNumber = prompt('Enter the updated phone number:', data.phoneNumber);
        const updatedCPF = prompt('Enter the updated CPF:', data.cpf);
        const updatedGmail = prompt('Enter the updated Gmail:', data.gmail);

        if (updatedFullName && updatedPhoneNumber && updatedCPF && updatedGmail) {
          data.fullName = updatedFullName;
          data.phoneNumber = updatedPhoneNumber;
          data.cpf = updatedCPF;
          data.gmail = updatedGmail;
          data.update = new Date();
          objectStore.put(data);
          fetchConductorsFromDB();
        }
      };
    };

    const deleteConductorFromDB = (id: number): void => {
      if (!db) return;
      const transaction = db.transaction(['conductors'], 'readwrite');
      const objectStore = transaction.objectStore('conductors');
      objectStore.delete(id);
      fetchConductorsFromDB();
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

    const createConductor = (): void => {
      if (
        newConductorFullName.value.trim() === '' ||
        newConductorPhoneNumber.value.trim() === '' ||
        newConductorCPF.value.trim() === '' ||
        newConductorGmail.value.trim() === ''
      ) {
        return;
      }
      addConductorToDB(
        newConductorFullName.value,
        newConductorPhoneNumber.value,
        newConductorCPF.value,
        newConductorGmail.value
      );
      newConductorFullName.value = '';
      newConductorPhoneNumber.value = '';
      newConductorCPF.value = '';
      newConductorGmail.value = '';
    };

    onMounted(fetchConductorsFromDB);

    return {
      newConductorFullName,
      newConductorPhoneNumber,
      newConductorCPF,
      newConductorGmail,
      conductors,
      createConductor,
      updateConductorInDB,
      deleteConductorFromDB,
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

.conductors-table {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.conductors-table th,
.conductors-table td {
  border: 1px solid #ddd;
  padding: 0.8em;
  text-align: left;
}

.conductors-table th {
  background-color: #f2f2f2;
}

.full-name-input,
.phone-number-input,
.cpf-input,
.gmail-input {
  padding: 0.5em;
  font-size: 1.1em;
  width: 25%;
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
