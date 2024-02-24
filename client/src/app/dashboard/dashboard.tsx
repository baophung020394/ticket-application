import { Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Chart from '../common/Chart';
import ChartUsers from '../common/Chart/ChartUser';

export function Dashboard() {
  const { tickets } = useSelector((state: RootState) => state.tickets);
  const { users } = useSelector((state: RootState) => state.users);

  const incompleteCount = tickets.filter((ticket) => !ticket.completed).length;
  const completeCount = tickets.filter((ticket) => ticket.completed).length;

  return (
    <Grid container pt={2} pb={2} height="100%" spacing={2}>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Chart
          incomplete={incompleteCount}
          complete={completeCount}
          labels={['Complete', 'Incomplete']}
        />
      </Grid>
      <Grid
        item
        xs={12}
        md={6}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <ChartUsers tickets={tickets} users={users} />
      </Grid>
    </Grid>
  );
}

export default Dashboard;
