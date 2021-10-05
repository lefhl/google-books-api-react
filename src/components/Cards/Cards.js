import React from 'react'
import Container from '../Container/Container'
import Card from '../Card/Card'
import booksStore from '../../store/booksStore'
import { observer } from 'mobx-react-lite'
import { toJS } from 'mobx'
import Button from '../Button/Button'
import { fetchMoreBooks } from '../../http/googleBooksAPI'
import './Cards.scss'
import Spinner from '../Spinner/Spinner'

const Cards = observer(() => {
    const books = toJS(booksStore.books)

    const getMoreBooks = async () => {
        try {
            booksStore.setIsFetching(true)
            const { items, totalItems } = await fetchMoreBooks()
            booksStore.setErrorOnRequest('')
            booksStore.setMoreBooks(items).setTotalBooksOnQuery(totalItems)
        } catch (err) {
            booksStore.setErrorOnRequest(err.message)
        } finally {
            booksStore.setIsFetching(false)
        }
    }

    return (
        <>
            <Container>
                {books && books.length ? (
                    <div className='Cards'>
                        <h3>
                            Найдено книг по запросу:{' '}
                            {booksStore.totalBooksOnQuery}
                        </h3>
                        <div className='Cards__grid'>
                            {/* Гугл возвращает результаты с дубликатам, порой 5+. Фильтровать при каждой подгрузке, вероятно, не лучшая идея, а добавление к id индекса позволяет получить уникальный ключ. Использовать только индекс, как понимаю, плохая практика
                             */}
                            {books && books.length
                                ? books.map((book, i) => (
                                      <Card key={book.id + i} book={book} />
                                  ))
                                : ''}
                        </div>
                        <h4>На странице: {books.length}</h4>
                        {booksStore.totalBooksOnQuery >
                            booksStore.books.length &&
                            !booksStore.isFetching &&
                            !booksStore.errorOnRequest && (
                                <Button
                                    onClick={getMoreBooks}
                                    className='Cards__load-btn'
                                >
                                    Загрузить ещё
                                </Button>
                            )}
                        {booksStore.errorOnRequest}
                    </div>
                ) : (
                    <h2>Ничего не найдено</h2>
                )}
                {booksStore.isFetching && <Spinner />}
            </Container>
        </>
    )
})

export default Cards
