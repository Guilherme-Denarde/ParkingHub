// // dbHandler.ts

// let db: IDBDatabase | null = null;

// export const initializeDatabase = (): Promise<IDBDatabase> => {
//     return new Promise((resolve, reject) => {
//         const dbRequest = window.indexedDB.open('movementDatabase', 1);

//         dbRequest.onupgradeneeded = function (event) {
//             db = event.target.result;
//             if (db) {
//                 if (!db.objectStoreNames.contains('vehicles')) {
//                     const vehicleStore = db.createObjectStore('vehicles', { keyPath: 'id', autoIncrement: true });
//                     vehicleStore.createIndex('plate', 'plate', { unique: true });
//                 }
//                 if (!db.objectStoreNames.contains('conductors')) {
//                     const conductorStore = db.createObjectStore('conductors', { keyPath: 'id', autoIncrement: true });
//                     conductorStore.createIndex('cpf', 'cpf', { unique: true });
//                 }
//                 if (!db.objectStoreNames.contains('movements')) {
//                     const movementStore = db.createObjectStore('movements', { keyPath: 'id', autoIncrement: true });
//                     movementStore.createIndex('vehiclePlate', 'vehiclePlate', { unique: false });
//                     movementStore.createIndex('conductorCPF', 'conductorCPF', { unique: false });
//                     movementStore.createIndex('register', 'register', { unique: false });
//                     movementStore.createIndex('active', 'active', { unique: false });
//                 }
//                 if (!db.objectStoreNames.contains('brands')) {
//                     const brandStore = db.createObjectStore('brands', { keyPath: 'id', autoIncrement: true });
//                     brandStore.createIndex('name', 'name', { unique: true });
//                 }
//             }
//         };

//         dbRequest.onsuccess = function (event: any) {
//             db = event.target.result;
//             resolve(db);
//         };

//         dbRequest.onerror = function (event: any) {
//             reject(new Error('Error opening database.'));
//         };
//     });
// };

// export const getDatabase = (): IDBDatabase | null => {
//     return db;
// };
