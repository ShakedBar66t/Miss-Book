const { useState, useEffect } = React
const { useParams, useNavigate, Link } = ReactRouterDOM

import { BookService } from "../services/book.service.js"
import { LongTxt } from "./long-txt.jsx"
import { AddReview } from "../cmps/add-review.jsx"


export function BookDetails() {
    const [book, setBook] = useState(null)
    const [bookPages, setPages] = useState(null)
    const [bookPublishDate, setDate] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [])

    function loadBook() {
        BookService.get(params.bookId)
            .then((book) => {
                setBook(book)
            })
            .catch((err) => {
                console.log('Had issues in book details', err)
                navigate('/book')
            })
    }


    let bookDate = new Date().getFullYear()
    let publishDate
    if (bookDate - 1 <= bookPublishDate) {
        publishDate = 'New'
    } else {
        publishDate = 'Vintage'
    }

    
    let displayPage
    if (bookPages > 500) {
        displayPage = 'Serious Reading'
    }
    if (bookPages > 200 && bookPages < 500) {
        displayPage = 'Descent Reading'
    } else if (bookPages < 100) {
        displayPage = 'Light Reading '
    }

    if (!book) return <div>Loading...</div>
    return <section className="book-details">
        <h2>{book.title}</h2>
        <img src={book.thumbnail ? book.thumbnail : `assets/style/img/default.png`} />
        <h3>Language: {book.language}</h3>
        <h3>Pages: {(displayPage) ? displayPage : bookPages}</h3>
        <h2 className={book.listPrice.amount <= 50 ? 'green' : 'red'}>
            {book.listPrice.amount + ' '
                + book.listPrice.currencyCode}
        </h2>
        <LongTxt txt={book.description} length={100} />
        <Link to={`/book`}> Go Back </Link>  |
        <Link to={`/book/edit/${book.id}`}> Edit Me </Link>
        <AddReview/>
    </section>
}