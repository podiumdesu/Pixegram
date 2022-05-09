import React from 'react' 

const App = (props) => {
    const { title } = props
    return (
        <p className='font-fangsong text-2xl my-8 font-black text-center'>{title}</p>
    )
}

export default App