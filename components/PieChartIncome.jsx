import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useBudget } from '../context/BudgetContext';

const COLORS = ['#00C49F', '#FF8042', '#FFBB28', '#8884D8', '#FF6666'];

export default function PieChartIncome() {
  const { incomes } = useBudget();

  const dataByLabel = incomes.reduce((acc, income) => {
    const { label, amount } = income;
    if (!acc[label]) acc[label] = 0;
    acc[label] += amount;
    return acc;
  }, {});

  const chartData = Object.entries(dataByLabel).map(([name, value]) => ({ name, value }));

  if (chartData.length === 0) return <p className="mt-4">Aucun revenu à afficher.</p>;

  return (
    <div className="mt-8 w-full flex flex-col items-center px-4">
      <h2 className="text-xl font-bold mb-4">Répartition des revenus</h2>
      <div style={{ width: '100%', height: '400px' }}>
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#00C49F"
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
