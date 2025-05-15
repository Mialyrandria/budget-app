import { MESSAGES } from '../constants';
import {
  FiPlusCircle, FiEdit2, FiTrash2, FiAlertTriangle,
  FiBarChart2, FiCalendar, FiDollarSign, FiTag
} from 'react-icons/fi';

export function IncomeList({ incomes, total, onEdit, onDelete }) {
  return (
    <div>
      <h3 className="text-xl mt-6 font-semibold">{MESSAGES.REGISTERED_INCOMES}</h3>
      <ul className="mt-2 w-full space-y-2">
        {incomes.map((income, index) => (
          <li key={index} className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-2 text-xs sm:text-sm md:text-base">
            <span className="mb-1 sm:mb-0 break-words w-full sm:w-auto">
              {new Date(income.date).toLocaleDateString('fr-FR')} - {income.label}: {income.amount} Ar
            </span>
            <div className="flex gap-2 w-full sm:w-auto justify-end mt-1 sm:mt-0">
              <button
                onClick={() => onEdit(index)}
                className="text-blue-500 hover:underline text-xs sm:text-sm"
              >
                <FiEdit2 />
                Modifier
              </button>
              <button
                onClick={() => onDelete(index)}
                className="text-red-500 hover:underline text-xs sm:text-sm"
              >
                <FiTrash2 />
                Supprimer
              </button>
            </div>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-bold text-lg">{MESSAGES.TOTAL}: {total} Ar</p>
    </div>
  );
}