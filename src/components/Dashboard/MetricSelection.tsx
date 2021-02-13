import React, { useState, useEffect } from 'react';
import { Provider, createClient, useQuery } from 'urql';
import { Card, CardContent, Chip, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';

const client = createClient({
  url: 'https://react.eogresources.com/graphql',
});

const query = `{getMetrics}`;

const initialSelectionsState: string[] = [];

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

export default () => {
  return (
    <Provider value={client}>
      <Metrics />
    </Provider>
  );
};

const Metrics = () => {
  const [metrics, setMetrics] = useState([]);
  const classes = useStyles();
  const [result] = useQuery({
    query,
    variables: {},
  });
  const { fetching, data, error } = result;
  const dispatch = useDispatch();

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
            {metrics.map((metricName: string, index: number) => (
              <Grid item xs={2} key={index}>
                <Grid container justify="center">
                  <Chip color="primary" key={index} label={metricName} />
                </Grid>
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
