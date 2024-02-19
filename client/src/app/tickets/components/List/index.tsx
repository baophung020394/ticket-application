import { Ticket } from '@acme/shared-models';
import { Grid } from '@mui/material';
import React from 'react';
import TicketItem from '../Ticket';

interface ListTicketProps {
  tickets: Ticket[];
}

const ListTicket = (props: ListTicketProps) => {
  const { tickets } = props;

  return (
    <Grid container spacing={4}>
      {tickets?.map((ticket: Ticket, index: number) => (
        <Grid
          item
          xs={12}
          md={6}
          lg={3}
          key={`${index}-${ticket?.description}`}
          data-testid="ticket-item"
        >
          <TicketItem ticket={ticket} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ListTicket;
