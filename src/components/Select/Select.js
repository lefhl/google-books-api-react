import React from 'react'
import './Select.scss'

const Select = (props) => {
    const { children, className = '', ...rest } = props
    return (
        <div className={className + ' Select'} {...rest}>
            {children}
        </div>
    )
}

export default Select
