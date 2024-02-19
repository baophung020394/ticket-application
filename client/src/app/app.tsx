import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { fetchTickets } from '../store/actions/ticketsActions';
import { fetchUsers } from '../store/actions/usersActions';
import { setLoadingGlobal } from '../store/reducers/common';
import { useAppDispatch } from '../store/store';
import styles from './app.module.css';
import Tickets from './tickets/tickets';
import Detail from './tickets/components/Detail';
import Header from './common/Header';
import { Container } from '@mui/material';

const App = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTickets());
    dispatch(setLoadingGlobal(true));
  }, [dispatch]);

  return (
    <div className={styles['app']}>
      <Header />
      <Container maxWidth="xl">
        <Routes>
          <Route path="/" element={<Tickets />} />
          {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
          <Route path="/tickets/:id" element={<Detail />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
