import React from 'react'

import {
    HeartOutlined,
    StarOutlined,
    CrownOutlined,
    MoneyCollectOutlined,
    InfoCircleOutlined,
    ClockCircleOutlined,
    ShoppingCartOutlined,
    GiftOutlined,
    LockOutlined,
    UnlockOutlined,
    LinkOutlined,
    SafetyCertificateOutlined,
    FireOutlined,
    UserOutlined,
    BlockOutlined,
    AccountBookOutlined,
    EyeInvisibleOutlined,
    CreditCardOutlined
} from '@ant-design/icons'

const App = (props) => {
    const { icon, text, iconStyle, textClass, small, large, smallGap } = props
    const iconDefaultStyle = iconStyle ? iconStyle : (
        small ? {
            fontSize: '16px',
            color: '#08c'
        } : (
            large ? {
                fontSize: '24px',
                color: '#08c'
            } : {
                fontSize: '20px',
                color: '#08c'
            }
        )
    )
    const iconList = {
        heart: <HeartOutlined style={iconDefaultStyle}/>,
        star: <StarOutlined style={iconDefaultStyle}/>,
        crown: <CrownOutlined style={iconDefaultStyle}/>,
        money: <MoneyCollectOutlined style={iconDefaultStyle} />,
        info: <InfoCircleOutlined style={iconDefaultStyle} />,
        clock: <ClockCircleOutlined style={iconDefaultStyle} />,
        shopCart: <ShoppingCartOutlined style={iconDefaultStyle} />,
        gift: <GiftOutlined style={iconDefaultStyle} />,
        lock: <LockOutlined style={iconDefaultStyle}/>,
        unlock: <UnlockOutlined style={iconDefaultStyle}/>,
        link: <LinkOutlined style={iconDefaultStyle}/>,
        safe: <SafetyCertificateOutlined style={iconDefaultStyle}/>,
        fire: <FireOutlined style={iconDefaultStyle}/>,
        user: <UserOutlined style={iconDefaultStyle} />,
        block: <BlockOutlined style={iconDefaultStyle}/>,
        accountBook: <AccountBookOutlined style={iconDefaultStyle}/>,
        invisible: <EyeInvisibleOutlined style={iconDefaultStyle}/>,
        creditCard: <CreditCardOutlined style={iconDefaultStyle}/>,
    }
    return (
        <p className='flex items-center mb-0'>
            {iconList[icon] ? iconList[icon] : <></>}
            {text ? (
                smallGap ? 
                    ""
                : <>&nbsp;</>
            ) : ""}
            <span className={textClass}>{text}</span>
        </p>
    )
}

export default App