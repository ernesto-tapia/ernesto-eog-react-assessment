import React, { FunctionComponent } from 'react';
import { Colors } from '../../Features/SelectedMetrics/reducer';
import { Data, Unit } from '../../Features/Measurements/reducer';
import { ResponsiveContainer, LineChart, XAxis, YAxis, Tooltip, Legend, Line, Label } from 'recharts';

type ChartProps = {
  metrics: string[];
  colors: Colors;
  series: Data[];
  axes: Unit[];
};

const CustomChart: FunctionComponent<ChartProps> = ({ metrics, colors, series, axes }) => {
  function findAxisId(metric: string) {
    const foundMetric = axes.find(item => item.metrics.some(name => name === metric));
    return foundMetric ? foundMetric.name : '';
  }

  return (
    <ResponsiveContainer height={500}>
      <LineChart data={series} height={100}>
        <XAxis dataKey={'name'} />
        {axes.map((axis: Unit) => (
          <YAxis key={axis.name} yAxisId={axis.name}>
            <Label position="insideTopLeft">{axis.name}</Label>
          </YAxis>
        ))}
        <Tooltip isAnimationActive={false} />
        <Legend />
        {metrics.map((metric: string, key: number) => (
          <Line
            key={key}
            yAxisId={findAxisId(metric)}
            type="monotone"
            activeDot={false}
            dataKey={metric}
            isAnimationActive={false}
            stroke={colors[metric]}
            dot={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );
};

export default CustomChart;
