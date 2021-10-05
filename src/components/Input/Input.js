import React from 'react'
import './Input.scss'

const Input = (props) => {
    const { className = '', type = 'text', ...rest } = props
    return <input className={className + ' Input'} type={type} {...rest} />
}

export default Input
