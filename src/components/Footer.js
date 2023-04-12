import * as React from 'react';
import * as styles from './footer.module.css';


// A simple footer
const Footer = () => {
    return (
        <footer className={styles.footer}>
            <p>
                This work is part of CSCI E-114, Web Application Development with Jamstack, Harvard Extension School. All video game data was obtained from <a href="https://api-docs.igdb.com/">The Internet Game Database (IGDB)</a>.
            </p>
        </footer>
    );
};

export default Footer;