import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registering ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses, type }) => {
  // Prepare data for the chart
  const expenseCategories = expenses.reduce((acc, expense) => {
    acc[expense.category] = acc[expense.category] ? acc[expense.category] + expense.amount : expense.amount;
    return acc;
  }, {});

  // Chart data
  const data = {
    labels: Object.keys(expenseCategories), // Categories as labels
    datasets: [
      {
        label: type === "expense" 
                ? `Expenses by ${Object.keys(expenseCategories).join(', ')}` 
                : 'Income by Category',
        data: Object.values(expenseCategories),
        backgroundColor: [
          '#af3e26 ', // Red
          '#FFD700', // Yellow
          '#18961d', // Green
          '#124090', // Blue
          '#8A2BE2', // Purple
        ],
        borderColor: '#fff',
        borderWidth: 1,
      },
    ],
  };

  
  const options = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
        
          label: function(tooltipItem) {
            const category = tooltipItem.label;
            const value = tooltipItem.raw;
            return `${category}: ₹ ${value}`; 
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg h-full flex flex-col justify-center items-center">
      {/* Conditional Title */}
      <div className="text-2xl font-semibold text-gray-800 mb-4 text-center">
        {type === "expense" ? "Expenses by Category" : "Income by Category"}
      </div>

      {/* Chart */}
      <div className="h-72 w-full flex justify-center">
        <Pie data={data} options={options} />
      </div>
    </div>
  );
};

export default ExpenseChart;
