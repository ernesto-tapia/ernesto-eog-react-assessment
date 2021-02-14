import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: Date;
  value: number;
  unit: string;
};

export type Data = {
  name: string;
  [key: string]: any;
  at: Date;
};

export type Unit = {
  name: string;
  metrics: string[];
};

type ApiErrorAction = {
  error: string;
};

type MultipleMeasurementsAction = {
  metric: string;
  measurements: Measurement[];
};

const initialState = Object.freeze({
  newMeasure: {},
  series: [] as Data[],
  error: {},
  units: [] as Unit[],
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
    multipleMeasurementsDataReceived: (state, action: PayloadAction<MultipleMeasurementsAction[]>) => {
      if (!action.payload) return;
      const measurementsData = action.payload;
      const currentSeries = [...state.series];
      const units = [...state.units];
      const newMeasures = measurementsData.filter((measures: MultipleMeasurementsAction) => {
        const { metric } = measures;
        return !currentSeries.some(serie => serie.hasOwnProperty(metric));
      });

      newMeasures.forEach(measure => {
        const { measurements: newMeasurements } = measure;
        const { metric, unit } = newMeasurements[0];
        const pointer = units.findIndex(oldUnit => oldUnit.name === unit);
        pointer >= 0
          ? !units[pointer].metrics.some(name => metric === name) && units[pointer].metrics.push(metric)
          : units.push({ name: unit, metrics: [metric] });

        newMeasurements.forEach(x => {
          const { at, metric, value } = x;
          const index = currentSeries.findIndex(time => time.at === at);
          index >= 0
            ? (currentSeries[index] = { ...currentSeries[index], [metric]: value })
            : currentSeries.push({ name: new Date(at).toLocaleTimeString(), [metric]: value, at });
        });
      });
      state.series = currentSeries;
      state.units = [...units];
    },

    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      return state;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
