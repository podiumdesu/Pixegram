import React, { useState } from 'react'
import { SearchOutlined } from '@ant-design/icons'
import { Menu, Dropdown } from 'antd'
import { useWeb3React } from '@web3-react/core'

const URL_ADDR = import.meta.env.VITE_APP_URL

import IconClip from '../../components/IconClip/index'
import { injected } from '../../utils/wallet/connector'

const App = (props) => {
    const { search } = props
    
    const { account, activate } = useWeb3React()

    const [searchValue, setSearchValue] = useState("")

    const handleChange = e => {
        setSearchValue(e.target.value)
    }
    
    const handleKey = e => {
        if (e.keyCode === 13) {
            search(searchValue)
        }
    }

    async function connect() {
        try {
            await activate(injected)
        } catch (ex) {
            console.log(ex)
        }
    }

    const menu = (
        <Menu >
            {
                !account ? (
                    <Menu.Item key="1" onClick={connect}>
                        <IconClip small icon="creditCard" text="Connect to your wallet" />
                    </Menu.Item>
                ) : (
                    <Menu.Item key="2">
                        <a rel="naopener noreferrer" href={`${URL_ADDR}/profile`}>
                            <IconClip small icon="fire" text="Check your profile info" />
                        </a>
                    </Menu.Item>
                )
            }
        </Menu>
    )
    return (
        <div className='flex h-14 items-center bg-white shadow fixed w-full z-50 '>
            <a style={{ color: "inherit" }} href={URL_ADDR}>
                <p className='font-bold text-lg leading-10 mt-0 ml-14 text-light-blue'>
                    Pixegram
                    <span className='font-medium text-sm ml-3 text-gray-700'>All in Web3!</span>
                </p>
            </a>
            <div className='ml-24 border-black w-50 h-10 rounded-sm items-center flex'>
                {
                    search ?
                        <div className='-ml-2 border-black w-50 h-10 rounded-sm items-center flex'>
                            <SearchOutlined className='w-10 mr-2' style={{ fontSize: "20px" }} />
                            <input
                                type="text"
                                maxLength="27"
                                size="100"
                                id="Validate"
                                name="Validate"
                                placeholder="Search for everything you are interested"
                                value={searchValue}
                                onChange={handleChange}
                                onKeyUp={handleKey}
                                style={{
                                    padding: "7px 11px",
                                    width: "600px",
                                    fontSize: "18px",
                                    fontFamily: "STFangSong"
                                }}
                            ></input>
                        </div>
                        : ""
                }
            </div>
            <div className='absolute right-60'>
                <div className='flex gap-8 items-center'>
                    <a className='text-base text-gray-400' href={`${URL_ADDR}/mint`}>Mint</a>
                    <a className='text-base text-gray-400' href={`${URL_ADDR}/draw`}>Draw</a>
                    <a className='text-base text-gray-400' href={`${URL_ADDR}/search`}>Market</a>
                    <Dropdown overlay={menu} placement="bottomLeft" arrow>
                        <div>
                            <IconClip icon="user" large />
                        </div>
                    </Dropdown>
                </div>
            </div>

        </div>
    )
}

export default App
