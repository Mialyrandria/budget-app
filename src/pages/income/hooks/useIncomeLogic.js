import { useState } from 'react';
import { useBudget } from '../../../../context/BudgetContext';

export function useIncomeLogic() {
  const { incomes, setIncomes } = useBudget();
  const [formData, setFormData] = useState({
    label: '',
    amount: '',
    date: new Date().toISOString().split('T')[0]
  });
  const [editingData, setEditingData] = useState({
    index: null,
    label: '',
    amount: '',
    date: ''
  });

  const handleInputChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.label || !formData.amount) return;

    const newIncome = {
      label: formData.label,
      amount: parseFloat(formData.amount),
      date: formData.date
    };

    setIncomes(prev => [...prev, newIncome]);
    setFormData({ label: '', amount: '', date: new Date().toISOString().split('T')[0] });
  };

  const handleEdit = (index) => {
    const income = incomes[index];
    setEditingData({
      index,
      label: income.label,
      amount: income.amount,
      date: income.date
    });
  };

  const handleUpdate = () => {
    if (editingData.index === null) return;

    const updated = [...incomes];
    updated[editingData.index] = {
      label: editingData.label,
      amount: parseFloat(editingData.amount),
      date: editingData.date
    };
    setIncomes(updated);
    setEditingData({ index: null, label: '', amount: '', date: '' });
  };

  const handleDelete = (index) => {
    setIncomes(prev => prev.filter((_, i) => i !== index));
  };

  const calculateTotal = () => {
    return incomes.reduce((sum, income) => sum + income.amount, 0);
  };

  return {
    formData,
    editingData,
    setEditingData,
    incomes,
    handleInputChange,
    handleSubmit,
    handleEdit,
    handleUpdate,
    handleDelete,
    calculateTotal
  };
}