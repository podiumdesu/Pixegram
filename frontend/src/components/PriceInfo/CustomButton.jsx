import React from 'react'

import { Button } from 'antd'
import IconClip from '../IconClip/index'

const CustomButton = (props) => {
    const btnStyle = {
        background: "rgba(59, 130, 246, 1)",
        width: "40%",
        display: "flex",
        justifyContent: "center",
        height: "2.5rem",
        alignItems: "center"
    }
    const { icon, text, style, type, shape, iconStyle, onClick } = props

    const iconDefaultStyle = {
        fontSize: "20px"
    }
    return (
        <Button
            type={type ? type : "primary"}
            shape={shape ? shape : "round"}
            style={style ? style : btnStyle}
            onClick={onClick}
        >
            <IconClip
                iconStyle={iconStyle ? iconStyle : iconDefaultStyle}
                icon={icon}
                text={text}
            />
        </Button>
    )
}

export default CustomButton