import { createSlice, PayloadAction } from 'redux-starter-kit';

export type Measurement = {
  metric: string;
  at: number;
  value: number;
  unit: string;
};

export type Data = {
  name: string;
  [key: string]: any;
  at: number;
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

const thirtyMinutesBefore = () => Date.now() - 30 * 60000;

const slice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
    singleMeasurementDataReceived: (state, action: PayloadAction<Measurement>) => {
      if (!action.payload) return;
      const newMeasure = action.payload;
      const { metric, at, value, unit } = newMeasure;
      const timeLimit = thirtyMinutesBefore();

      const units = [...state.units];

      const oldSeries = [...state.series].filter(time => time.at > timeLimit);
      const point = oldSeries.findIndex(time => time.at === at);

      if (point >= 0) {
        const newPoint = { [metric]: value };
        oldSeries[point] = { ...oldSeries[point], ...newPoint };
      } else {
        point && oldSeries.push({ name: new Date(at).toLocaleTimeString(), [metric]: value, at });
      }

      const newUnits = units.some(item => item.name === unit)
        ? units.map((item: Unit) =>
            item.name === unit
              ? item.metrics.some(name => name === metric)
                ? { ...item }
                : { name: unit, metrics: [...item.metrics, metric] }
              : { ...item },
          )
        : [...units, { name: unit, metrics: [metric] }];

      state.series = [...oldSeries];
      state.newMeasure = newMeasure;
      state.units = [...newUnits];
    },
    multipleMeasurementsDataReceived: (state, action: PayloadAction<MultipleMeasurementsAction[]>) => {
      if (!action.payload) return;
      const measurementsData = action.payload;
      const currentSeries = [...state.series];
      const units = [...state.units];
      const newMeasures = measurementsData.filter((measures: MultipleMeasurementsAction) => {
        const { metric } = measures;
        return currentSeries.some(serie => serie.hasOwnProperty(metric));
      });

      newMeasures.forEach(measure => {
        const { measurements } = measure;
        const { metric, unit } = measurements[0];
        const pointer = units.findIndex(oldUnit => oldUnit.name === unit);
        pointer >= 0
          ? !units[pointer].metrics.some(name => metric === name) && units[pointer].metrics.push(metric)
          : units.push({ name: unit, metrics: [metric] });

        measurements.forEach(x => {
          const { at, metric, value } = x;
          const index = currentSeries.findIndex(time => time.at === at);
          index >= 0
            ? (currentSeries[index] = { ...currentSeries[index], [metric]: value })
            : currentSeries.push({ name: new Date(at).toLocaleTimeString(), [metric]: value, at });
        });
      });

      state.units = [...units];
      state.series = [...currentSeries];
    },

    measurementsApiErrorReceived: (state, action: PayloadAction<ApiErrorAction>) => {
      return state;
    },
  },
});

export const reducer = slice.reducer;
export const actions = slice.actions;
