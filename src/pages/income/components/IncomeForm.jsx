import { MESSAGES } from '../constants';
import { FiTag, FiDollarSign, FiCalendar, FiPlusCircle } from 'react-icons/fi';

export function IncomeForm({ formData, onInputChange, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="flex flex-col gap-4 max-w-md">
      <div className="relative">
        <FiTag className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder={MESSAGES.INCOME_NAME}
          value={formData.label}
          onChange={onInputChange('label')}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="relative">
        <FiDollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <input
          type="number"
          placeholder={MESSAGES.AMOUNT}
          value={formData.amount}
          onChange={onInputChange('amount')}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <div className="relative">
        <FiCalendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
        <input
          type="date"
          value={formData.date}
          onChange={onInputChange('date')}
          className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200"
        />
      </div>
      <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded flex items-center justify-center gap-2">
        <FiPlusCircle />
        {MESSAGES.ADD}
      </button>
    </form>
  );
}