import { Ticket, User } from '@acme/shared-models';
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getTicket } from '../../../../apis/ticket';
import { getUser } from '../../../../apis/user';
import { FormDataAssign } from '../../../../constants/type.common';
import { getNameColor } from '../../../../helpers/common';
import {
  assignTicket,
  markTicketComplete,
  markTicketInComplete,
  unAssignTicket,
} from '../../../../store/actions/ticketsActions';
import { RootState, useAppDispatch } from '../../../../store/store';
import stylesGlobal from '../../../app.module.css';
import TicketSelect from '../../../common/TicketSelect';
import styles from '../../tickets.module.css';
import TicketAssign from '../Forms/Assign';

const Detail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [user, setUser] = useState<User>({} as User);
  const { loading, loadingUnAssign } = useSelector(
    (state: RootState) => state.tickets
  );
  const dispatch = useAppDispatch();

  const assigneeName = user ? user.name : null;
  const { name, color } = assigneeName
    ? getNameColor(assigneeName)
    : { name: '', color: '' };

  const fetchTicket = useCallback(async () => {
    if (id) {
      const res = await getTicket(id);
      setTicket(res.data);
    }
  }, [id]);

  const fetchUser = useCallback(
    async (id: string) => {
      const res = await getUser(id);
      setUser(res.data);
    },
    [ticket.assigneeId]
  );

  const onAssignUser = async (data: FormDataAssign) => {
    if (data && ticket && ticket.id) {
      const res = await dispatch(
        assignTicket({ ticketId: ticket?.id, assigneeId: data.assigneeId })
      );

      await fetchUser(res.payload.assigneeId.toString());
    }
  };

  const onUnAssignUser = async () => {
    if (ticket && ticket.id) {
      await dispatch(unAssignTicket({ ticketId: ticket?.id }));
      setUser({} as User);
    }
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
      fetchTicket();
    },
    [dispatch]
  );

  useEffect(() => {
    fetchTicket();
  }, [id, dispatch, fetchTicket]);

  useEffect(() => {
    if (ticket.assigneeId) {
      fetchUser(ticket.assigneeId.toString());
    }
  }, [ticket.assigneeId, fetchUser]);

  return (
    <Grid container pt={2} height="100%" spacing={4}>
      <Grid item xs={12} md={8}>
        <Box className={styles['main-content']}>
          <Box className={styles['heading']}>
            <Typography
              variant="h3"
              component="h3"
              fontSize={22}
              color="blue"
              textTransform="uppercase"
            >
              Ticket:
              <Typography
                component="span"
                fontSize={22}
                color="#000"
                textTransform="uppercase"
              >
                {ticket.id}
              </Typography>
            </Typography>
          </Box>
          <Typography
            component="p"
            fontSize={14}
            fontStyle="italic"
            color="#000"
          >
            {ticket.description}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} md={4}>
        <Box
          className={`${styles['heading']} ${styles['user']}`}
          paddingLeft={0}
        >
          <Avatar sx={{ width: 30, height: 30, bgcolor: color }}>{name}</Avatar>
          <Typography component="p" fontSize={14} color="#000">
            {assigneeName}
          </Typography>
        </Box>

        <Box mt={2}>
          <Typography variant="h4" component="h4" fontSize={14} mb={1}>
            Assign User
          </Typography>
          <TicketAssign
            onSubmit={onAssignUser}
            assignName={assigneeName || 'Choose user'}
          />
        </Box>

        {assigneeName ? (
          <Box className={stylesGlobal['buttons']} onClick={onUnAssignUser}>
            <Button
              type="submit"
              variant="outlined"
              className={stylesGlobal['btn-secondary']}
              disabled={loadingUnAssign}
            >
              Un assign
              {loadingUnAssign && (
                <Box ml={1} display="flex">
                  <CircularProgress size={20} />
                </Box>
              )}
            </Button>
          </Box>
        ) : null}

        <Box mt={2}>
          <Typography variant="h4" component="h4" fontSize={14} mb={1}>
            Status
          </Typography>
          {!loading ? (
            <TicketSelect handleComplete={handleComplete} ticket={ticket} />
          ) : null}
        </Box>
      </Grid>
    </Grid>
  );
};

export default Detail;
