import { Ticket } from '@acme/shared-models';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from '../../store/store';
import ListTicket from './components/List';
import TicketItem from './components/Ticket';
import Filter from './components/Filter';

describe('ListTicket component', () => {
  const mockTickets: Ticket[] = [
    { id: 1, description: 'Ticket 1', assigneeId: 0, completed: false },
    { id: 2, description: 'Ticket 2', assigneeId: 1, completed: false },
    { id: 3, description: 'Ticket 3', assigneeId: 2, completed: false },
  ];

  test('renders list of tickets correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <ListTicket tickets={mockTickets} />
        </Provider>
      </Router>
    );
    const ticketItems = screen.getAllByTestId('ticket-item');
    expect(ticketItems).toHaveLength(mockTickets.length);
  });

  test('renders each ticket item with correct description', () => {
    render(
      <Router>
        <Provider store={store}>
          <ListTicket tickets={mockTickets} />
        </Provider>
      </Router>
    );
    const ticketItems = screen.getAllByTestId('ticket-item');
    ticketItems.forEach((item, index) => {
      expect(item).toHaveTextContent(mockTickets[index].description);
    });
  });

  test('renders each ticket item as incomplete', () => {
    render(
      <Router>
        <Provider store={store}>
          <ListTicket tickets={mockTickets} />
        </Provider>
      </Router>
    );
    const ticketItems = screen.getAllByTestId('ticket-item');
    ticketItems.forEach((item) => {
      expect(item).not.toHaveClass('completed');
    });
  });

  test('renders Filter component correctly', () => {
    render(
      <Router>
        <Provider store={store}>
          <Filter
            onFilterChange={() => {
              console.log('Filter test');
            }}
          />
        </Provider>
      </Router>
    );

    const filterInput = screen.getByLabelText('Search by description...');
    expect(filterInput).toBeInTheDocument();

    const searchIcon = screen.getByLabelText('search');
    expect(searchIcon).toBeInTheDocument();
  });

  describe('TicketItem component', () => {
    const mockTicket: Ticket = {
      id: 1,
      description: 'Test ticket',
      assigneeId: 1,
      completed: false,
    };

    test('renders TicketItem component correctly', () => {
      render(
        <Router>
          <Provider store={store}>
            <TicketItem ticket={mockTicket} />
          </Provider>
        </Router>
      );

      const ticketIdElement = screen.getByText(`Ticket-${mockTicket.id}`);
      expect(ticketIdElement).toBeInTheDocument();

      const descriptionElement = screen.getByText(mockTicket.description);
      expect(descriptionElement).toBeInTheDocument();
    });

    test('renders TicketItem component with assignee', () => {
      render(
        <Router>
          <Provider store={store}>
            <TicketItem ticket={mockTicket} />
          </Provider>
        </Router>
      );

      const assigneeElement = screen.getByText(
        mockTicket.assigneeId !== null ? mockTicket.assigneeId.toString() : ''
      );
      expect(assigneeElement).toBeInTheDocument();
    });
  });
});
