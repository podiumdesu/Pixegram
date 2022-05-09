import React from 'react'
import { Card } from 'antd'
const App = (props) => {
    const { title, style, loading, info } = props
    return (
        <Card
            title={
                <div className="flex items-center">{title}</div>
            }
            style={style ? style : {
                width: "100%",
                marginTop: 16,
                borderRadius: "1rem",
                overflow: "hidden"
            }}
            loading={loading}
        >
            {info}
        </Card>
    )
}

export default App