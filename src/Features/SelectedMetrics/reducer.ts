import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Colors = {
  [key: string]: string;
};

type MetricsList = {
  metrics: string[];
};

type ApiErrorAction = {
  error: string;
};

const initialState = Object.freeze({
  names: [] as string[],
  colors: {} as Colors,
  error: {},
});

function getRandomColor() {
  const hexUnits = '0123456789ABCD';
  const hex = '#';
  const color = [...Array(6)].map(x => hexUnits[Math.floor(Math.random() * 14)]);
  return `${hex}${color.join('')}`;
}

const slice = createSlice({
  name: 'selectedMetrics',
  initialState,
  reducers: {
    selectedMetricsReceived: (state, action: PayloadAction<string[]>) => {
      const names = action.payload;
      return { ...state, names: [...names] };
    },
    colorsDataReceived: (state, action: PayloadAction<MetricsList>) => {
      const { metrics } = action.payload;
      const colors = Object.fromEntries(metrics.map(metric => [metric, getRandomColor()]));
      return { ...state, colors };
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      return (state = { ...state, error: action.payload });
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
