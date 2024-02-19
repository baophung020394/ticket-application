import { Ticket, User } from '@acme/shared-models';
import { Avatar, Box, Button, Grid, Typography } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTicket } from '../../../../apis/ticket';
import { getUser } from '../../../../apis/user';
import { FormDataAssign } from '../../../../constants/type.common';
import { getNameColor } from '../../../../helpers/common';
import {
  assignTicket,
  unAssignTicket,
} from '../../../../store/actions/ticketsActions';
import { useAppDispatch } from '../../../../store/store';
import styles from '../../tickets.module.css';
import stylesGlobal from '../../../app.module.css';
import TicketAssign from '../Forms/Assign';

const Detail = () => {
  const { id } = useParams();
  const [ticket, setTicket] = useState<Ticket>({} as Ticket);
  const [user, setUser] = useState<User>({} as User);
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

  /**
   * Submit assign user
   * @param data
   */
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
        <Box>
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
          <Box className={stylesGlobal['button']} onClick={onUnAssignUser}>
            <Button
              type="submit"
              variant="outlined"
              className={stylesGlobal['unassign']}
            >
              Un assign
            </Button>
          </Box>
        ) : null}
      </Grid>
    </Grid>
  );
};

export default Detail;
