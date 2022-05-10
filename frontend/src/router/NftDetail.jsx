import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import axios from 'axios'
import { Collapse, Modal } from 'antd';
const { Panel } = Collapse

import { initContract } from '../contracts/index'

// import Custom Components
import CusCard from '../components/ShowCard/index'
import IconClip from '../components/IconClip/index'
import PriceInfo from '../components/PriceInfo/index'
import { useMetaMask } from 'metamask-react'


import Footer from '../layout/Footer'
import Banner from '../layout/Banner'

const paddingWing = "1/8"

const borderStyle = 'border rounded-xl border-little-gray'
const borderHoverStyle = 'hover:shadow-sm-card hover:bg-light-blue transition duration-300 ease-in-out'


const App = (props) => {
    const { account } = useMetaMask()

    const { nftId } = useParams()
    const [ownerFlag, setOwnerFlag] = useState(false)
    const [nft, setNftInfo] = useState({})
    const [loading, setLoading] = useState(true)
    const [isModalVisible, setIsModalVisible] = useState(false);

    const clickPic = () => {
        setIsModalVisible(true);
    };

    const handleOk = () => {
        setIsModalVisible(false);
    };

    const handleCancel = () => {
        setIsModalVisible(false);
    };

    useEffect(async () => {
        if (!nft.id) {
            const onChainData = await initContract.getTargetInfo(nftId)

            setLoading(false)

            const tokenIPFSInfo = (await axios.get(`https://ipfs.infura.io/ipfs/${onChainData.tokenURI}`)).data

            const info = { ...tokenIPFSInfo }

            // resolve the data
            info.id = parseInt(onChainData.id, 16)
            info.likeNum = parseInt(onChainData.currentInfo.likeNum, 16)
            info.colNum = 0

            if (onChainData.owner.toLowerCase() == account) setOwnerFlag(true)
            info.createTime = parseInt(onChainData.createTime, 16) * 1000
            info.intro = tokenIPFSInfo.intro
            info.type = tokenIPFSInfo.type

            setNftInfo(info)
        }

    })

    return (
        <div className="min-w-200 overflow-hidden">
            <Banner />
            <div className='mt-14 overflow-hidden'>
                <div
                    style={{
                        backgroundImage: `url(${nft.id ? nft.picCover : 'https://lh3.googleusercontent.com/FyEaMEZpwgCr99PzAg6ArHo-E2kgSwa1KMH0xRvBeCsrBfYF2kIDV7Eob6zJelGlXCQvyKf2rnpEM_8jccVkKhdeEMYmF-f4bRNWI-8=s250'})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center center",
                        height: "600px",
                        opacity: "0.15",
                        WebkitMask: "linear-gradient(rgb(255, 255, 255), transparent)",
                        filter: "blur(14px)",
                        position: "absolute",
                        width: "100%",
                        minWidth: "50rem"
                    }}
                />
            </div>
            <div className={`flex flex-wrap justify-center mx-${paddingWing} my-20 min-w-200 relative gap-10`}>

                <div className="w-1/5 min-w-100">
                    <div
                        onClick={clickPic}
                        className={`h-100 w-full bg-white overflow-hidden rounded-lg ${borderStyle} ${borderHoverStyle}`}
                        style={{
                            backgroundImage: `url(${nft.picCover})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center center"
                        }}>
                        <div className="rounded w-10 h-10" >
                            <p className="text-center py-2 text-light-blue w-10 h-10">#{nft.id}</p>
                        </div>
                    </div>
                    <CusCard
                        title={<IconClip icon="info" text="Introduction" />}
                        info={
                            <>
                                <p className="mb-3" >{nft.intro}</p>
                                <div className='flex items-center gap-10'>
                                    {
                                        nft.outLink ?
                                            <IconClip
                                                icon="link"
                                                text={<a style={{ color: "inherit" }} href={nft.outLink}>外部链接</a>}
                                            />
                                            : ""
                                    }

                                </div>

                            </>
                        }
                        loading={loading}
                    />
                    <CusCard
                        title={<IconClip icon="clock" text="Created Time" />}
                        info={`${nft.createTime ? nft.createTime : new Date()}`}
                        loading={loading}
                    />
                </div>

                <div className="w-2/5 min-w-100 relative">
                    <p className="text-2xl font-fangsong mb-4">{nft.nftName}</p>
                    <div className='flex'>
                        <a>{nft.owner}</a>
                    </div>
                    <div className="flex mt-4 flex-wrap justify-start gap-7">
                        <IconClip icon="crown" text={nft.type} />
                        <IconClip icon="star" text={`${nft.colNum} Collected`} />
                        <IconClip icon="heart" text={`${nft.likeNum} Likes`} />
                    </div>
                    <CusCard
                        title={<IconClip icon="safe" text="Special Name" />}
                        info={
                            <p>{nft.name}</p>
                        }
                    />
                    <CusCard
                        title={<IconClip icon="money" text="售价信息" />}
                        loading={loading}
                        info={
                            <PriceInfo nft={nft} ownerFlag={ownerFlag} />
                        }
                    />
                    <Collapse
                        style={{
                            marginTop: "2rem",
                            background: "rgba(255,255,255,0.4)",
                        }}
                        collapsible="header" defaultActiveKey={['1']}>
                        <Panel header="Transaction History" key="1">
                            {/* TODO: ADD TRANSACTION HISTORY */}
                            <p>Currently None History :)</p>
                        </Panel>
                    </Collapse>
                </div>
            </div>
            <Footer padding={paddingWing} />
            <Modal
                title=""
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
                centered
            >
                <div className='flex justify-center h-full'>
                    <img className="h-full" src={nft.picCover} alt="nft image" />
                </div>
            </Modal>
        </div>
    )
}

export default App