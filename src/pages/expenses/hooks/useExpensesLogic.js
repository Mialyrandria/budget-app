import { useState } from 'react';
import { useBudget } from '../../../../context/BudgetContext';

export function useExpensesLogic() {
  const { expenses, setExpenses, incomes, categories, setCategories } = useBudget();
  const [formData, setFormData] = useState({
    label: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingData, setEditingData] = useState({
    index: null,
    label: '',
    amount: '',
    category: '',
    date: ''
  });
  const [editingCategory, setEditingCategory] = useState({
    name: '',
    limit: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleEditInputChange = (field) => (e) => {
    setEditingData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (!formData.label || !formData.amount || !formData.category) return;

    const newExpense = {
      label: formData.label,
      amount: parseFloat(formData.amount),
      category: formData.category,
      date: formData.date
    };

    setExpenses(prev => [...prev, newExpense]);
    setFormData({ label: '', amount: '', category: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!editingCategory.name || !editingCategory.limit) return;

    setCategories(prev => ({
      ...prev,
      [editingCategory.name]: parseFloat(editingCategory.limit)
    }));
    setEditingCategory({ name: '', limit: '' });
  };

  const handleUpdateCategoryLimit = (category, newLimit) => {
    setCategories(prev => ({
      ...prev,
      [category]: parseFloat(newLimit)
    }));
  };

  const handleDeleteCategory = (category) => {
    setCategories(prev => {
      const newCategories = { ...prev };
      delete newCategories[category];
      return newCategories;
    });
  };

  const handleEdit = (index) => {
    const expense = expenses[index];
    setEditingData({
      index,
      label: expense.label,
      amount: expense.amount,
      category: expense.category,
      date: expense.date
    });
  };

  const handleUpdate = () => {
    if (editingData.index === null) return;

    const updated = [...expenses];
    updated[editingData.index] = {
      label: editingData.label,
      amount: parseFloat(editingData.amount),
      category: editingData.category,
      date: editingData.date
    };
    setExpenses(updated);
    setEditingData({ index: null, label: '', amount: '', category: '', date: '' });
  };

  const handleDelete = (index) => {
    setExpenses(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return expenses.reduce((sum, expense) => sum + expense.amount, 0);
  };

  const calculateCategoryTotals = () => {
    return expenses.reduce((acc, expense) => {
      if (!expense.category) return acc;
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    }, {});
  };

  const calculateCategoryPercentages = () => {
    const totalIncome = incomes.reduce((sum, income) => sum + income.amount, 0);
    const categoryTotals = calculateCategoryTotals();
    
    return Object.entries(categoryTotals).reduce((acc, [category, amount]) => {
      acc[category] = totalIncome > 0 ? (amount / totalIncome) * 100 : 0;
      return acc;
    }, {});
  };

  const getCategoryAlerts = () => {
    const percentages = calculateCategoryPercentages();
    return Object.entries(percentages)
      .filter(([category, percentage]) => {
        const limit = categories[category];
        return percentage > limit;
      })
      .map(([category, percentage]) => ({
        category,
        percentage,
        limit: categories[category]
      }));
  };

  return {
    formData,
    editingData,
    editingCategory,
    setEditingCategory,
    categories,
    setCategories,
    expenses,
    handleInputChange,
    handleEditInputChange,  // Ajouter cette ligne
    handleSubmit,
    handleAddCategory,
    handleUpdateCategoryLimit,
    handleDeleteCategory,
    handleEdit,
    handleUpdate,
    handleDelete,
    calculateTotal,
    calculateCategoryTotals,
    calculateCategoryPercentages,
    getCategoryAlerts
  };
}