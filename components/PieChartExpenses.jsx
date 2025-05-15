import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useBudget } from '../context/BudgetContext';

const COLORS = ['#FF8042', '#00C49F', '#FFBB28', '#8884D8', '#FF6666'];

export default function PieChartExpenses() {
  const { expenses } = useBudget();

  const dataByCategory = expenses.reduce((acc, expense) => {
    const { category, amount } = expense;
    if (!acc[category]) acc[category] = 0;
    acc[category] += amount;
    return acc;
  }, {});

  const chartData = Object.entries(dataByCategory).map(([name, value]) => ({ name, value }));

  if (chartData.length === 0) return <p className="mt-4">Aucune dépense à afficher.</p>;

  return (
    <div className="mt-8 w-full flex flex-col items-center px-4">
      <h2 className="text-xl font-bold mb-4">Répartition des dépenses</h2>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
              dataKey="value"
              label
            >
              {chartData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
