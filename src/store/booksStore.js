import { makeAutoObservable } from 'mobx'

class booksStore {
    constructor() {
        this._books = []
        this._limit = 30
        this._startIndex = 0
        this._searchValue = ''
        this._errorOnRequest = ''
        this._categories = {
            all: 'Все',
            art: 'Искусство',
            biography: 'Биография',
            computers: 'Компьютеры',
            history: 'История',
            medical: 'Медицина',
            poetry: 'Поэзия',
        }
        this._sortingTypes = {
            relevance: 'По совпадению',
            newest: 'По новизне',
        }
        this._isFetching = false
        this._selectedCategory = 'all'
        this._selectedSortingType = 'relevance'
        this._totalBooksOnQuery = 0
        makeAutoObservable(this)
    }

    setIsFetching(bool) {
        this._isFetching = bool
        return this
    }

    setSelectedCategory(category) {
        this._selectedCategory = category
        return this
    }

    setSelectedSortingType(sortingType) {
        this._selectedSortingType = sortingType
        return this
    }

    setSearchValue(text) {
        this._searchValue = text
        return this
    }

    setBooks(books) {
        this._startIndex = books.length
        this._books = books
        return this
    }

    setMoreBooks(books) {
        if (!books) return
        this._books = [...this._books, ...books]
        this.setStartIndex(books.length)
        return this
    }

    setErrorOnRequest(text) {
        this._errorOnRequest = text
        return this
    }

    setStartIndex(index) {
        this._startIndex += index
        return this
    }

    setTotalBooksOnQuery(count) {
        this._totalBooksOnQuery = count
        return this
    }

    get errorOnRequest() {
        return this._errorOnRequest
    }

    get books() {
        return this._books
    }

    get limit() {
        return this._limit
    }

    get startIndex() {
        return this._startIndex
    }

    get searchValue() {
        return this._searchValue
    }

    get categories() {
        return this._categories
    }

    get sortingTypes() {
        return this._sortingTypes
    }

    get selectedCategory() {
        return this._selectedCategory
    }

    get selectedSortingType() {
        return this._selectedSortingType
    }

    get totalBooksOnQuery() {
        return this._totalBooksOnQuery
    }

    get isFetching() {
        return this._isFetching
    }
}

export default new booksStore()
