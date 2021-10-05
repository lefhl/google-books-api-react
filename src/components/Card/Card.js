import React from 'react'
import './Card.scss'
import bookPlaceholder from '../../assets/book.png'
import { Link } from 'react-router-dom'

const Card = (props) => {
    const book = props.book

    // Функция для вывода первых 3-х авторов через запятую
    // На некоторые запросы выводится 70+ авторов (например, сборники рассказов), что не совсем презентабельно и информативно
    const renderAuthors = function (authors) {
        const authorsHTML = []
        const limit = 3
        for (let i = 0; i < authors.length; i++) {
            authorsHTML.push(`${authors[i]}`)
            if (i === limit) return authorsHTML.join(', ')
        }
        return authorsHTML.join(', ')
    }

    return (
        <Link
            to={{
                pathname: `/book/${book.id}}`,
                state: book,
            }}
            className='Card'
        >
            <div className='Card__image-wrap'>
                <img
                    src={
                        book.volumeInfo.imageLinks
                            ? book.volumeInfo.imageLinks.thumbnail
                            : bookPlaceholder
                    }
                    className='Card__image'
                    alt=''
                />
            </div>
            <p className='Card__meta'>
                {book.volumeInfo.categories && book.volumeInfo.categories[0]}
            </p>
            <h3 className='Card__title'>{book.volumeInfo.title}</h3>
            {book.volumeInfo.authors && (
                <p className='Card__meta'>
                    {renderAuthors(book.volumeInfo.authors)}
                </p>
            )}
        </Link>
    )
}

export default Card
