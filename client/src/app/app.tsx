import { Box, Container, Grid } from '@mui/material';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';
import { MenuList } from '../constants/data.common';
import { fetchTickets } from '../store/actions/ticketsActions';
import { fetchUsers } from '../store/actions/usersActions';
import { openMenu, setLoadingGlobal } from '../store/reducers/common';
import { RootState, useAppDispatch } from '../store/store';
import styles from './app.module.css';
import Header from './common/Header';
import MenuSidebar from './common/Sidebar/Menu';
import Dashboard from './dashboard/dashboard';
import Detail from './tickets/components/Detail';
import Tickets from './tickets/tickets';
import stylesGlobal from './app.module.css';

const App = () => {
  const dispatch = useAppDispatch();
  const { loadingMenu } = useSelector((state: RootState) => state.commons);

  useEffect(() => {
    dispatch(fetchUsers());
    dispatch(fetchTickets());
    dispatch(setLoadingGlobal(true));
  }, [dispatch]);

  return (
    <div className={styles['app']}>
      <Grid container flexDirection="row" height={'100%'}>
        <Box
          className={`${stylesGlobal['menu']} ${
            loadingMenu ? stylesGlobal['active'] : ''
          }`}
        >
          <MenuSidebar options={MenuList} />
        </Box>
        {loadingMenu && (
          <div
            className={stylesGlobal['layer']}
            onClick={() => dispatch(openMenu(false))}
          ></div>
        )}
        <Box flex={1}>
          <Header />
          <Container maxWidth="xl">
            <Routes>
              <Route path="/" element={<Tickets />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Hint: Try `npx nx g component TicketDetails --project=client --no-export` to generate this component  */}
              <Route path="/tickets/:id" element={<Detail />} />
            </Routes>
          </Container>
        </Box>
      </Grid>
    </div>
  );
};

export default App;
