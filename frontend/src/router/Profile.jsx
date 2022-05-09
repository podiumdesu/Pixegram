import React, { useState, useEffect } from 'react'
import axios from 'axios'

import Banner from '../layout/Banner/index'

import { Menu } from 'antd';

import { Routes, Route, Link, useParams } from 'react-router-dom'

import serverConfig from '../../server.config'
const server = serverConfig.server
const { checkMine } = serverConfig.interface

import { useWeb3React } from '@web3-react/core'
import { injected } from '../utils/wallet/connector'

import DisplayAssets from '../components/DisplayAssets/index'
import IconClip from '../components/IconClip/index'

const App = () => {
    const { active, account, library, connector, activate, deactivate } = useWeb3React()
    const [current, setCurrent] = useState("all")
    const [displayList, setDisplayList] = useState([])
    const [reqFlag, setReqFlag] = useState(false)
    const { getAddress } = useParams()
    const address = getAddress ? getAddress : "342532324"

    const handleClick = e => {
        setCurrent(e.key)
        const parameter = {
            address: "0xe65526243b6141d98edb1ffe00055212",
            onSale: (e.key == "onSale" ? true : false)
        }
        if (e.key == "all") delete parameter.onSale
        axios.post(`${server}${checkMine}`, parameter)
            .then(res => {
                setDisplayList(res.data)
                console.log(res.data)
                // setNftList(res.data)
            })
    }

    useEffect(() => {
        if (!account) {
            try {
                activate(injected)
            } catch (ex) {
                console.log(ex)
            }
        }
        // TODO Add promise
        if (!reqFlag) {
            axios.post(`${server}${checkMine}`, {
                address: "0xe65526243b6141d98edb1ffe00055212"
            })
                .then(res => {
                    setReqFlag(true)
                    setDisplayList(res.data)
                })
        }
    })
    const clickMenu = e => {
        console.log(e.key)
    }
    return (
        <div>
            <div className='overflow-hidden'>
                <Banner />
                {account ? (
                    <div>
                        <div className='my-16 grid place-items-center'>
                            <div className='my-20 grid place-items-center'>
                                <IconClip icon="" text={`钱包地址：${account}`} />
                            </div>
                            <Menu onClick={handleClick} selectedKeys={[current]} mode="horizontal">
                                <Menu.Item key="all" onClick={clickMenu}>
                                    <Link to={`all/${address}`}>
                                        <IconClip icon="block" small smallGap text="已拥有" />
                                    </Link>
                                </Menu.Item>
                                <Menu.Item key="onSale" onClick={clickMenu}>
                                    <Link to={`onSale/${address}`}>
                                        <IconClip icon="shopCart" small smallGap text="已上架" />
                                    </Link>
                                </Menu.Item>
                            </Menu>
                        </div>
                        <div className='px-1/8'>
                            <Routes>
                                <Route index exact element={<DisplayAssets status="all" list={displayList} />}></Route>
                                <Route index path="all/:id" exact element={<DisplayAssets status="all" list={displayList} />}></Route>
                                <Route path="onSale/:id" element={<DisplayAssets status="onSale" list={displayList} />}></Route>
                            </Routes>
                        </div>
                    </div>

                ) : (
                    <div className='mt-20'>
                        {/* <Button onClick={connect}>点击登录</Button> */}
                    </div>)}
            </div>
        </div>
    )
}

export default App