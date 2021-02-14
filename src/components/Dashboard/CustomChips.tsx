import React from 'react';
import { Grid, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  grid: {
    paddingTop: '1%',
    margin: '1%',
    width: '100%',
  },
}));

export default (props: { metrics: string[]; setSelections: any; selectedMetrics: any }) => {
  const classes = useStyles();
  const { metrics, setSelections, selectedMetrics } = props;

  const addMetric = (name: string) => {
    switch (selectedMetrics.length) {
      case 0:
        setSelections([...selectedMetrics, name]);
        break;
      default:
        if (selectedMetrics.some((selectionName: string) => selectionName === name)) {
          const newSelection = selectedMetrics.filter((selectionName: string) => selectionName !== name);
          setSelections(newSelection);
        } else {
          setSelections([...selectedMetrics, name]);
        }
    }
  };

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignContent="center"
      alignItems="center"
      spacing={1}
      className={classes.grid}
    >
      {metrics.map((metricName: string, index: number) => (
        <Grid item xs={2} key={index}>
          <Grid container justify="center">
            {selectedMetrics.some((name: string) => name === metricName) ? (
              <Chip
                variant="outlined"
                color="primary"
                key={index}
                label={metricName}
                onClick={() => addMetric(metricName)}
                onDelete={() => addMetric(metricName)}
              />
            ) : (
              <Chip key={index} label={metricName} onClick={() => addMetric(metricName)} />
            )}
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};
