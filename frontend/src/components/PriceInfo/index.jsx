import React from 'react'

import IconClip from '../IconClip/index'
import CustomModal from './CustomModal'

const App = (props) => {
    const { nft, ownerFlag } = props
    const modalDownCb = (e) => {
        // Not delete here
        // May use this callback function in refactoring
    }

    const modalUpCb = (e) => {

    }

    const onSaleInfo = (
        <>
            <div className="text-lg flex items-center mb-3">
                <IconClip icon="shopCart" />
                <span className='text-xl'>&nbsp;{nft.price} PEM</span>
                <span className='text-xs ml-4'>(${(nft.price / 6.3).toFixed(2)})</span>
            </div>
        </>
    )

    return (
        <div>
            {
                ownerFlag ? (
                    nft.onSale ? (
                        // Own this asset and it is on sale already
                        <>
                            {onSaleInfo}
                            <CustomModal id={nft.id} callback={modalDownCb}/>
                        </>
                    ) : (
                        // own this asset but it is not on sale
                        <div>
                            <p className='mb-4'>Click the button to HIT THE STORE!</p>
                            <CustomModal id={nft.id} saleFlag callback={modalUpCb}/>
                        </div>
                    )
                ) : (
                    nft.onSale ?
                        // DONOT own this asset and it is on sale
                        <div>
                            {onSaleInfo}
                        </div>
                        : (
                        // DONOT own this asset and it is not on sale
                            <p>Sorry, not on sale now. You can collect it in your cart!</p>
                        )
                )
            }
        </div>
    )
}


export default App