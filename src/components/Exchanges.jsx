import React, { useEffect, useState } from 'react'
import millify from 'millify';
import { Collapse, Row, Col, Typography, Avatar } from 'antd';
import { useGetCryptoDetailsQuery, useGetCryptosQuery, useGetExchangesQuery } from '../services/cryptoApi';
import Loader from './Loader';

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
          console.log(data)
       setData(prevData=>[...prevData,...data?.coin])
      }
    for(let i=0;i<cryptosList?.data?.coins?.length;i++){
       fetchData(cryptosList?.data?.coins[i]?.uuid)
    } 
  },[cryptosList])
  console.log(coinData)

  if (isFetching) return <Loader />;
  return (
    <div>
      
    </div>
  )
}

export default Exchanges
