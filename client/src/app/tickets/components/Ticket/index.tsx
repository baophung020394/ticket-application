import { Ticket } from '@acme/shared-models';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Popup from '../../../../app/common/Popup';
import {
  statusStyleComplete,
  statusStyleInComplete,
  styledBetween,
} from '../../../../constants/styles.common';
import { FormDataAssign } from '../../../../constants/type.common';
import { convertArrayToRecord, getNameColor } from '../../../../helpers/common';
import {
  assignTicket,
  fetchTickets,
  markTicketComplete,
  markTicketInComplete,
} from '../../../../store/actions/ticketsActions';
import { RootState, useAppDispatch } from '../../../../store/store';
import styles from '../../tickets.module.css';
import TicketAssign from '../Forms/Assign';

interface TicketsProps {
  ticket: Ticket;
}

function TicketItem(props: TicketsProps) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { ticket } = props;
  const { users } = useSelector((state: RootState) => state.users);

  const mapUsersList: Record<number, string> = convertArrayToRecord(users);

  const assigneeName =
    ticket.assigneeId !== null ? mapUsersList[ticket.assigneeId] : null;
  const { name, color } = assigneeName
    ? getNameColor(assigneeName)
    : { name: '', color: '' };

  const dispatch = useAppDispatch();

  const handleAddClick = () => setShowForm(true);

  const handleCloseForm = () => setShowForm(false);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleComplete = useCallback(
    (ticket: Ticket) => {
      const cloneTicket = { ...ticket };
      if (cloneTicket.completed) {
        cloneTicket.completed = false;
        dispatch(markTicketInComplete(cloneTicket));
      } else {
        cloneTicket.completed = true;
        dispatch(markTicketComplete(cloneTicket));
      }
      dispatch(fetchTickets());
    },
    [dispatch]
  );

  const onAssignUser = async (data: FormDataAssign) => {
    if (data && ticket && ticket.id) {
      dispatch(
        assignTicket({ ticketId: ticket?.id, assigneeId: data.assigneeId })
      );
      setShowForm(false);
      setAnchorEl(null);
    }
  };

  const styleCardContent = {
    paddingTop: 0,
  };

  return (
    <Card
      className={`${
        ticket.completed
          ? styles['ticketCardComplete']
          : styles['ticketCardInComplete']
      }`}
    >
      <Box>
        <CardHeader
          avatar={
            ticket?.assigneeId ? (
              <Avatar sx={{ width: 30, height: 30, bgcolor: color }}>
                {name}
              </Avatar>
            ) : null
          }
          action={
            <>
              <IconButton aria-label="settings" onClick={handleClick}>
                <MoreVertIcon />
              </IconButton>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleAddClick}>Assign user</MenuItem>
              </Menu>
            </>
          }
          title={assigneeName}
        />

        <CardContent style={styleCardContent}>
          <Typography gutterBottom variant="h5" component="div">
            {ticket?.id}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {ticket?.description}
          </Typography>
        </CardContent>
      </Box>

      <CardActions style={styledBetween}>
        <Link to={`/tickets/${ticket.id}`}>Ticket-{ticket.id}</Link>
        <Select
          value={`${ticket.completed ? 'complete' : 'incomplete'}`}
          onChange={() => handleComplete(ticket)}
          style={
            ticket?.completed ? statusStyleComplete : statusStyleInComplete
          }
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
      </CardActions>

      <Popup title="Assign" open={showForm} onClose={handleCloseForm}>
        <TicketAssign
          onSubmit={onAssignUser}
          assignName={assigneeName || 'default'}
        />
      </Popup>
    </Card>
  );
}

export default TicketItem;
