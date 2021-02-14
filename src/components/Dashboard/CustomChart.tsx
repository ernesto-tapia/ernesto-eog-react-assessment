import React, { FunctionComponent } from 'react';
import { Colors } from '../../Features/SelectedMetrics/reducer';
import { Data } from '../../Features/Measurements/reducer';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';

type ChartProps = {
  metrics: string[];
  colors: Colors;
  series: Data[];
};

const CustomChart: FunctionComponent<ChartProps> = ({ metrics, colors, series }) => {
  return (
    <ResponsiveContainer height={500}>
      <LineChart data={series} height={100}>
        <XAxis dataKey={'name'} />
        <YAxis />
        <Tooltip />
        <Legend />
        {metrics.map((metric: string, key: number) => (
          <Line key={key} type="monotone" activeDot={false} dataKey={metric} stroke={colors[metric]} dot={false} />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
