import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getNewMeasurement } from '../../Features/Measurements/selector';
import { Measurement } from '../../Features/Measurements/reducer';
import { Card, CardHeader, CardContent, Typography, makeStyles } from '@material-ui/core';

const initialState = Object.freeze({} as Measurement);

const useStyles = makeStyles(() => ({
  root: {
    height: '100%',
    maxWidth: '100%',
    maxHeight: '100%',
  },
}));

export default (props: { metric: string }) => {
  const newMeasurement = useSelector(getNewMeasurement);
  const [lastMeasure, setLastMeasure] = useState(initialState);
  const { metric } = props;
  const { unit = 'loading', value = 0 } = lastMeasure;
  const classes = useStyles();
  if (!newMeasurement) return <div />;

  useEffect(() => {
    if (newMeasurement.metric === metric) {
      setLastMeasure(newMeasurement);
    }
  }, [newMeasurement, metric]);
  return (
    <Card className={classes.root}>
      <CardHeader title={metric} />
      <CardContent>
        <Typography variant="h4" color="textSecondary" component="p">
          {`${value} ${unit}`}
        </Typography>
      </CardContent>
    </Card>
  );
};
