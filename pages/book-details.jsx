const { useState } = React

import { LongTxt } from "./long-txt.jsx"


export function BookDetails({ book, onGoBack }) {
    const [bookPages, setPages] = useState(book.pageCount)
    const [bookPublishDate, setDate] = useState(book.publishedDate)
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


    return <section className="book-details">
        <h2>{book.title}</h2>
        <img src={book.thumbnail} />
        <h2>{book.authors[0]}</h2>
        <h3>Language: {book.language}</h3>
        <h3>Pages: {(displayPage) ? displayPage : bookPages}</h3>
        <h2 className={book.listPrice.amount <= 50 ? 'green' : 'red'}>
            {book.listPrice.amount + ' '
                + book.listPrice.currencyCode}
        </h2>
        <LongTxt txt={book.description} length={100} />
        <button onClick={onGoBack}>Go Back</button>
    </section>
}