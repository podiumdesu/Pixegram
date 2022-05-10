import React, { useState, useEffect } from 'react'
import { useMetaMask } from 'metamask-react'
import { Button } from 'antd'

import 'web3/dist/web3.min.js'
import './App.css'

import randomNum from './utils/getRandom'
import getHotItemsIdx from './utils/getHotItems'
import formatData from './utils/formatData'

import { initContract } from './contracts/index'

import Banner from './layout/Banner/index'
import Footer from './layout/Footer/index'

import NftCard from './components/NftCard/index'
import TextBanner from './components/TextBanner/index'

const URL_ADDR = import.meta.env.VITE_APP_URL

const App = () => {

  const { status, connect, account, chainId, ethereum, library } = useMetaMask()

  const [allNftList, setAllNftList] = useState([])
  const [showNftList, setShowNftList] = useState([])
  const [hotNftList, setHotNftList] = useState([])
  const [bannerNft, setBannerNft] = useState({})


  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(async () => {

    if (status === "connected") {
      setValue(account);
    }

    if (allNftList == false) {

      const allNftData = await initContract.getAllInfo()
      setAllNftList(true)
      const formatedData = await Promise.all(allNftData.map(async i => await formatData(i)))
      setAllNftList(formatedData)
      const allLength = formatedData.length
      const randomIdx = randomNum(allLength, 7)
      const selectedOne = randomIdx.pop()
      setBannerNft(formatedData[selectedOne])
      const randomList = []
      randomIdx.map(i => {
        randomList.push(formatedData[i])
      })
      setShowNftList(randomList)
      const getHotItems = getHotItemsIdx(formatedData, 6)
      setHotNftList(getHotItems)

    }
  })

  return (
    <div className='mb-20 overflow-hidden'>
      <Banner />
      <div className="relative mt-10">
        <div
          style={{
            backgroundImage: `url(${allNftList != false ? bannerNft.picCover : 'https://lh3.googleusercontent.com/FyEaMEZpwgCr99PzAg6ArHo-E2kgSwa1KMH0xRvBeCsrBfYF2kIDV7Eob6zJelGlXCQvyKf2rnpEM_8jccVkKhdeEMYmF-f4bRNWI-8=s250'})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            height: "500px",
            opacity: "0.3",
            WebkitMask: "linear-gradient(rgb(255, 255, 255), transparent)",
            filter: "blur(8px)"
          }}>
        </div>
        <div className="absolute top-32 left-60">
          <p className="font-bold text-3xl mb-10">Draw and sell your own unique NFTs</p>
          <p className="text-lg w-3/5">Pixegram, An educational platform where users are put into a simulation of an NFT market, with the nuances of modern trends.</p>
          <div className='mt-20'>
            <Button type="primary" size="large" shape="round" href={`${URL_ADDR}/search`}>Traverse</Button>
            <Button className="ml-4" size="large" type="default" shape="round" href={`${URL_ADDR}/new`}>Mint</Button>
          </div>
        </div>
        <div className="absolute right-60 top-20">
          {Object.values(bannerNft) != false ? <NftCard info={bannerNft} showAll={true} /> : ""}
        </div>

      </div>

      <div className="mt-10"></div>
      <TextBanner title="Market Onsales"></TextBanner>
      <div className="mx-52 flex flex-wrap items-center justify-evenly">
        {
          showNftList.map((i, idx) => (
            <NftCard info={i} key={idx} />
          ))
        }
      </div>
      <div className="mt-10"></div>
      {
        allNftList != false ? (
          <div>
            <TextBanner title="Popular Trends"></TextBanner>
            <div className="mx-52 grid grid-cols-1 place-items-center">
              {
                hotNftList.map((i, idx) => (
                  <NftCard info={allNftList[i.idx]} key={idx} idx={idx} showSmall />
                ))
              }
            </div>
          </div>
        ) : ("")
      }
      <Footer mt="24" />
    </div>
  )
}

export default App
