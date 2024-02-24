// reducers/tickets.ts
import { Ticket } from '@acme/shared-models';
import { createSlice } from '@reduxjs/toolkit';
import {
  addTicket,
  assignTicket,
  fetchTickets,
  filterTicket,
  markTicketComplete,
  markTicketInComplete,
  unAssignTicket,
} from '../actions/ticketsActions';

interface TicketsState {
  tickets: Ticket[];
  loading: boolean;
  loadingAssign: boolean;
  loadingUnAssign: boolean;
  error: string | null;
}

const initialState: TicketsState = {
  tickets: [],
  loading: false,
  error: null,
  loadingAssign: false,
  loadingUnAssign: false,
};

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTickets.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTickets.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(fetchTickets.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tickets';
      })
      .addCase(addTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = state.tickets.concat(action.payload);
      })
      .addCase(addTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to add ticket';
      })
      .addCase(markTicketComplete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markTicketComplete.fulfilled, (state, action) => {
        const updatedTicket = action.payload;
        state.loading = false;
        state.tickets = state.tickets.map((ticket) =>
          ticket.id === updatedTicket.id
            ? { ...ticket, completed: updatedTicket.completed }
            : ticket
        );
      })
      .addCase(markTicketComplete.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to mark ticket complete';
      })
      .addCase(markTicketInComplete.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(markTicketInComplete.fulfilled, (state, action) => {
        const updatedTicket = action.payload;
        state.loading = false;
        state.tickets = state.tickets.map((ticket) =>
          ticket.id === updatedTicket.id
            ? { ...ticket, completed: updatedTicket.completed }
            : ticket
        );
      })
      .addCase(markTicketInComplete.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || 'Failed to mark ticket incomplete';
      })
      .addCase(assignTicket.pending, (state) => {
        state.loadingAssign = true;
        state.error = null;
      })
      .addCase(assignTicket.fulfilled, (state, action) => {
        const updatedTicket = action.payload;
        state.loadingAssign = false;
        state.tickets = state.tickets.map((ticket) => {
          return ticket.id === updatedTicket.ticketId
            ? { ...ticket, assigneeId: updatedTicket.assigneeId }
            : ticket;
        });
      })
      .addCase(assignTicket.rejected, (state, action) => {
        state.loadingAssign = false;
        state.error = action.error.message || 'Failed to assign ticket';
      })
      .addCase(unAssignTicket.pending, (state) => {
        state.loadingUnAssign = true;
        state.error = null;
      })
      .addCase(unAssignTicket.fulfilled, (state, action) => {
        const updatedTicket = action.payload;
        state.loadingUnAssign = false;
        state.tickets = state.tickets.map((ticket) => {
          return ticket.id === updatedTicket.ticketId
            ? { ...ticket, assigneeId: updatedTicket.assigneeId }
            : ticket;
        });
      })
      .addCase(unAssignTicket.rejected, (state, action) => {
        state.loadingUnAssign = false;
        state.error = action.error.message || 'Failed to assign ticket';
      })
      .addCase(filterTicket.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(filterTicket.fulfilled, (state, action) => {
        state.loading = false;
        state.tickets = action.payload;
      })
      .addCase(filterTicket.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to filter ticket';
      });
  },
});

export default ticketsSlice.reducer;
