import React, { useEffect, useState } from 'react'
import axios from 'axios'

import { Layout, Collapse, Radio, Spin, Result } from 'antd';

const { Content, Sider } = Layout;
const { Panel } = Collapse;

import Banner from '../layout/Banner/index'

import {
    CaretRightOutlined
} from '@ant-design/icons';

import NftCard from '../components/NftCard/index'

import { initContract } from '../contracts/index'
import formatData from '../utils/formatData'

const radioGroupSty = {
    background: "rgb(251, 253, 255)",
    padding: ".5rem .5rem",
    display: "inline-grid",
    gridTemplateColumns: "repeat(auto-fill, 100px)",
    justifyContent: "space-evenly",
    alignContent: "space-evenly",
    flexWrap: "wrap",
    minHeight: "100px"
}

const App = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [searchedList, setSearchedList] = useState([])
    const [size, setSize] = useState("large")
    const [leftMargin, setLeftMargin] = useState(270)
    const [inSearch, setInSearch] = useState(false)
    const [firstLoad, setFirstLoad] = useState(true)
    const toggle = () => {
        setCollapsed(!collapsed)
        const margin = !collapsed ? 80 : 270
        setLeftMargin(margin)
    }

    const searchText = val => {
        setInSearch(true)

    }

    const handleSizeChange = e => {
        setInSearch(true)
        const value = e.target.value.split(":")
        const k = value[0]
        const v = value[1]
        const info = {}
        info[k] = (v == "true" ? true : v)
    };

    useEffect(async () => {
        if (firstLoad) {
            setFirstLoad(false)
            setInSearch(true)
            const allNftData = await initContract.getAllInfo()
            const formatedData = await Promise.all(allNftData.map(async i => await formatData(i)))
            setSearchedList(formatedData)
            setInSearch(false)
        }

    })

    return (
        <div>
            <Banner search={searchText} />
            <Layout style={{ minHeight: '100vh' }}>
                <Sider className="mt-14"
                    collapsible collapsed={collapsed} onCollapse={toggle}
                    width={270}
                    style={{
                        background: "#fff",
                        zIndex: "1",
                        overflow: 'auto',
                        height: '100vh',
                        position: 'fixed',
                        left: 0,
                        borderRight: "1px solid rgb(229, 232, 235)",
                    }}
                >

                    {
                        collapsed ? ("") : (
                            <Collapse
                                defaultActiveKey={['1','2']}
                                ghost
                                expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
                            >
                                <Panel header="Types(Not finished)" key="1"
                                    className='font-fangsong'
                                    style={{
                                        fontSize: "18px",
                                        textAlign: "center",
                                        borderBottom: "1px solid rgb(229, 232, 235)"
                                    }}
                                >
                                    <Radio.Group
                                        className='px-10 py-4 my-0 w-full flex-wrap'
                                        value={size}
                                        onChange={handleSizeChange}
                                        style={radioGroupSty}
                                    >
                                        <Radio.Button style={{marginBottom: "5px"}} value="type:image">Anime</Radio.Button>
                                        <Radio.Button value="type:movie">Cute</Radio.Button>
                                        <Radio.Button style={{marginBottom: "5px"}} value="type:paper">Forest</Radio.Button>
                                        <Radio.Button value="type:music">image</Radio.Button>
                                        <Radio.Button style={{marginBottom: "5px"}} value="type:data">Course</Radio.Button>
                                    </Radio.Group>
                                </Panel>
                            </Collapse>
                        )
                    }

                </Sider>
                <Layout className="site-layout mt-14" style={{ marginLeft: leftMargin }}>
                    <Content className="min-h-screen" style={{ margin: '0 0px', background: "white" }}>
                        {
                            inSearch ? (
                                <div className='mt-20 grid place-items-center'>
                                    <Spin size="large" />
                                    <p className='text-blue-500 mt-6 text-sm'>Pixegram is finding.</p>
                                </div>
                            ) :
                                (
                                    searchedList != false ? (
                                        <div>
                                            <p className='leading-10 mt-4 -mb-1 ml-14'>
                                                We found&nbsp;
                                                <span style={{
                                                    borderBottom: "1px solid rgb(59, 130, 246) "
                                                }}>
                                                    {searchedList.length}
                                                </span>
                                                &nbsp;tokens</p>
                                            <div className="grid grid-cols-3 grid-flow-row gap-4 place-items-center" style={{ padding: 24, minHeight: "100%", background: "#fff" }}>
                                                {
                                                    searchedList.map((i, idx) => (
                                                        <NftCard info={i} key={idx} />
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    ) : (
                                        <Result
                                            className='mt-32'
                                            status="404"
                                            title="NOT FOUND"
                                            subTitle="Not found anything in PIXEGRAM"
                                        />
                                    )
                                )
                        }
                    </Content>
                </Layout>
            </Layout>

        </div>
    )
}

export default App
