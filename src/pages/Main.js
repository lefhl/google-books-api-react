import React from 'react'
import Cards from '../components/Cards/Cards'
import ScrollUpButton from '../components/ScrollUpButton/ScrollUpButton'
import SearchForm from '../components/SearchForm/SearchForm'

const Main = () => {
    return (
        <>
            <SearchForm />
            <Cards />
            <ScrollUpButton showBelow={300} />
        </>
    )
}

export default Main
