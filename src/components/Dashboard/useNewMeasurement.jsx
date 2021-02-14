import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';
import { actions } from '../../Features/Measurements/reducer';

const newMeasure = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

const useNewMeasurement = () => {
  const dispatch = useDispatch();
  const [subscriptionResponse] = useSubscription({ query: newMeasure });
  const { data: subscriptionData, error } = subscriptionResponse;

  useEffect(() => {
    if (error) {
      dispatch(actions.measurementsApiErrorReceived(error));
    }
    if (!subscriptionData) return;
    const { newMeasurement } = subscriptionData;
    dispatch(actions.singleMeasurementDataReceived(newMeasurement));
  }, [subscriptionData, error, dispatch]);
};

export default useNewMeasurement;
