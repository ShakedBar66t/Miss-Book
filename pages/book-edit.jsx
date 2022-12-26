const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()
    console.log('bookToEdit', bookToEdit)

    useEffect(() => {
        if (!bookId) return
        loadBook()
    }, [])

    function loadBook() {
        bookService.get(bookId)
            .then((book) => setBookToEdit(book))
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }




    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if (type === 'number') {
            value = {
                ...bookToEdit.listPrice,
                amount: +value
            }
        }
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev) {
        ev.preventDefault()
        bookService.save(bookToEdit).then((book) => {
            console.log('book', book)
            navigate('/book')
        })
    }

    return <section className="book-edit">
        <h2>{bookToEdit.id ? 'Edit this book' : 'Add a new book'}</h2>

        <form onSubmit={onSaveBook}>
            <label htmlFor="title">Title : </label>
            <input type="text"
                name="title"
                id="title"
                placeholder="Enter book title.."
                value={bookToEdit.title}
                onChange={handleChange}
            />
            <label htmlFor="listPrice">List price :</label>
            <input type="number"
                name="listPrice"
                id="listPrice"
                placeholder="Enter listing price.."
                value={bookToEdit.listPrice.amount}
                onChange={handleChange}
            />

            <div>
                <button>{bookToEdit.id ? 'Save' : 'Add'}</button>
                <Link to="/book">Cancel</Link>
            </div>

        </form>
    </section>
}