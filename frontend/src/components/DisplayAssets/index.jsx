import React from 'react'
import { Empty } from 'antd'
import NftCard from '../../components/NftCard/index'

const App = (props) => {
    const { status, list } = props

    return (
        <div className='grid grid-flow-col place-items-center'>
            {
                list.map((i, idx) => (
                    <NftCard info={i} key={idx} />
                ))
            }
            {
                ((list == false) & (status == "onSale")) ? (
                    <Empty
                        image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                        imageStyle={{
                            height: 200,
                            margin: 20
                        }}
                        description={
                            <p>
                                Not on sale now.
                            </p>
                        }
                    >
                    </Empty>
                ) : ""
            }
        </div>
    )
}

export default App