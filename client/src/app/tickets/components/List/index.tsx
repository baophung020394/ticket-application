import { Ticket } from '@acme/shared-models';
import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import Pagination from '../../../../app/common/Pagination';
import { RootState } from '../../../../store/store';
import TicketItem from '../Ticket';

interface ListTicketProps {
  tickets: Ticket[];
}

const ListTicket = (props: ListTicketProps) => {
  const { tickets } = props;
  const [currentPage, setCurrentPage] = React.useState(1);
  const { numberPerPage } = useSelector((state: RootState) => state.commons);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

  const paginatedTickets = tickets.slice(
    (currentPage - 1) * numberPerPage,
    currentPage * numberPerPage
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [numberPerPage]);

  return (
    <Grid container spacing={2}>
      {paginatedTickets?.map((ticket: Ticket, index: number) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
          key={`${index}-${ticket?.description}`}
          data-testid="ticket-item"
        >
          <TicketItem ticket={ticket} />
        </Grid>
      ))}
      <Grid item xs={12}>
        <Pagination
          pageCount={Math.ceil(tickets.length / numberPerPage)}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </Grid>
    </Grid>
  );
};

export default ListTicket;
