import React, { useEffect, useRef, useState } from 'react'
import Button from '../Button/Button'
import Input from '../Input/Input'
import './Form.scss'
import SearchImg from '../../assets/search.svg'
import Select from '../Select/Select'
import { observer } from 'mobx-react-lite'
import booksStore from '../../store/booksStore'
import { fetchBooks } from '../../http/googleBooksAPI'
import { toJS } from 'mobx'
import { useHistory, useLocation } from 'react-router-dom'

const Form = observer(() => {
    const categories = toJS(booksStore.categories)
    const filters = toJS(booksStore.sortingTypes)
    const history = useHistory()
    const { pathname } = useLocation()

    const categoriesRef = useRef()
    const filtersRef = useRef()

    const [isCategoryOpen, setIsCategoryOpen] = useState(false)
    const [isFilterOpen, setIsFilterOpen] = useState(false)

    useEffect(() => {
        const checkIsClickOutside = (e) => {
            if (
                isCategoryOpen &&
                categoriesRef.current &&
                !categoriesRef.current.contains(e.target)
            ) {
                setIsCategoryOpen(false)
            }
            if (
                isFilterOpen &&
                filtersRef.current &&
                !filtersRef.current.contains(e.target)
            ) {
                setIsFilterOpen(false)
            }
        }

        document.addEventListener('click', checkIsClickOutside)

        return () => {
            document.removeEventListener('click', checkIsClickOutside)
        }
    }, [isCategoryOpen, isFilterOpen])

    async function getBooks() {
        try {
            booksStore.setIsFetching(true)
            const { items, totalItems } = await fetchBooks()
            booksStore
                .setBooks(items)
                .setTotalBooksOnQuery(totalItems)
                .setErrorOnRequest('')

            if (pathname !== '/') history.push('/')
        } catch (err) {
            booksStore.setErrorOnRequest(err.message).setBooks([])
        } finally {
            booksStore.setIsFetching(false)
        }
    }

    const onSeachInput = (e) => {
        booksStore.setSearchValue(e.target.value)
    }

    const setNewCategory = (category) => {
        booksStore.setSelectedCategory(category)
        setIsCategoryOpen(false)
    }

    const setNewFilter = (filter) => {
        setIsFilterOpen(false)
        booksStore.setSelectedSortingType(filter)
    }

    function onSearchKeyDown(e) {
        if (e.key === 'Enter') getBooks()
    }

    return (
        <div className='Form'>
            <div className='Form__search-line'>
                <Input
                    type='text'
                    placeholder='Введите название книги'
                    onInput={onSeachInput}
                    onKeyDown={onSearchKeyDown}
                    value={toJS(booksStore.searchValue)}
                    className='Form__search-field'
                />
                <Button className='Form__button' onClick={getBooks}>
                    <img src={SearchImg} width='20' alt='' />
                </Button>
            </div>
            <div className='Form__filters'>
                <div className='Form__select'>
                    <div className='Form__filter-name'>Категории</div>
                    <div ref={categoriesRef}>
                        <Select>
                            <button
                                type='button'
                                className={`${
                                    'Select__selected ' +
                                    (isCategoryOpen
                                        ? 'Select__selected_active'
                                        : '')
                                }`}
                                onClick={() =>
                                    setIsCategoryOpen(!isCategoryOpen)
                                }
                            >
                                {categories[toJS(booksStore.selectedCategory)]}
                            </button>
                            {isCategoryOpen ? (
                                <ul className='Select__items'>
                                    {Object.keys(categories).map((key) => (
                                        <li
                                            className='Select__item'
                                            key={key}
                                            onClick={() => setNewCategory(key)}
                                        >
                                            <button type='button'>
                                                {categories[key]}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                ''
                            )}
                        </Select>
                    </div>
                </div>
                <div className='Form__select'>
                    <div className='Form__filter-name'>По релевантности</div>
                    <div ref={filtersRef}>
                        <Select>
                            <button
                                type='button'
                                className={`${
                                    'Select__selected ' +
                                    (isFilterOpen
                                        ? 'Select__selected_active'
                                        : '')
                                }`}
                                onClick={() => setIsFilterOpen(!isFilterOpen)}
                            >
                                {filters[toJS(booksStore.selectedSortingType)]}
                            </button>
                            {isFilterOpen && (
                                <ul className='Select__items'>
                                    {Object.keys(filters).map((key) => (
                                        <li
                                            className='Select__item'
                                            key={key}
                                            onClick={() => setNewFilter(key)}
                                        >
                                            <button type='button'>
                                                {filters[key]}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
})

export default Form
