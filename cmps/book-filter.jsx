
import { BookService } from "../services/book.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(BookService.getDefaultFilter)
    const elInputRef = useRef(null)

    useEffect(() => {
        elInputRef.current.focus()
    }, [])

    useEffect(() => {
        onSetFilter(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = type === 'number' ? +value : value;
        setFilterByToEdit((prevFilter) => {
            return { ...prevFilter, [field]: value }
        })
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    return <section className="book-filter">
        <h2>Filter out books</h2>
        <form onSubmit={onSubmitFilter}>
            <label htmlFor="title">Title:</label>
            <input type="text"
                id="title"
                name="txt"
                placeholder="By title"
                value={filterByToEdit.txt}
                onChange={handleChange}
                ref={elInputRef}
            />

            <label htmlFor="price">Price:</label>
            <input type="number"
                id="price"
                name="minPrice"
                placeholder="By Price"
                value={filterByToEdit.minPrice}
                onChange={handleChange}
            />

            <button>Filter Cars!</button>
        </form>
    </section>
}