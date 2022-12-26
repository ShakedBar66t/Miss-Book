const { useState, useEffect } = React
const { useNavigate, useParams, Link } = ReactRouterDOM

import { bookService } from "../services/book.service.js"

export function BookEdit() {
    const [bookToEdit, setBookToEdit] = useState(bookService.getEmptyBook())
    const navigate = useNavigate()
    console.log('bookToEdit', bookToEdit)

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        setBookToEdit((prevBook) => ({ ...prevBook, [field]: value }))
    }

    function onSaveBook(ev){
        ev.preventDefault()
        bookService.save(bookToEdit).then((book) => {
            console.log('book',book)
            navigate('/book')
        })
    }

    return <section className="book-edit">
        <h2>hello from book edit</h2>

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
                value={bookToEdit.listPrice}
                onChange={handleChange}
            />

            <div>
                <button>Save!</button>
                <button type="button">Cancel</button>
            </div>

        </form>
    </section>
}