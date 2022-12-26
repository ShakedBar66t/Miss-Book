const { Outlet, Link } = ReactRouterDOM

export function About() {

    return <section className="about">
        <h3> welcome to our about page</h3>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Culpa distinctio a perferendis vitae, ad est ex fuga aliquam reprehenderit vero beatae fugiat, quam voluptate iure delectus commodi, repellat ullam accusantium!</p>

        <nav>
            <Link to="/about">Index</Link> |
            <Link to="/about/team">Team</Link> |
            <Link to="/about/vision">Vision</Link>
        </nav>

        <div className="nested-route">
            <Outlet />
        </div>
    </section>
}