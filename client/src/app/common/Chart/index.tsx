import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface ChartProps {
  complete: number;
  incomplete: number;
  labels: string[];
}

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart: React.FC<ChartProps> = ({ complete, incomplete, labels }) => {
  const data = {
    labels: labels,
    datasets: [
      {
        label: 'Tickets',
        data: [complete, incomplete],
        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  return <Bar data={data} options={options} width={'100%'} height={300} />;
};

export default Chart;
