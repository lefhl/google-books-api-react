import React from 'react'
import './Container.scss'

const Container = (props) => {
    const { children, className = '' } = props
    return <div className={'Container ' + className}>{children}</div>
}

export default Container
