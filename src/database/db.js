import { openDB } from 'idb';

const initDB = async () => {
  const db = await openDB('budgetzen-db', 1, {
    upgrade(db) {
      // Création des tables
      if (!db.objectStoreNames.contains('incomes')) {
        db.createObjectStore('incomes', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('expenses')) {
        db.createObjectStore('expenses', { keyPath: 'id', autoIncrement: true });
      }
      if (!db.objectStoreNames.contains('categories')) {
        db.createObjectStore('categories', { keyPath: 'name' });
      }
    },
  });
  return db;
};

// Opérations de base de données
const dbOperations = {
  async getAllIncomes() {
    const db = await initDB();
    return db.getAll('incomes');
  },
  
  async addIncome(income) {
    const db = await initDB();
    return db.add('incomes', income);
  },
  
  // ... autres opérations similaires
};

export default dbOperations;