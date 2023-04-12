import * as React from 'react';
import { Link } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import Footer from './Footer';

import * as styles from "./layout.module.css";


// This component is the site's layout. Used on every page.
const Layout = ({ pageTitle, children }) => {

    return (
        <div>
            <header className={styles.header}>
                {/* SITE ICON (links to the home page) */}
                <Link to="/">
                    <StaticImage 
                        src="../images/icon.png" 
                        alt="Gatsby Game Museum icon" 
                        title="Gatsby Game Museum"
                        layout="fixed"
                        width={100}
                    />
                </Link>

                {/* NAVBAR */}
                <div className={styles.navbar}>
                    {/* SITE TITLE */}
                    <div className={styles.title}>Gatsby Game Museum</div>

                    {/* NAVIGATION LINKS */}
                    <nav>
                        <ul className={styles.navLinks}>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="/games">Games</Link></li>
                            <li><Link to="/platforms">Platforms</Link></li>
                        </ul>
                    </nav>
                </div>
            </header>

            {/* MAIN PAGE BODY AND FOOTER */}
            <main>

                {/* If a page title is not null, render it. Otherwise, just put a blank space. */}
                {pageTitle ? <h2>{pageTitle}</h2> : ""}

                {/* Render the component's children. */}
                {children}
            </main>

            <Footer />
        </div>
    );
};

export default Layout;