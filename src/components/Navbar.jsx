import React from 'react'
import {useState,useEffect} from 'react'
import { Button,Typography,Menu ,Avatar  } from "antd";
import {Link} from 'react-router-dom'
import {HomeOutlined,MoneyCollectOutlined,BulbOutlined,FundOutlined,MenuOutlined} from '@ant-design/icons'
import icon from '../images/cryptocurrency.png'



const Navbar = () => { 
    const [hamburger,setHamburger] = useState(false)
  return (
    <div className='nav-container'>
        <div className="logo-container">
            <Avatar src={icon} size="large"/>
            <Typography.Title level={2} className='logo'>
                <Link to='/'>Cryptoverse</Link>
            </Typography.Title>
          

        </div>
        <Menu theme='dark' className='desktop'>
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined/>}>
                <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined/>}>
                <Link to='/exchanges'>Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined/>}>
                <Link to='/news'>News</Link>
            </Menu.Item>
        </Menu>
        <Button className="menu-control-container" onClick={()=>setHamburger(!hamburger)}>
                <MenuOutlined/>
            </Button>
        {hamburger && (
            <>
            <div className="backdrop" onClick={()=>setHamburger(false)}></div>
            <Menu theme='dark' className='mobile'>
            <Menu.Item icon={<HomeOutlined/>}>
                <Link to='/'>Home</Link>
            </Menu.Item>
            <Menu.Item icon={<FundOutlined/>}>
                <Link to='/cryptocurrencies'>Cryptocurrencies</Link>
            </Menu.Item>
            <Menu.Item icon={<MoneyCollectOutlined/>}>
                <Link to='/exchanges'>Exchanges</Link>
            </Menu.Item>
            <Menu.Item icon={<BulbOutlined/>}>
                <Link to='/news'>News</Link>
            </Menu.Item>
        </Menu>
            </>
           
        )}
       
    </div>
  )
}

export default Navbar
