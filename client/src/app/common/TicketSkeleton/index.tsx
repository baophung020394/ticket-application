import React from 'react';
import { Card, CardActions, CardContent, Grid, Skeleton } from '@mui/material';

const TicketItemSkeleton: React.FC = () => {
  return (
    <Grid container spacing={4}>
      {Array.from({ length: 4 })?.map((_, index: number) => (
        <Grid item xs={12} md={6} lg={3} key={index}>
          <Card>
            <CardContent>
              <Skeleton
                animation="wave"
                height={10}
                style={{ marginBottom: 6 }}
              />

              <Skeleton animation="wave" height={10} width="80%" />
            </CardContent>
            <CardActions>
              <Skeleton animation="wave" height={24} width={64} />
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default TicketItemSkeleton;
