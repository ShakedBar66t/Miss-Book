const { useState, useEffect } = React
const { Link } = ReactRouterDOM

import { bookService } from './../services/book.service.js';
import { BookList } from '../cmps/book-list.jsx';
import { BookFilter } from '../cmps/book-filter.jsx';
import { BookDetails } from './book-details.jsx';
import { UserMsg } from '../cmps/user-msg.jsx';

export function BookIndex() {
    const [filterBy, setFilterBy] = useState(bookService.getDefaultFilter())
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [userMsg, setUserMsg] = useState('')

    console.log('books', books)

    useEffect(() => {
        console.log('Loading books..')
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        bookService.query(filterBy).then(booksToUpdate => {
            setBooks(booksToUpdate)
        })
    }


    function onSetFilter(filterBy) {
        setFilterBy(filterBy)
    }


    function onRemoveBook(bookId) {
        bookService.remove(bookId).then(() => {
            const updatedBooks = books.filter(book => book.id !== bookId)
            setBooks(updatedBooks)
            flashMsg('Book Removed!')
        })
    }

    function onSelectBook(bookId) {
        bookService.get(bookId).then((book) => {
            setSelectedBook(book)
        })
    }

    function flashMsg(msg) {
        setUserMsg(msg)
        setTimeout(() => {
            setUserMsg('')
        }, 3000)
    }

    return <section className="book-index full main-layout">
        {userMsg && <UserMsg msg={userMsg} />}
        <div className="full main-layout">

            <h2>hello from book index</h2>
            <BookFilter onSetFilter={onSetFilter} />

            <Link to="/book/edit">Add Book!</Link>

            <BookList books={books} onRemoveBook={onRemoveBook} />
        </div>
    </section>
}