const { useState } = React

import { Home } from './pages/home.jsx'
import { About } from './pages/about.jsx'
import { BookIndex } from './pages/book-index.jsx'


export function App() {

    const [page, setPage] = useState('book')
    console.log('page is', page)

    return <section className="main-layout app">
        <header className="app-header full main-layout">
            <h1>Miss Book</h1>
            <nav className="app-nav">
                <a href="#" onClick={() => setPage('home')}>Home</a> |
                <a href="#" onClick={() => setPage('about')}> About</a> |
                <a href="#" onClick={() => setPage('book')}> Books</a>
            </nav>
        </header>

        <main>
            {page === 'home' && <Home/>}
            {page === 'about' && <About/>}
            {page === 'book' && <BookIndex/>}
        </main>
    </section>
}