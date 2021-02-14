import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { getSelectedMetrics } from '../../Features/SelectedMetrics/selector';
import { useSelector } from 'react-redux';
import MetricCard from './MetricCard';
const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: '100%',
      height: '100%',
    },
  },
}));

export default () => {
  const classes = useStyles();
  const selectedMetrics = useSelector(getSelectedMetrics);

  if (selectedMetrics.length === 0) return <div />;
  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid container item spacing={1} xs={12}>
          {selectedMetrics.map((metric: string) => (
            <Grid item xs={3} key={metric}>
              <MetricCard key={metric} metric={metric} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </div>
  );
};
