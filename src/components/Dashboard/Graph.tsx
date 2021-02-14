import React, { useEffect } from 'react';
import { getSelectedMetrics } from '../../Features/SelectedMetrics/selector';
import { getSeries } from '../../Features/Measurements/selector';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../Features/Measurements/reducer';
const query = `
query($input: [MeasurementQuery]) {
  getMultipleMeasurements(input: $input) {
    metric
    measurements {
      at
      value
      metric
      unit
    }
  }
}
`;

const thirtyMinutesBefore = () => Date.now() - 30 * 60000;
const timeLimit = thirtyMinutesBefore();

export default () => {
  const dispatch = useDispatch();
  const selectedMetrics = useSelector(getSelectedMetrics);
  const series = useSelector(getSeries);

  const input = selectedMetrics.map((metricName: string) => ({
    metricName,
    after: timeLimit,
  }));

  const [result] = useQuery({
    query,
    variables: {
      input,
    },
  });

  const { data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.multipleMeasurementsDataReceived(getMultipleMeasurements));
  }, [data, error, dispatch]);

  return <div />;
};
