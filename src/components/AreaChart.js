import React, { Component } from 'react';
import data from './data';
import data2 from './data2';
import Chart from 'react-google-charts';

class AreaChart extends Component {
   constructor() {
      super();
      this.data = data;
      this.recovered = data2;
   }

   render() {
      return (
         <Chart
            width={'100%'}
            height={'100%'}
            chartType="AreaChart"
            loader={<div>Loading Chart</div>}
            data={this.props.red ? this.data : this.recovered}
            options={{
               colors: this.props.red ? ['#ff4b4b'] : ['#71fd71'],
               title: 'Active Cases',
               hAxis: { title: 'Year', titleTextStyle: { color: '#333' } },
               vAxis: {
                  minValue: 0,
                  gridlines: {
                     color: 'transparent',
                  },
               },
               // For the legend to fit, we make the chart area smaller
               chartArea: {
                  width: '100%',
                  height: '100%',
                  backgroundColor: '#2c303b',
               },
               // lineWidth: 25
            }}
            // For tests
            rootProps={{ 'data-testid': '1' }}
         />
      );
   }
}

export default AreaChart;
