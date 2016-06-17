import React from 'react';
import { VictoryLine, VictoryChart, VictoryAxis } from 'victory';

function Graph() {
  const data = [
    { x: 0, y: 10 },
    { x: 1, y: 30 },
    { x: 2, y: 20 },
    { x: 3, y: 40 },
    { x: 4, y: 30 },
    { x: 5, y: 50 },
  ];
  const interpolation = 'natural';
  return (
    <VictoryChart>
      <VictoryAxis dependentAxis label="y-axis" />
      <VictoryAxis label="x-axis" />
      <VictoryLine
        interpolation={interpolation}
        data={data}
        label={interpolation}
      />
      <VictoryLine
        data={data}
        style={{
          data: {
            stroke: '#822722',
          },
        }}
      />
    </VictoryChart>
  );
}

export default Graph;
