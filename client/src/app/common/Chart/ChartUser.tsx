import { Ticket, User } from '@acme/shared-models';
import React from 'react';
import { Bar } from 'react-chartjs-2';

interface ChartUsersProps {
  users: User[];
  tickets: Ticket[];
}

const ChartUsers: React.FC<ChartUsersProps> = ({ users, tickets }) => {
  const data = {
    labels: users.map((user) => user.name),
    datasets: [
      {
        label: 'Incomplete',
        data: users.map(
          (user) =>
            tickets.filter(
              (ticket) => ticket.assigneeId === user.id && !ticket.completed
            ).length
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Complete',
        data: users.map(
          (user) =>
            tickets.filter(
              (ticket) => ticket.assigneeId === user.id && ticket.completed
            ).length
        ),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
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

export default ChartUsers;
