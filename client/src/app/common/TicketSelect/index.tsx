import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { Ticket } from '@acme/shared-models';
import stylesGlobal from '../../app.module.css';
import { Box } from '@mui/material';

interface TicketSelectProps {
  ticket: Ticket;
  handleComplete: (ticket: Ticket) => void;
}

const TicketSelect: React.FC<TicketSelectProps> = ({
  ticket,
  handleComplete,
}) => {
  return (
    <Box className={`${stylesGlobal['statusTicket']}`}>
      <Select
        value={`${ticket.completed ? 'complete' : 'incomplete'}`}
        onChange={() => handleComplete(ticket)}
        className={`${
          ticket.completed
            ? stylesGlobal['statusStyleComplete']
            : stylesGlobal['statusStyleInComplete']
        } ${stylesGlobal['statusTicketSelect']}`}
        sx={{
          '& .MuiSvgIcon-root': {
            color: 'white',
          },
        }}
      >
        <MenuItem
          value="complete"
          disabled={ticket.completed}
          data-testid="complete-menu-item"
        >
          Complete
        </MenuItem>
        <MenuItem value="incomplete" disabled={!ticket.completed}>
          Incomplete
        </MenuItem>
      </Select>
    </Box>
  );
};

export default TicketSelect;
