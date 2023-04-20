import React, { useState, useEffect } from "react";
import * as styles from "./quote.module.css";


// This component fetches a quote from the Quotable API via a Netlify serverless function.
// It then displays the quote.
const Quote = () => {

    // State data for the quote
    const [quote, setQuote] = useState({ 
        content: "", 
        author: "" 
    });

    // Run the following every time the component is rendered (such as when the page its on is accessed)
    useEffect(() => {
        // Make a call to the serverless function
        fetch("/.netlify/functions/getRandomQuote/", { method: "GET" })
            .then(response => {
                return response.json();
            })
            // Set the quote data
            .then(quoteJson => {
                setQuote(quoteJson);
            })
            // If anything goes wrong, log an error
            .catch(() => {
                console.error("Could not fetch quote data.");
            });
    }, []);
    // The dependencies array is empty.
    // Without it, the component will keep re-rendering over and over again.
    // Listing quote.content or quote._id as dependencies will also cause that behavior.
    // Giving a completely empty array will make sure the component renders once and only once.

    // Display the quote with fancy CSS.
    return (
        <div className={styles.quoteContainer}>
            <div className={styles.heading}>A Random Quote</div>
            <p className={styles.text}>&ldquo;{quote.content}&rdquo;</p>
            <p className={styles.autor}>- {quote.author}</p>
            <p className={styles.credit}>Brought to you by <a href="https://github.com/lukePeavey/quotable">Quotable</a>.</p>
        </div>
    );
};


export default Quote;