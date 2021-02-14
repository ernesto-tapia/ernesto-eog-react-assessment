import React, { useEffect } from 'react';
import { getSelectedMetrics, getColors } from '../../Features/SelectedMetrics/selector';
import { getSeries } from '../../Features/Measurements/selector';
import { useQuery } from 'urql';
import { useDispatch, useSelector } from 'react-redux';
import { actions, Unit } from '../../Features/Measurements/reducer';
import CustomChart from './CustomChart';

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
  const { series, units } = useSelector(getSeries);
  const colors = useSelector(getColors);

  const axes = units.filter((unit: Unit) =>
    unit.metrics.some(name => selectedMetrics.some((metricName: string) => metricName === name)),
  );

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

  const { fetching, data, error } = result;
  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived({ error: error.message }));
      return;
    }
    if (!data) return;
    const { getMultipleMeasurements } = data;
    dispatch(actions.multipleMeasurementsDataReceived(getMultipleMeasurements));
  }, [data, error, dispatch]);

  if (series.length > 0 && !fetching)
    return <CustomChart metrics={selectedMetrics} colors={colors} series={series} axes={axes} />;
  return <div />;
};
