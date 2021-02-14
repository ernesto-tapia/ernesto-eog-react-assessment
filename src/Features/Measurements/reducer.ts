import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: Date;
  value: number;
  unit: string;
};

type ApiErrorAction = {
  error: string;
};

const initialState = Object.freeze({
  newMeasure: {},
  error: {},
});

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    singleMeasurementDataReceived: (state, action: PayloadAction<Measurement>) => {
      if (!action.payload) return;
      const newMeasure = action.payload;
      state = { ...state, newMeasure };
      return state;
    },
    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      return state;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
