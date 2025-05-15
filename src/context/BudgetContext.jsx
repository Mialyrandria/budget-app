import { createContext, useContext, useState, useEffect } from 'react';
const db = require('../database/db');

export const BudgetContext = createContext();

export function BudgetProvider({ children }) {
  const [expenses, setExpenses] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState({});

  useEffect(() => {
    // Chargement initial des données
    loadData();
  }, []);

  const loadData = async () => {
    // Charger les revenus
    const loadedIncomes = db.getAllIncomes();
    setIncomes(loadedIncomes);

    // Charger les dépenses
    const loadedExpenses = db.getAllExpenses();
    setExpenses(loadedExpenses);

    // Charger les catégories
    const loadedCategories = db.getAllCategories();
    const categoriesObj = {};
    loadedCategories.forEach(cat => {
      categoriesObj[cat.name] = cat.limit_percentage;
    });
    setCategories(categoriesObj);
  };

  const addIncome = (income) => {
    db.addIncome(income);
    setIncomes(prev => [...prev, income]);
  };

  const updateIncome = (id, updatedIncome) => {
    db.updateIncome(id, updatedIncome);
    setIncomes(prev => prev.map((income, idx) => 
      idx === id ? updatedIncome : income
    ));
  };

  const deleteIncome = (id) => {
    db.deleteIncome(id);
    setIncomes(prev => prev.filter((_, idx) => idx !== id));
  };

  const addExpense = (expense) => {
    db.addExpense(expense);
    setExpenses(prev => [...prev, expense]);
  };

  const updateExpense = (id, updatedExpense) => {
    db.updateExpense(id, updatedExpense);
    setExpenses(prev => prev.map((expense, idx) => 
      idx === id ? updatedExpense : expense
    ));
  };

  const deleteExpense = (id) => {
    db.deleteExpense(id);
    setExpenses(prev => prev.filter((_, idx) => idx !== id));
  };

  const updateCategories = (newCategories) => {
    Object.entries(newCategories).forEach(([name, limit]) => {
      db.updateCategoryLimit(name, limit);
    });
    setCategories(newCategories);
  };

  return (
    <BudgetContext.Provider value={{
      expenses,
      setExpenses,
      incomes,
      setIncomes,
      categories,
      setCategories,
      addIncome,
      updateIncome,
      deleteIncome,
      addExpense,
      updateExpense,
      deleteExpense,
      updateCategories
    }}>
      {children}
    </BudgetContext.Provider>
  );
}

export const useBudget = () => useContext(BudgetContext);