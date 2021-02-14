import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNewMeasurement } from '../../Features/Measurements/selector';
import { Measurement } from '../../Features/Measurements/reducer';
import { Card, CardHeader, CardContent, Paper, Typography, makeStyles } from '@material-ui/core';

const initialState = Object.freeze({} as Measurement);

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
  paperBackground: (props: { color: string }) => ({
    width: '100%',
    height: 2,
    backgroundColor: props.color,
  }),
}));

export default (props: { metric: string; color: string }) => {
  const newMeasurement = useSelector(getNewMeasurement);
  const [lastMeasure, setLastMeasure] = useState(initialState);
  const { metric, color } = props;
  const { unit = 'loading', value = 0 } = lastMeasure;
  const classes = useStyles({ color });
  if (!newMeasurement) return <div />;

  useEffect(() => {
    if (newMeasurement.metric === metric) {
      setLastMeasure(newMeasurement);
    }
  }, [newMeasurement, metric]);
  return (
    <Card className={classes.root}>
      <CardHeader title={metric} />
      <Paper className={classes.paperBackground} elevation={1} />
      <CardContent>
        <Typography variant="h4" color="textSecondary" component="p">
          {`${value} ${unit}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
