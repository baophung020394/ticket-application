import { Ticket } from '@acme/shared-models';
import { FormTicket } from '../constants/type.common';
import * as yup from 'yup';
import axiosClient from './axiosClient';

export const addTicketApi = (ticket: FormTicket) => {
  return axiosClient.post('/tickets', ticket);
};

export const getListTicket = () => {
  return axiosClient.get(`/tickets`);
};

export const getTicket = (id: string) => {
  return axiosClient.get(`/tickets/${id}`);
};

export const assignTicketApi = (
  ticketId: number,
  userId: yup.Maybe<number>
) => {
  return axiosClient.put(`/tickets/${ticketId}/assign/${userId}`);
};

export const unAssignTicketApi = (ticketId: number) => {
  return axiosClient.put(`/tickets/${ticketId}/unassign`);
};

export const markTicketCompleteApi = (ticket: Ticket) => {
  return axiosClient.put(`/tickets/${ticket.id}/complete`);
};

export const markTicketInCompleteApi = (ticket: Ticket) => {
  return axiosClient.delete(`/tickets/${ticket.id}/complete`);
};
