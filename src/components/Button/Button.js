import React from 'react'
import './Button.scss'

const Button = (props) => {
    const { children, className = '', ...rest } = props
    return (
        <button type='button' className={className + ' Button'} {...rest}>
            {children}
        </button>
    )
}

export default Button
