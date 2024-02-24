import { Ticket } from '@acme/shared-models';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FormAssignTicket, FormTicket } from '../../constants/type.common';
import { addTicket, assignTicket } from '../../store/actions/ticketsActions';
import { setLoadingGlobal } from '../../store/reducers/common';
import { RootState, useAppDispatch } from '../../store/store';
import Empty from '../common/Empty';
import Popup from '../common/Popup';
import TopProgressBar from '../common/TopProgressBar';
import Filter from './components/Filter';
import TicketForm from './components/Forms/Add';
import ListTicket from './components/List';
import stylesGlobal from '../app.module.css';

export function Tickets() {
  const { tickets } = useSelector((state: RootState) => state.tickets);
  const { loading } = useSelector((state: RootState) => state.commons);
  const [showForm, setShowForm] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [filterListTicket, setFilterListTicket] = useState<Ticket[]>([]);

  const dispatch = useAppDispatch();

  const handleAddClick = () => setShowForm(true);

  const handleCloseForm = () => setShowForm(false);

  const onAddTicket = async (data: FormTicket) => {
    if (data) {
      const res = await dispatch(addTicket(data));

      if (!loading && data.assigneeId) {
        const assignTicketObj: FormAssignTicket = {
          ticketId: res.payload.id,
          assigneeId: data.assigneeId,
        };
        dispatch(assignTicket(assignTicketObj));
        setShowForm(false);
      } else {
        setShowForm(false);
      }
    }
  };

  const handleFilterChange = (value: string) => {
    const filterValue = value.toLowerCase().trim();

    if (filterValue === '') {
      setFilterListTicket(tickets);
      setIsEmpty(false);
    }

    const filteredTickets = tickets.filter((ticket) =>
      ticket.description.toLowerCase().includes(filterValue)
    );

    if (filteredTickets.length > 0) {
      setFilterListTicket(filteredTickets);
    } else {
      setIsEmpty(true);
    }
  };

  useEffect(() => {
    if (tickets.length > 0) dispatch(setLoadingGlobal(false));
  }, [tickets, dispatch]);

  return (
    <Grid container pt={2} pb={2} height="100%">
      <Grid
        item
        xs={12}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" component="h4" fontWeight="bold">
          Tickets
        </Typography>

        <Box className={stylesGlobal['buttons']}>
          <Button
            variant="contained"
            onClick={handleAddClick}
            className={stylesGlobal['btn-primary']}
          >
            Add
          </Button>
        </Box>
      </Grid>

      <Grid item xs={12}>
        <Filter onFilterChange={handleFilterChange} />
      </Grid>

      {loading ? (
        <TopProgressBar />
      ) : (
        <Grid container>
          {isEmpty ? (
            <Empty title="Ticket" description="not found" />
          ) : (
            <ListTicket
              tickets={filterListTicket.length > 0 ? filterListTicket : tickets}
            />
          )}
        </Grid>
      )}

      <Popup title="Add ticket" open={showForm} onClose={handleCloseForm}>
        <TicketForm onSubmit={onAddTicket} />
      </Popup>
    </Grid>
  );
}

export default Tickets;
