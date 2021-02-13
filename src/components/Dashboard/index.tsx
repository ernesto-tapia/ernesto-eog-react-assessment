import React from 'react';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelection from './MetricSelection';
import useNewMeasurement from './useNewMeasurement';

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
  const [newMeasurement, error] = useNewMeasurement();
  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <MetricSelection />
      </Paper>
    </div>
  );
};
