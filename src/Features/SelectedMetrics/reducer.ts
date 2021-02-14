import { createSlice, PayloadAction } from 'redux-starter-kit';

type Names = string[];

type ApiErrorAction = {
  error: string;
};

const initialState = Object.freeze({
  names: [] as Names,
  error: {},
});

const slice = createSlice({
  name: 'selectedMetrics',
  initialState,
  reducers: {
    selectedMetricsReceived: (state, action: PayloadAction<Names>) => {
      const names = action.payload;
      return (state = { ...state, names: [...names] });
    },
    metricsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      return (state = { ...state, error: action.payload });
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
