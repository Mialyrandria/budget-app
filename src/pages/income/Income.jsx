import { useIncomeLogic } from './hooks/useIncomeLogic';
import { IncomeForm } from './components/IncomeForm';
import { IncomeList } from './components/IncomeList';
import { Link } from 'react-router-dom';
import { MESSAGES } from './constants';
import {
  FiPlusCircle, FiEdit2, FiTrash2, FiAlertTriangle,
  FiBarChart2, FiCalendar, FiDollarSign, FiTag
} from 'react-icons/fi';

export default function Income() {
  const {
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
  } = useIncomeLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-8">{MESSAGES.ADD_INCOME}</h2>
        
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
          {editingData.index !== null ? (
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-6 text-slate-800 text-center">Modifier le revenu</h3>
              <form onSubmit={(e) => { e.preventDefault(); handleUpdate(); }} className="space-y-4">
                <input
                  type="text"
                  placeholder={MESSAGES.INCOME_NAME}
                  value={editingData.label}
                  onChange={(e) => setEditingData(prev => ({ ...prev, label: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="number"
                  placeholder={MESSAGES.AMOUNT}
                  value={editingData.amount}
                  onChange={(e) => setEditingData(prev => ({ ...prev, amount: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
                <input
                  type="date"
                  value={editingData.date}
                  onChange={(e) => setEditingData(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
                />
                <div className="flex gap-4">
                  <button
                    type="submit"
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-3 rounded-xl font-medium hover:from-emerald-600 hover:to-emerald-700 transform hover:translate-y-[-2px] transition-all duration-200"
                  >
                    Enregistrer
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditingData({ index: null, label: '', amount: '', date: '' })}
                    className="flex-1 bg-slate-500 text-white py-3 rounded-xl font-medium hover:bg-slate-600 transform hover:translate-y-[-2px] transition-all duration-200"
                  >
                    Annuler
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <IncomeForm
              formData={formData}
              onInputChange={handleInputChange}
              onSubmit={handleSubmit}
            />
          )}
        </div>

        <Link
          to="/income/chart"
          className="block bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-xl font-medium hover:from-indigo-600 hover:to-indigo-700 transform hover:translate-y-[-2px] transition-all duration-200 text-center"
        >
          Voir le graphique des revenus
        </Link>

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg p-6 sm:p-8">
          <IncomeList
            incomes={incomes}
            total={calculateTotal()}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>
    </div>
  );
}
