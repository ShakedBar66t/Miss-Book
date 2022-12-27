
import { ReviewPreview } from "./review-preview.jsx"

export function ReviewList({ book, onRemoveReview }) {
    console.log(book)
    return <div className="review-list">
        {book.reviews.map((review) => <ReviewPreview key={review.id} review={review} onRemoveReview={onRemoveReview} />)}
    </div>
}