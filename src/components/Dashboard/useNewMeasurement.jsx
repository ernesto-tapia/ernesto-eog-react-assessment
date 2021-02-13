import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSubscription } from 'urql';

const newMeasure = `
subscription {
  newMeasurement {metric, at, value, unit}
}
`;

const useNewMeasurement = () => {
  const dispatch = useDispatch();
  const [newMeasurement, setLastMeasurement] = useState([]);
  const [subscriptionResponse] = useSubscription({ query: newMeasure });
  const { data: subscriptionData, error } = subscriptionResponse;

  useEffect(() => {
    if (error) {
      console.log(error);
    }
    if (!subscriptionData) return;
    console.log(subscriptionData);
    setLastMeasurement(subscriptionData);
  }, [subscriptionData, error, dispatch]);
  return [newMeasurement, error];
};

export default useNewMeasurement;
