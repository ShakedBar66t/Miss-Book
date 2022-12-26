const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { BookService } from './../services/book.service.js';
import { BookList } from '../cmps/book-list.jsx';
import { BookFilter } from '../cmps/book-filter.jsx';
import { eventBusService, showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js';

export function BookIndex() {

    const [isLoading, setIsLoading] = useState(false)
    const [filterBy, setFilterBy] = useState(BookService.getDefaultFilter())
    const [books, setBooks] = useState([])

    console.log('books', books)

    useEffect(() => {
        setIsLoading(true)
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        BookService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
            setIsLoading(false)
        })
    }


    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    function onRemoveBook(bookId) {
        BookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            showSuccessMsg('Book removed!')
        })
        .catch((err) => {
            console.log('Had issues removing', err)
            showErrorMsg('Could not remove book')
        })
    }

    return <section className="book-index full main-layout">
        <div className="full main-layout">

            <h2>hello from book index</h2>
            <BookFilter onSetFilter={onSetFilter} />

            <Link to="/book/edit">Add Book!</Link>

            {!isLoading && <BookList books={books} onRemoveBook={onRemoveBook} />}
            {isLoading && <div>Loading..</div>}
            {!books.length && <div>No cars to show..</div>}
        </div>
    </section>
}