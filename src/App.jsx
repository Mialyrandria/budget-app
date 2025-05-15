import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Expenses from './pages/expenses/Expenses';
import ExpensesChart from './pages/expenses/ExpensesChart';
import Income from './pages/income/Income';
import IncomeChart from './pages/income/IncomeChart';
import Categories from './pages/categories/Categories';
import BottomNavigation from './components/BottomNavigation';
import Home from './pages/Home';


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-50 to-zinc-100 pb-16 md:pb-0">
      <nav className="bg-blue-600 text-white p-4 w-full">
        <div className="container mx-auto flex justify-between items-center">
          <span className="text-xl font-bold">BudgetZen</span>
          <div className="flex items-center gap-4">
            <button 
              className="md:hidden p-2" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Menu"
            >
              <svg 
                className="w-6 h-6" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M6 18L18 6M6 6l12 12" 
                  />
                ) : (
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M4 6h16M4 12h16M4 18h16" 
                  />
                )}
              </svg>
            </button>

            <div className="hidden md:flex gap-4">
              <Link to="/" className="hover:underline">Accueil</Link>
              <Link to="/expenses" className="hover:underline">Dépenses</Link>
              <Link to="/income" className="hover:underline">Revenus</Link>
              <Link to="/categories" className="hover:underline">Catégories</Link>
            </div>
          </div>

          <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} pt-4`}>
            <div className="flex flex-col gap-4">
              <Link 
                to="/" 
                className="hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link 
                to="/expenses" 
                className="hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Dépenses
              </Link>
              <Link 
                to="/income" 
                className="hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Revenus
              </Link>
              <Link 
                to="/categories" 
                className="hover:bg-blue-700 px-4 py-2 rounded"
                onClick={() => setIsMenuOpen(false)}
              >
                Catégories
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4">
        <div className="container mx-auto p-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/expenses/chart" element={<ExpensesChart />} />
            <Route path="/income" element={<Income />} />
            <Route path="/income/chart" element={<IncomeChart />} />
            <Route path="/categories" element={<Categories />} />
          </Routes>
        </div>
        <BottomNavigation />
      </div>
    </div> // ✅ Cette fermeture était manquante
  );
}

export default App;