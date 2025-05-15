import { useBudget } from '../../context/BudgetContext';

export default function Home() {
  const { incomes, expenses } = useBudget();

  const totalIncomes = incomes.reduce((sum, i) => sum + i.amount, 0);
  const totalExpenses = expenses.reduce((sum, e) => sum + e.amount, 0);
  const balance = totalIncomes - totalExpenses;
  const expenseRate = totalIncomes > 0 ? (totalExpenses / totalIncomes) * 100 : 0;

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-8 text-gray-800 text-center">Tableau de bord</h1>

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-400 to-green-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-white mb-2">Revenus</h2>
            <p className="text-3xl font-bold text-white">{totalIncomes.toLocaleString()} Ar</p>
          </div>

          <div className="bg-gradient-to-br from-red-400 to-red-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-white mb-2">Dépenses</h2>
            <p className="text-3xl font-bold text-white">{totalExpenses.toLocaleString()} Ar</p>
          </div>

          <div className="bg-gradient-to-br from-blue-400 to-blue-600 p-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300">
            <h2 className="text-xl font-semibold text-white mb-2">Solde</h2>
            <p className="text-3xl font-bold text-white">{balance.toLocaleString()} Ar</p>
          </div>
        </div>

        {expenseRate >= 80 && (
          <div className="mt-6 p-6 bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-400 rounded-lg shadow-md">
            <div className="flex items-center">
              <span className="text-2xl mr-3">⚠️</span>
              <p className="text-yellow-800 text-lg">
                Attention : vous avez utilisé <span className="font-bold">{expenseRate.toFixed(1)}%</span> de vos revenus !
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
