import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import useNewMeasurement from './useNewMeasurement';
import MetricSelection from './MetricSelection';
import MetricsUI from './MetricsUI';

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
  useNewMeasurement();

  return (
    <div className={classes.root}>
      <MetricSelection />
      <Paper elevation={1}>
        <MetricsUI />
      </Paper>
    </div>
  );
};
