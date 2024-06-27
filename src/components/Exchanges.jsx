import React, { useEffect, useState } from 'react'
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetCryptoDetailsQuery, useGetCryptosQuery, useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';
import HTMLReactParser from 'html-react-parser/lib/index';

const { Text } = Typography;
const { Panel } = Collapse;
const Exchanges = () => {
  let count=12
  const [coinData,setData] = useState([])
  const {data:cryptosList,isFetching,isError} = useGetCryptosQuery(count)

  useEffect(()=>{

    async function fetchData(coinId){

      const res =await fetch( `https://coinranking1.p.rapidapi.com/coin/${coinId}?timePeriod=24h`,{
          method: 'GET',
          headers: {
            'x-rapidapi-key': process.env.REACT_APP_COINS_API_KEY,
            'x-rapidapi-host': process.env.REACT_APP_COINS_HOST
          }
        })
        const data= await res.json()
        
       setData(prevData=>[...prevData,{...data?.data?.coin}])
      }
    for(let i=0;i<cryptosList?.data?.coins?.length;i++){
       fetchData(cryptosList?.data?.coins[i]?.uuid)
    } 
  },[cryptosList])

  if (isFetching) return <Loader />;
  return (
    <>
    <Row>
      <Col span={6}>Exchanges</Col>
      <Col span={6}>24h Trade Volume</Col>
      <Col span={6}>Markets</Col>
      <Col span={6}>Change</Col>
    </Row>
    <Row style={{marginTop:'2rem'}}>
      {coinData.sort((a,b)=>(a.rank) - (b.rank)).map((exchange) => (
        <Col span={24}>
          <Collapse>
            <Panel
              key={exchange?.uuid}
              showArrow={false}
              header={(
                <Row key={exchange?.uuid}>
                  <Col span={6}>
                    <Text><strong>{exchange?.rank}.</strong></Text>
                    <Avatar className="exchange-image" src={exchange?.iconUrl} />
                    <Text><strong>{exchange?.name}</strong></Text>
                  </Col>
                  <Col span={6}>${millify(exchange['24hVolume'])}</Col>
                  <Col span={6}>{millify(exchange?.numberOfMarkets)}</Col>
                  <Col span={6}>{millify(exchange?.change)}%</Col>
                </Row>
                )}
            >
              {HTMLReactParser(exchange?.description || '')}
            </Panel>
          </Collapse>
        </Col>
      ))}
    </Row>
  </>
  )
}

export default Exchanges
