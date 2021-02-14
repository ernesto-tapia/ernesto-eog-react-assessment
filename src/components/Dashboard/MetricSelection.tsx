import React, { useState, useEffect, useCallback } from 'react';
import { useQuery } from 'urql';
import { Card, CardContent, Divider, Grid, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import CustomChips from './CustomChips';
import { actions } from '../../Features/SelectedMetrics/reducer';
import { useDispatch } from 'react-redux';
import CustomButtonGroup from './CustomButtonGroup';

const query = `{getMetrics}`;

const texts = Object.freeze({
  HEADER: 'Available metrics:',
});

const initialState = [] as string[];

const useStyles = makeStyles(() => ({
  root: {
    alignItems: 'center',
  },
  grid: {
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
  const [metrics, setMetrics] = useState(initialState);
  const classes = useStyles();
  const dispatch = useDispatch();
  const [result] = useQuery({
    query,
    variables: {},
  });
  const { fetching, data, error } = result;

  const setMetricColors = useCallback(
    (metrics: string[]) => dispatch({ type: actions.colorsDataReceived, payload: { metrics } }),
    [dispatch],
  );

  useEffect(() => {
    if (!data) return;
    const { getMetrics } = data;
    setMetrics(getMetrics);
    setMetricColors(getMetrics);
  }, [data, setMetricColors]);

  if (fetching) return <LinearProgress />;
  if (error) return <Typography variant="h4">{error.message}</Typography>;
  return (
    <div className={classes.container}>
      <Card>
        <Grid container direction="row" spacing={1} className={classes.grid}>
          <Grid item xs={8}>
            <Typography variant="h4">{texts.HEADER}</Typography>
          </Grid>
          <Grid item xs={4}>
            <Grid container justify="center" alignItems="center" alignContent="center" className={classes.buttons}>
              <CustomButtonGroup metrics={metrics} />
            </Grid>
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
            <CustomChips metrics={metrics} />
          </Grid>
        </CardContent>
      </Card>
    </div>
  );
};
