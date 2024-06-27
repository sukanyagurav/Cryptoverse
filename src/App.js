import React from 'react'
import {Routes,Route,Link} from "react-router-dom"
import {Layout,Typography, Space} from 'antd'
import {Navbar,Exchanges,Homepage,Cryptocurrencies,News,CryptoDetails} from './components'
import './app.css';
import ErrorPage from './components/ErrorPage';

const App = () => {
  return (  
    <div className='app'>
        <div className="navbar">
            <Navbar/>
        </div>
        <div className="main">
          <Layout>
            <div className="routes">
              <Routes>
                <Route exact path='/' element={<Homepage/>} errorElement={<ErrorPage/>}>
      
                </Route>
                <Route  path='/exchanges' element={<Exchanges/>}>
          
                </Route>
                <Route  path='/cryptocurrencies' element={<Cryptocurrencies/>}>
                </Route>
                <Route  path='/crypto/:coinId' element={<CryptoDetails/>}>
                </Route>
                <Route  path='/news' element={<News/>}> 
                </Route>
              </Routes>
            </div>
          </Layout>
       
        <div className="footer"  >
          <Typography.Title level={5} style={{color:'white',texatAlign:'center'}}>
            Cryptoverse <br/>
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to='/'>Home</Link>
            <Link to='/exchanges'>Exchanges</Link>
            <Link to='/news'>News</Link>
          </Space>
        </div>
         </div>
    </div>
  )
}

export default App
