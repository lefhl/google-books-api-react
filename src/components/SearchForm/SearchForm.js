import React from 'react'
import Form from '../Form/Form'
import './SearchForm.scss'

const SearchForm = () => {
    return (
        <div className='SearchForm'>
            <h1 className='SearchForm__title'>Поиск книг</h1>
            <Form />
        </div>
    )
}

export default SearchForm
