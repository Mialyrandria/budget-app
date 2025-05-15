import { useExpensesLogic } from '../expenses/hooks/useExpensesLogic';
import { FiFolder, FiPercent, FiPlusCircle, FiTrash2, FiEdit2 } from 'react-icons/fi';

export default function Categories() {
  const {
    categories,
    editingCategory,
    setEditingCategory,
    handleAddCategory,
    handleUpdateCategoryLimit,
    handleDeleteCategory
  } = useExpensesLogic();

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-zinc-800 text-center flex items-center justify-center gap-3">
          <FiFolder className="text-indigo-500" />
          Gestion des Catégories
        </h2>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 mb-8">
          <form onSubmit={handleAddCategory} className="space-y-4">
            <div className="relative">
              <FiFolder className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
              <input
                type="text"
                placeholder="Nom de la catégorie"
                value={editingCategory.name}
                onChange={(e) => setEditingCategory(prev => ({ ...prev, name: e.target.value }))}
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              />
            </div>
            <div className="flex gap-4">
              <div className="relative flex-1">
                <FiPercent className="absolute left-4 top-1/2 transform -translate-y-1/2 text-zinc-400" />
                <input
                  type="number"
                  placeholder="Limite en % des revenus"
                  value={editingCategory.limit}
                  onChange={(e) => setEditingCategory(prev => ({ ...prev, limit: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-zinc-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                />
              </div>
              <button 
                type="submit" 
                className="px-6 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-xl font-medium hover:from-indigo-600 hover:to-indigo-700 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center gap-2"
              >
                <FiPlusCircle />
                <span className="hidden sm:inline">Ajouter</span>
              </button>
            </div>
          </form>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
          <div className="space-y-4">
            {Object.entries(categories).map(([category, limit]) => (
              <div key={category} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-zinc-200 rounded-xl hover:border-zinc-300 transition-colors duration-200 gap-4">
                <div className="flex items-center gap-3">
                  <FiFolder className="text-indigo-500" />
                  <span className="text-zinc-700 font-medium">{category}</span>
                </div>
                <div className="flex items-center gap-4 ml-auto">
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      value={limit}
                      onChange={(e) => handleUpdateCategoryLimit(category, e.target.value)}
                      className="w-20 px-3 py-2 rounded-lg border border-zinc-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    />
                    <span className="text-zinc-600">%</span>
                  </div>
                  <button
                    onClick={() => handleDeleteCategory(category)}
                    className="text-rose-500 hover:text-rose-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    <FiTrash2 />
                    <span className="hidden sm:inline">Supprimer</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}