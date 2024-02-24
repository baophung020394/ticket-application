import * as yup from 'yup';

export type FormTicket = {
  description: string;
  assigneeId?: yup.Maybe<number>;
};

export type FormAssignTicket = {
  ticketId: number;
  assigneeId?: yup.Maybe<number>;
};

export type FormData = {
  description: string;
  assigneeId?: yup.Maybe<number>;
};

export type FormDataAssign = {
  ticketid?: number;
  assigneeId?: yup.Maybe<number>;
};

export type MenuType = {
  label: string;
  link: string;
};
