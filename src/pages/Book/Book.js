import React from 'react'
import Container from '../../components/Container/Container'
import './Book.scss'
import SearchForm from '../../components/SearchForm/SearchForm'

const Book = (props) => {
    const info = props.location.state.volumeInfo
    const image = info ? info.imageLinks?.thumbnail : ''
    const { title, authors, description, categories } = info
    const authorsHTML = authors?.join(', ')
    const categoriesHTML = categories?.join('/')
    return (
        <>
            <SearchForm />
            <Container>
                <div className='Book'>
                    <div className='Book__image'>
                        <img src={image} alt='' />
                    </div>
                    <div>
                        <div>{categoriesHTML}</div>
                        <h1>{title}</h1>
                        <div>{authorsHTML}</div>
                        <div>{description}</div>
                    </div>
                </div>
            </Container>
        </>
    )
}

export default Book
