import { useExpensesLogic } from './hooks/useExpensesLogic';
import { Link } from 'react-router-dom';
import {
  FiPlusCircle, FiEdit2, FiTrash2, FiAlertTriangle,
  FiBarChart2, FiCalendar, FiDollarSign, FiTag
} from 'react-icons/fi';

export default function Expenses() {
  const {
    formData,
    editingData,
    setEditingData,
    expenses,
    handleInputChange,
    handleEditInputChange,
    handleSubmit,
    handleEdit,
    handleUpdate,
    handleDelete,
    getCategoryAlerts,
    categories,
  } = useExpensesLogic();

  const alerts = getCategoryAlerts();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-screen-lg mx-auto space-y-10">

        <h2 className="text-3xl font-bold text-center text-gray-800 flex items-center justify-center gap-3">
          {editingData.index !== null ? 'Modifier la dépense' : 'Ajouter une dépense'}
        </h2>

        <div className="bg-white/90 dark:bg-zinc-800/90 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8 space-y-6">

          {alerts.length > 0 && (
            <div className="space-y-4">
              {alerts.map(({ category, percentage, limit }) => (
                <div key={category} className="flex items-start gap-3 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-xl shadow-sm">
                  <FiAlertTriangle className="text-yellow-500 text-xl mt-1" />
                  <p className="text-sm sm:text-base text-yellow-900">
                    Les dépenses en <strong>{category}</strong> représentent <strong>{percentage.toFixed(1)}%</strong> de vos revenus (limite : {limit}%)
                  </p>
                </div>
              ))}
            </div>
          )}

          <form
            onSubmit={(e) => {
              e.preventDefault();
              editingData.index !== null ? handleUpdate() : handleSubmit();
            }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          >
            <div className="relative col-span-1">
              <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Nom de la dépense"
                value={editingData.index !== null ? editingData.label : formData.label}
                onChange={(editingData.index !== null ? handleEditInputChange : handleInputChange)('label')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="relative col-span-1">
              <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="number"
                placeholder="Montant"
                value={editingData.index !== null ? editingData.amount : formData.amount}
                onChange={(editingData.index !== null ? handleEditInputChange : handleInputChange)('amount')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="relative col-span-1">
              <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={editingData.index !== null ? editingData.category : formData.category}
                onChange={(editingData.index !== null ? handleEditInputChange : handleInputChange)('category')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
              >
                <option value="">-- Choisir une catégorie --</option>
                {Object.entries(categories).map(([cat, limit]) => (
                  <option key={cat} value={cat}>{cat} (max {limit}%)</option>
                ))}
              </select>
            </div>

            <div className="relative col-span-1">
              <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="date"
                value={editingData.index !== null ? editingData.date : formData.date}
                onChange={(editingData.index !== null ? handleEditInputChange : handleInputChange)('date')}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 transition"
              />
            </div>

            <div className="col-span-1 sm:col-span-2 flex gap-4 justify-end">
              {editingData.index !== null && (
                <button
                  type="button"
                  onClick={() => setEditingData({ index: null, label: '', amount: '', category: '', date: '' })}
                  className="flex-1 bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all flex items-center justify-center gap-2"
                >
                  <FiTrash2 />
                  Annuler
                </button>
              )}
              <button
                type="submit"
                className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
              >
                {editingData.index !== null ? <><FiEdit2 /> Enregistrer</> : <><FiPlusCircle /> Ajouter</>}
              </button>
            </div>
          </form>

          <Link
            to="/expenses/chart"
            className="block w-full text-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:from-indigo-600 hover:to-indigo-700 transition-all mt-6 flex items-center justify-center gap-2"
          >
            <FiBarChart2 />
            Voir le graphique des dépenses
          </Link>
        </div>

        <div className="bg-white/90 backdrop-blur-md rounded-3xl shadow-xl p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-gray-800 flex items-center justify-center gap-2">
            Dépenses enregistrées
          </h3>

          {expenses.length === 0 ? (
            <p className="text-center text-gray-500">Aucune dépense enregistrée.</p>
          ) : (
            <ul className="space-y-4">
              {expenses.map((expense, index) => (
                <li
                  key={index}
                  className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                >
                  <div className="space-y-1">
                    <div className="text-gray-600 flex items-center gap-2 text-sm">
                      <FiCalendar />
                      {expense.date ? new Date(expense.date).toLocaleDateString('fr-FR') : 'Date non spécifiée'}
                    </div>
                    <div className="font-semibold text-gray-800">{expense.label}</div>
                    <div className="text-sm text-gray-700 flex items-center gap-2">
                      <FiTag className="text-gray-400" />
                      {expense.category}
                    </div>
                  </div>
                  <div className="flex items-center gap-3 text-sm sm:text-base mt-2 sm:mt-0">
                    <span className="font-bold text-blue-600">{expense.amount.toLocaleString()} Ar</span>
                    <button
                      onClick={() => handleEdit(index)}
                      className="text-blue-600 hover:text-blue-800 transition flex items-center gap-1"
                    >
                      <FiEdit2 />
                      Modifier
                    </button>
                    <button
                      onClick={() => handleDelete(index)}
                      className="text-red-600 hover:text-red-800 transition flex items-center gap-1"
                    >
                      <FiTrash2 />
                      Supprimer
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
