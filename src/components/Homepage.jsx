import React from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import { Typography,Row,Col,Statistic } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import {Cryptocurrencies,News} from '../components'
import Loader from './Loader'

const {Title} = Typography

const Homepage = () => {

  const {data,isFetching,isError} = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats 
  if(isFetching){
    return <Loader/>
  }
  if(isError){
    return <Title>Please try again after sometime!</Title>
  }
  return (
   <>
    <Title level={2} className='heading'>
        Global Crypto Stats
    </Title>
    <Row>
        <Col span={12}>
            <Statistic value={globalStats?.total} title="Total Cryptocurrencies"/>
        </Col>
        <Col span={12}>
            <Statistic value={millify(globalStats?.totalExchanges)} title="Total Exchanges"/>
        </Col>
        <Col span={12}>
            <Statistic value={millify(globalStats?.totalMarketCap)} title="Total Market Cap"/>
        </Col>
        <Col span={12}>
            <Statistic value={millify(globalStats?.total24hVolume)} title="Total 24th Volume"/>
        </Col>
        <Col span={12}>
            <Statistic value={millify(globalStats?.totalMarkets)} title="Total Markets"/>
        </Col>
    </Row>
    <div className="home-heading-container">
        <Title level={2} className='home-title'>
            Top 10 Cryptocurrencies in the world
        </Title>
        <Title level={3} className='show-more'>
            <Link to='/cryptocurrencies'>Show More</Link>
        </Title>
    </div>
    <Cryptocurrencies simplified/>
    <div className="home-heading-container">
        <Title level={2} className='home-title'>
            Latest Crypto News
        </Title>
        <Title level={3} className='show-more'>
            <Link to='/news'>Show More</Link>
        </Title>
    </div>
    <News simplified/>
   </>
  )
}

export default Homepage
