import Book from './pages/Book/Book'
import Main from './pages/Main'
import { BOOK_ROUTE, MAIN_ROUTE } from './utils/consts'

export const Routes = [
    {
        path: MAIN_ROUTE,
        Component: Main,
    },
    {
        path: BOOK_ROUTE + '/:id',
        Component: Book,
    },
]
