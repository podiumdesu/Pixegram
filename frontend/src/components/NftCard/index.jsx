import React from 'react'

import {
    HeartTwoTone,
    SmileTwoTone
} from '@ant-design/icons'

const address = import.meta.env.VITE_APP_URL

const NftCard = (props) => {
    const { info, width, showAll, showSmall, idx } = props
    const {
        id,
        nftName,
        intro,
        owner,
        type,
        likeNum,
        colNum,
        picCover
    } = info
    return (
        <div>
            <a style={{color: "inherit"}} href={`${address}/detail/${id}`}>
            {
                showSmall ? (
                    <div className='border-b w-96 rounded-xl border-little-gray hover:shadow-sm-card hover:bg-light-blue transition duration-300 ease-in-out'>
                        <div className='flex justify-left items-center py-4 px-4'>
                            <p className='w-10 m-0'>{idx+1}</p>
                            <img className="w-16 h-16 mr-5 rounded-full" src={picCover} alt="" />
                            <div>
                                <div className='flex mb-1'>
                                    <p className='w-12 m-0 -mr-2 inline-block'>#{id}</p>
                                    <p className='w-44 inline-block line-clamp-1 m-0 overflow-hidden'>{nftName}</p>
                                </div>
                                <HeartTwoTone twoToneColor="#eb2f96" style={{ fontSize: '18px', paddingTop: "-3px"}}/><p className='m-0 ml-2 mr-10 align-middle inline-block pt-1'>{likeNum}</p>
                                <SmileTwoTone style={{ fontSize: '18px', paddingTop: "-3px"}}/> <p className='m-0 mr-3 align-middle inline-block pt-1'>{colNum}</p>
                            </div>

                        </div>
                    </div>
                ) : (
                    <div className='w-80 flex flex-wrap justify-center hover:shadow-md transition duration-300 ease-in-out'
                        style={{
                            border: "1px solid rgb(229, 232, 235)",
                            borderRadius: "10px",
                            overflow: "hidden",
                            marginBottom: showAll ? "0" : "40px"
                        }}
                    >
                        {
                            showAll
                                ? (
                                    <div
                                        className='h-60 w-80'
                                        style={{
                                            backgroundImage: `url(${picCover})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center center"
                                        }}>
                                    </div>
                                )
                                : (
                                    <div
                                        className='h-48 w-80'
                                        style={{
                                            backgroundImage: `url(${picCover})`,
                                            backgroundSize: "cover",
                                            backgroundPosition: "center center"
                                        }}>
                                    </div>
                                )
                        }
                        <div className='h-36 relative w-full'>
                            <p className='absolute text-sm left-4 top-6 '>#{id}</p>
                            <p className='absolute text-sm right-5 top-6 italic'>{type}</p>
                            <div className='text-base leading-8 w-full text-center mt-4 flex justify-center items-center mb-4'>
                                {
                                    nftName.length > 11 ?
                                        (
                                            <p
                                                className='w-1/2 leading-7 line-clamp-1 m-0 overflow-hidden'
                                                style={{
                                                    borderBottom: "2px solid rgba(59, 130, 246, 1)"
                                                }}
                                            >
                                                {nftName}
                                            </p>
                                        )
                                        :
                                        (
                                            <span
                                                className='leading-7'
                                                style={{
                                                    display: "inline-block",
                                                    borderBottom: "2px solid rgba(59, 130, 246, 1)"
                                                }}
                                            >
                                                {nftName}
                                            </span>
                                        )
                                }
                            </div>
                            <p className='w-full px-4 mt-3 text-center m-0 line-clamp-3 overflow-hidden'>{intro}</p>
                        </div>

                    </div>
                )
            }
            </a>
        </div>

    )
}

export default NftCard