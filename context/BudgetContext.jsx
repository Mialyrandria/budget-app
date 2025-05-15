import { createContext, useContext, useState, useEffect } from 'react';
import localforage from "localforage";

const DEFAULT_CATEGORY_LIMITS = {
  Courses: 20,
  Transport: 15,
  Logement: 30,
  Divertissement: 10,
  Autre: 25
};

const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [incomes, setIncomes] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [categories, setCategories] = useState(DEFAULT_CATEGORY_LIMITS);

  // 🔄 Charger les données sauvegardées au démarrage
  useEffect(() => {
    const loadData = async () => {
      try {
        const [savedIncomes, savedExpenses, savedCategories] = await Promise.all([
          localforage.getItem("incomes"),
          localforage.getItem("expenses"),
          localforage.getItem("categories")
        ]);

        if (savedIncomes) setIncomes(savedIncomes);
        if (savedExpenses) setExpenses(savedExpenses);
        if (savedCategories) setCategories(savedCategories);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      }
    };

    loadData();
  }, []);

  // 💾 Sauvegarder automatiquement les données
  useEffect(() => {
    const saveData = async () => {
      try {
        await Promise.all([
          localforage.setItem("incomes", incomes),
          localforage.setItem("expenses", expenses),
          localforage.setItem("categories", categories)
        ]);
      } catch (error) {
        console.error('Erreur lors de la sauvegarde:', error);
      }
    };

    saveData();
  }, [incomes, expenses, categories]);

  return (
    <BudgetContext.Provider value={{
      incomes, setIncomes,
      expenses, setExpenses,
      categories, setCategories
    }}>
      {children}
    </BudgetContext.Provider>
  );
}

export function useBudget() {
  return useContext(BudgetContext);
}
