import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Buffer } from 'buffer'
import { Web3Provider } from "@ethersproject/providers"
import { MetaMaskProvider } from "metamask-react"
import { Web3ReactProvider } from "@web3-react/core";

import 'antd/dist/antd.css';
import './index.css'

import App from './App'
import Search from './router/searchNft'
import NftDetail from './router/NftDetail'
import Profile from './router/Profile'
import New from './router/New'
import Mint from './router/Mint'

window.Buffer = Buffer

const getLibrary = (provider) => {
  const library = new Web3Provider(provider);
  library.pollingInterval = 12000;
  return library;
}

const IndexProvider = () => {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <MetaMaskProvider>
        <Router>
          <Routes>
            <Route path="/" exact element={<App />}></Route>
            <Route path="search" exact element={<Search />}></Route>
            <Route path={`detail/:nftId`} element={<NftDetail />}></Route>
            <Route path={`profile/*`} element={<Profile />}></Route>
            <Route path="draw" exact element={<New />}></Route>
            <Route path="mint" exact element={<Mint />}></Route>
          </Routes>
        </Router>
      </MetaMaskProvider>
    </Web3ReactProvider>
  )
}
ReactDOM.render(
  <IndexProvider />
  ,
  document.getElementById('root')
)
