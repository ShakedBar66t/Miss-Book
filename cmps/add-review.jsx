const { useState, useEffect } = React


import { BookService } from "../services/book.service.js"
import { BookEdit } from "../pages/book-edit.jsx"


export function AddReview() {
    const [reviewToEdit, setReviewToEdit] = useState(BookService.getEmptyReview())
    console.log(reviewToEdit)

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'number' ? +value : value
        if (type === 'number') {
            value = {
                ...reviewToEdit.fullName,
                rating: +value,
                readAt
            }
        }
        setReviewToEdit((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onSaveReview(ev) {
        ev.preventDefault()
        BookService.save(reviewToEdit).then((review) => {
            console.log(review)
        })
    }

    return <section className="book-review">
        <h2>Book Reviews: </h2>

        <form onSubmit={onSaveReview}>
            <label htmlFor="fullName">Full name :</label>
            <input type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter full name.."
                value={reviewToEdit.fullName}
                onChange={handleChange}
            />
            <label htmlFor="rating">Rating :</label>
            <input type="number"
                name="rating"
                id="rating"
                placeholder="Give a rating 1-5.."
                value={reviewToEdit.rating}
                onChange={handleChange}
            />
            <label htmlFor="readAt">Read at :</label>
            <input type="date"
                name="readAt"
                id="readAt"
                placeholder="Enter the date.."
                value={reviewToEdit.readAt}
                onChange={handleChange}
            />
        </form>

    </section>
}