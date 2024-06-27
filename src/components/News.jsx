import React, { useEffect, useState } from 'react'
import {Select,Typography,Row,Col,Avatar,Card, Button} from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNews';
import { useGetCryptosQuery } from '../services/cryptoApi';
import { Option } from 'antd/es/mentions';
import Loader from './Loader';
const demoImage = 'https://www.bing.com/th?id=OVFT.mpzuVZnv8dwIMRfQGPbOPC&pid=News';

const {Text,Title} = Typography;
const {Options} = Select
const News = ({simplified}) => {
  const [page,setPage] =useState(1)
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency');
  const { data } = useGetCryptosQuery(100);
  const [cryptoNews,setCryptoNews] = useState([])

  const {data:cryptoNewsData , isFetching} = useGetCryptoNewsQuery({newsCategory,page:page})
  
  function handlePrev(){
    if(page !== 1){
        setPage(page=>page - 1)
    }
}
function handleNext(){
    if(page <= cryptoNewsData?.totalPages){
        setPage(page=>page + 1)
    }
}

 if(isFetching) return <Loader/>
  return (
    <Row gutter={[24,24]}>
      {!simplified && (
        <Col span={24}>
          <Select
            showSearch
            className="select-news"
            placeholder="Select a Crypto"
            optionFilterProp="children"
            onChange={(value) => { setPage(1)
             setNewsCategory(value)}}
            filterOption={(input, option) => option?.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            <Select.Option value="Cryptocurrency">Cryptocurrency</Select.Option>
            {data?.data?.coins?.map((currency) => <Select.Option value={currency.name} key={currency?.name}>{currency.name}</Select.Option>)}
          </Select>
        </Col>
      )}
      {cryptoNewsData?.data.length === 0 && <span>No news found</span>}
        {cryptoNewsData?.data.length > 0  && cryptoNewsData?.data?.map((news,i)=>(
          <Col xs={24} sm={12} lg={8} key={i}>
              <Card hoverable className='news-card'>
                <a href={news.url} target="_blank" rel="noreferrer">
                  <div className='news-image-container'>
                      <Title className="news-title" level={4}>{news?.title.length > 70 ? `${news?.title.substring(0,70)}...` : news?.title}</Title>
                      <img src={news?.thumbnail || demoImage} alt="news" style={{width:'80px',height:'80px'}}/>
                  </div>
                  <p >
                    {news?.excerpt.length > 120 ? `${news?.excerpt.substring(0,120)}...` : news?.excerpt}
                  </p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news?.publisher?.favicon || demoImage} alt="news provider"/>
                      <Text className='provider-name'>{news?.publisher?.name || 'Unknown'}</Text>
                    </div>
                    <Text>{moment(news?.date).startOf("ss").fromNow()}</Text>
                  </div>
                </a>
              </Card>
          </Col>
        ))}
       {!simplified && <Col  span={24} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Button onClick={handlePrev} disabled={page === 1}>
               Prev
            </Button>
             <span style={{padding:'0.5rem'}}>
                {page} of {cryptoNewsData?.totalPages}
            </span>
           <Button onClick={handleNext} disabled={page==cryptoNewsData?.totalPages}>
             Next
          </Button>
        </Col>
       }
    </Row>
   
  )
}

export default News
