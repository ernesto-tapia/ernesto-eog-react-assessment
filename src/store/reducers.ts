import { reducer as weatherReducer } from '../Features/Weather/reducer';
import { reducer as measurementsReducer } from '../Features/Measurements/reducer';
import { reducer as selectedMetricsReducer } from '../Features/SelectedMetrics/reducer';
export default {
  weather: weatherReducer,
  measurements: measurementsReducer,
  selectedMetrics: selectedMetricsReducer,
};
