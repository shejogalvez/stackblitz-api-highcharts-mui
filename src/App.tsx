import React, { FC } from 'react';

import NavBar from './navbar';

import { Box } from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useState, useEffect } from 'react';

export const App: FC<{ name: string }> = ({ name }) => {
  const [options, setOptions] = useState(null);

  useEffect(() => {
    getDataFromApi();
  }, []);

  const getDataFromApi = async () => {
    await fetch(
      'https://mockly.app/api/38534cce-0c18-4043-94a6-21b0ae62f48a/speed'
    )
      .then((response) => response.json())
      .then((res) => {
        let data = res[0];
        let scale = 10e3;
        let xOffset = data.data[0][0];
        console.log(data);
        setOptions({
          // se asume que el primer valor de un elemento en la tabla datos es un valor de tiempo
          xAxis: {
            title: {
              text: `time (in units/${scale}) starting from ${xOffset / scale}`,
            },
            categories: data.data.map(
              (x: number[]) => (x[0] - xOffset) / scale
            ),
          },
          yAxis: {
            title: {
              text: 'velocity',
            },
          },
          chart: {
            type: 'scatter',
          },
          plotOptions: {
            series: {
              color: 'cyan',
            },
          },
          title: {
            text: data.name,
          },
          series: [
            {
              data: data.data.map((x: number[]) => x[1]),
            },
          ],
        });
      })
      .catch((error) => console.error(error));
  };

  const changeColor = (newColor: string) => {
    setOptions({
      ...options,
      plotOptions: {
        series: {
          color: newColor,
        },
      },
    });
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <NavBar title={name} setColor={changeColor} />
      <HighchartsReact highcharts={Highcharts} options={options} />
    </Box>
  );
};
