import React from 'react'
import {Line,registerables} from 'react-chartjs-2'
import {Col,Row,Typography} from 'antd'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, } from 'chart.js';

ChartJS.register( CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend );

const {Title} = Typography
const LineChart = ({coinHisotry,currentPrice,coinName}) => {
    const coinPrice= []
    const coinTimestamps = []
    for (let i = 0; i < coinHisotry?.data?.history?.length; i++) {
        coinPrice.push(coinHisotry?.data?.history[i].price);
        coinTimestamps.push(new Date(coinHisotry?.data?.history[i].timestamp * 1000).toLocaleDateString());
        console.log(coinTimestamps[i])
      }
    

    const data = {
        labels: coinTimestamps,
        datasets: [
          {
            label: 'Price In USD',
            data: coinPrice,
            fill: false,
            backgroundColor: '#0071bd',
            borderColor: '#0071bd',
          },
        ],
      };
    
      const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };
  return (
  <>
    <Row className="chart-header">
        <Title level={2} className='chart-title'>
            {coinName} Price Chart
        </Title>
        <Col className='price-container'>
        <Title level={5} className="price-change">Change: {coinHisotry?.data?.change}%</Title>
        <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
    </Row>
    <Line data={data} options={options}/>    
  </>
  )
}

export default LineChart
