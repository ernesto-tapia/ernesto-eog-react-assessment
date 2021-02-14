import React, { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import MetricSelection from './MetricsUI';
import { useSelector } from 'react-redux';
import { getSelectedMetrics } from '../../Features/SelectedMetrics/selector';
import useNewMeasurement from './useNewMeasurement';
import { actions } from '../../Features/SelectedMetrics/reducer';

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
  const dispatch = useDispatch();
  const selectedMetrics = useSelector(getSelectedMetrics);
  const setSelections = useCallback(
    (metrics: string[]) => dispatch({ type: actions.selectedMetricsReceived, payload: metrics }),
    [dispatch],
  );

  return (
    <div className={classes.root}>
      <Paper elevation={1}>
        <MetricSelection setSelections={setSelections} selectedMetrics={selectedMetrics} />
      </Paper>
    </div>
  );
};
