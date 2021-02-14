import React, { useState, useEffect } from 'react';
import { useQuery } from 'urql';
import { Card, CardContent, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CustomChips from './CustomChips';

const query = `{getMetrics}`;

const texts = Object.freeze({
  HEADER: 'Available metrics:',
  LOADING: 'Looking for metrics',
});
const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
  },
  grid: {
    paddingTop: '1%',
    margin: '1%',
    width: '100%',
  },
  container: {
    width: '100%',
    alignContent: 'center',
  },
  buttons: {
    height: '100%',
  },
}));

export default (props: { setSelections: any; selectedMetrics: any }) => {
  const { setSelections, selectedMetrics } = props;
  const [metrics, setMetrics] = useState([] as string[]);
  const classes = useStyles();
  const [result] = useQuery({
    query,
    variables: {},
  });
  const { fetching, data, error } = result;

  useEffect(() => {
    if (!data) return;
    const { getMetrics } = data;
    setMetrics(getMetrics);
  }, [data]);

  if (fetching) return <LinearProgress />;
  if (error) return <Typography variant="h2">{error.message}</Typography>;
  return (
    <div className={classes.container}>
      <Card>
        <Grid container direction="row" spacing={1} className={classes.grid}>
          <Grid item>
            <Typography variant="h3">{texts.HEADER}</Typography>
          </Grid>
        </Grid>
        <Divider />
        <CardContent>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignContent="center"
            alignItems="center"
            spacing={1}
            className={classes.grid}
          >
            <CustomChips metrics={metrics} setSelections={setSelections} selectedMetrics={selectedMetrics} />
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
