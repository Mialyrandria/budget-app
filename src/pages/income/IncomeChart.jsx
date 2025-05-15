import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import PieChartIncome from '../../../components/PieChartIncome';

export default function IncomeChart() {
  return (
    <div className="max-w-4xl mx-auto p-4">
      <Link
        to="/income"
        className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 mb-6 transition-colors duration-200"
      >
        <FiArrowLeft />
        Revenir aux revenus
      </Link>
      <PieChartIncome />
    </div>
  );
}