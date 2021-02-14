import React, { useCallback } from 'react';
import { Button, ButtonGroup } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { actions } from '../../Features/SelectedMetrics/reducer';

const texts = Object.freeze({
  SELECT: 'Select all',
  REMOVE: 'Remove all',
});

const initialState = [] as string[];

export default (props: { metrics: string[] }) => {
  const { metrics } = props;
  const dispatch = useDispatch();
  const setSelections = useCallback(
    (metrics: string[]) => dispatch({ type: actions.selectedMetricsReceived, payload: metrics }),
    [dispatch],
  );

  function unselectAllOptions() {
    setSelections(initialState);
  }

  function selectAllOptions() {
    setSelections([...metrics]);
  }
  return (
    <ButtonGroup color="primary" aria-label="outlined primary button group">
      <Button onClick={() => selectAllOptions()}>{texts.SELECT}</Button>
      <Button onClick={() => unselectAllOptions()}>{texts.REMOVE}</Button>
    </ButtonGroup>
  );
};
