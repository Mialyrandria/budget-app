import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiDollarSign, FiCreditCard, FiFolder, FiPieChart } from 'react-icons/fi';

export default function BottomNavigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm border-t border-zinc-200 shadow-lg md:hidden z-50">
      <nav className="flex justify-around items-center h-16 max-w-lg mx-auto px-4">
        <Link 
          to="/" 
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/') && location.pathname === '/' ? 'text-indigo-600' : 'text-zinc-600 hover:text-indigo-500'
          }`}
        >
          <FiHome className="text-2xl mb-1" />
          <span className="text-xs font-medium">Accueil</span>
        </Link>
        
        <Link 
          to="/income" 
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/income') ? 'text-indigo-600' : 'text-zinc-600 hover:text-indigo-500'
          }`}
        >
          <FiDollarSign className="text-2xl mb-1" />
          <span className="text-xs font-medium">Revenus</span>
        </Link>
        
        <Link 
          to="/expenses" 
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/expenses') ? 'text-indigo-600' : 'text-zinc-600 hover:text-indigo-500'
          }`}
        >
          <FiCreditCard className="text-2xl mb-1" />
          <span className="text-xs font-medium">Dépenses</span>
        </Link>
        
        <Link 
          to="/categories" 
          className={`flex flex-col items-center transition-colors duration-200 ${
            isActive('/categories') ? 'text-indigo-600' : 'text-zinc-600 hover:text-indigo-500'
          }`}
        >
          <FiFolder className="text-2xl mb-1" />
          <span className="text-xs font-medium">Catégories</span>
        </Link>
      </nav>
    </div>
  );
}