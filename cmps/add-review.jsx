const { useState, useEffect } = React
const { useParams, Link } = ReactRouterDOM


import { BookService } from "../services/book.service.js"
import { BookEdit } from "../pages/book-edit.jsx"
import { utilService } from "../services/util.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


export function AddReview({ book, onSaveReview }) {
    const [review, setReview] = useState(BookService.getEmptyReview())
    console.log(review)

    function handleChange({ target }) {
        let { value, type, name: field } = target
        value = type === 'range' ? +value : value
        setReview((prevReview => {
            return { ...prevReview, [field]: value }
        }))
    }

    function onSubmitReview(ev) {
        ev.preventDefault()
        book.reviews.push({...review, id:utilService.makeId()})
        onSaveReview(book)
    }

    return <section className="book-review">
        <h2>Rate This Book</h2>

        <form onSubmit={onSubmitReview}>
            <label htmlFor="fullName">Full name :</label>
            <input type="text"
                name="fullName"
                id="fullName"
                placeholder="Enter full name.."
                value={review.fullName}
                onChange={handleChange}
            />
            <label htmlFor="rating">Rating :</label>
            <input type="range"
                min="1"
                max="5"
                name="rating"
                id="rating"
                placeholder="Give a rating 1-5.."
                value={review.rating}
                title={review.rating}
                onChange={handleChange}
            />
            <label htmlFor="readAt">Read at :</label>
            <input type="date"
                name="readAt"
                id="readAt"
                placeholder="Enter the date.."
                value={review.readAt}
                onChange={handleChange}
            />
            <div>
            <button>Submit</button>
            <Link to="/book">Cancel</Link>
            </div>
        </form>

    </section>
}