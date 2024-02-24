import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  addTicketApi,
  assignTicketApi,
  getListTicket,
  markTicketCompleteApi,
  markTicketInCompleteApi,
  unAssignTicketApi,
} from '../../apis/ticket';
import { FormAssignTicket, FormTicket } from '../../constants/type.common';
import { Ticket } from '@acme/shared-models';

export const fetchTickets = createAsyncThunk(
  'tickets/fetchTickets',
  async () => {
    const response = await getListTicket();
    return [...response.data];
  }
);

export const addTicket = createAsyncThunk(
  'tickets/addTicket',
  async (data: FormTicket) => {
    const response = await addTicketApi(data);
    return response.data;
  }
);

export const markTicketComplete = createAsyncThunk(
  'tickets/markTicketComplete',
  async (ticket: Ticket) => {
    const response = await markTicketCompleteApi(ticket);
    return response?.status === 204 ? ticket : response.data;
  }
);

export const markTicketInComplete = createAsyncThunk(
  'tickets/markTicketInComplete',
  async (ticket: Ticket) => {
    const response = await markTicketInCompleteApi(ticket);
    return response?.status === 204 ? ticket : response.data;
  }
);

export const assignTicket = createAsyncThunk(
  'tickets/assignTicket',
  async (assign: FormAssignTicket) => {
    const response = await assignTicketApi(assign.ticketId, assign.assigneeId);
    return response?.status === 204 ? assign : response.data;
  }
);

export const unAssignTicket = createAsyncThunk(
  'tickets/unAssignTicket',
  async (assign: FormAssignTicket) => {
    const response = await unAssignTicketApi(assign.ticketId);
    return response?.status === 204 ? assign : response.data;
  }
);

export const filterTicket = createAsyncThunk(
  'tickets/filterTicket',
  async (tickets: Ticket[]) => {
    return tickets;
  }
);
