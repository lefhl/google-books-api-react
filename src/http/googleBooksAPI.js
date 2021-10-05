import { toJS } from 'mobx'
import booksStore from '../store/booksStore'

const baseURL = 'https://www.googleapis.com/books/v1/volumes?q='

const apiKey = '&key=' + process.env.REACT_APP_GOOGLE_API_KEY
const portion = `&maxResults=${booksStore.limit}`

export async function fetchBooks() {
    const response = await fetch(constructUrl())
    const data = await response.json()

    if (!response.ok) {
        throw new Error('Something went wrong')
    } else if (!('items' in data)) {
        throw new Error('No results on request')
    }

    return data
}

export async function fetchMoreBooks() {
    let response = await fetch(constructUrl(toJS(booksStore.startIndex)))
    response = await response.json()

    if (!('items' in response)) {
        throw new Error('No results on request')
    }

    return response
}

function constructUrl(index) {
    const query = booksStore.searchValue
    const sorting = `&orderBy=${booksStore.selectedSortingType}`
    const category =
        booksStore.selectedCategory === 'all'
            ? ''
            : `+subject:${booksStore.selectedCategory}`
    const startIndex = `&startIndex=${index ? index : 0}`

    return baseURL + query + category + portion + startIndex + sorting + apiKey
}
