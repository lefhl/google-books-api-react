import React, { useEffect } from 'react'
import { useState } from 'react/cjs/react.development'
import './ScrollUpButton.scss'

const ScrollUpButton = ({ showBelow }) => {
    const [isShowed, setIsShowed] = useState(false)

    const handleScroll = () => {
        if (window.pageYOffset > showBelow) {
            if (!isShowed) setIsShowed(true)
        } else {
            if (isShowed) setIsShowed(false)
        }
    }

    useEffect(() => {
        if (!showBelow) return
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <>
            {isShowed && (
                <button
                    type='button'
                    className='ScrollUpButton'
                    onClick={handleClick}
                ></button>
            )}
        </>
    )
}

export default ScrollUpButton
