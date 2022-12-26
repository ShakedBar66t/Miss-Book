
export function BookPreview({ book }) {

    const imgName = book.title ? book.title : ''
    return <article className="book-preview">
        <h2>Book title:{book.title}</h2>
        <h3>Book price: {book.listPrice.amount + ' '
            + book.listPrice.currencyCode}</h3>
        <h3>Language: {book.language}</h3>
        <img src={book.thumbnail ? book.thumbnail : `assets/style/img/default.png`} />
        <h3>{book.publishedDate}</h3>
    </article>
}