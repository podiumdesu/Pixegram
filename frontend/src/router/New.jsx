import React, { useState } from 'react'

import PixelCanvas from '../components/PixelCanvas/index'
import Banner from '../layout/Banner'

const New = () => {
    return (
        <div className="mb-20 overflow-hidden">
            <div>
                <Banner />
            </div>
            <div className="mt-20 mx-60 grid ">
                {/* TODO: DONT REST MORE!!!!!! YOU NEED TO FINISH THE DAILY LOTTERY :( */}
                
                {/* <div className="border border-black rounded">
                    <p className="text-center my-4 text-lg">Daily Lottery</p>
                    <div className="">
                        TO DO
                    </div>
                    <div>
                        get interesting 
                    </div>
                </div> */}
                <div className="border mt-20">
                    {/* When can you finish it, Babe? */}
                    <p className="text-center my-4 text-lg">Pixel Editor</p>
                    <PixelCanvas />
                </div>
            </div>

        </div>
    )
}

export default New