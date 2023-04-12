import * as React from "react";
import { Link } from "gatsby";

import * as styles from "./game.module.css";


// This component renders information about a game.
const Game = ({ game }) => {
    const { name, involved_companies, genres, platforms, summary, first_release_date, screenshots, cover } = game;

    // If data for the game's cover art exists, create an image element for it
    let coverElement = cover ? (
        <div>
            <img className={styles.coverImage} src={cover} alt={name + " cover"} title={name} />
        </div>
    ) : <></>;

    return (
        <>
            {/* MAIN CONTAINER */}
            <div className={styles.infoContainer}>

                {/* THE GAME'S COVER ART */}
                {coverElement}

                {/* GAME INFORMATION */}
                <div>
                    <h3 className={styles.infoHeading}>Game Information</h3>
                    <ReleaseDate dateUnix={first_release_date} />
                    <PlatformList platforms={platforms} />
                    <p><b>Involved Companies:</b>&nbsp;{involved_companies.join(", ")}</p>
                    <GenreList genres={genres} />
                    <p><b>Summary:</b>&nbsp;{summary}</p>
                </div>
            </div>

            {/* GAME SCREENSHOTS */}
            <ScreenshotGallery title={name} images={screenshots} />
        </>
    );
};


// Given a date in seconds, this component renders a date in [Month DD, YYYY] format.
// E.g., "March 25, 2023"
const ReleaseDate = ({ dateUnix }) => {
    /*
        The IGDB API returns the game's release date as a Unix timestamp (in seconds).
        To convert it to a proper date object, I had to follow a few procedures taken from the source below.
        Source: https://www.coderrocketfuel.com/article/convert-a-unix-timestamp-to-a-date-in-vanilla-javascript
    */

    // Display nothing if no Unix timestamp
    if (!dateUnix) {
        return <></>;
    }

    // Convert the timestamp to milliseconds
    const dateMilliseconds = dateUnix * 1000;

    // Make a new date object out of it
    const dateObj = new Date(dateMilliseconds);

    // Make the date into a strin with the month's name, day in two digits, and numerical year
    const dateStr = dateObj.toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric"
    });


    // Display that string
    return <p><b>Original Release Date:</b>&nbsp;{dateStr}</p>;
};


// Given a list of platform objects, this component renders their names as a alphabeticized comma-separated list.
// Each item in the list links to a platform page on the site.
// E.g., "Nintendo 64, Playstation 2, Sega Dreamcast"
const PlatformList = ({ platforms }) => {

    // Display nothing if no platform array
    if (!platforms) {
        return <></>;
    }

    const list = platforms
        // Sort each platform by name
        .sort((a, b) => a.name.localeCompare(b.name))
        // Make inline span elements out of each
        .map((p, i) => {
            return (
                <span key={i}>
                    {/* If this is not the first element, prepend the link with a comma*/}
                    {i > 0 ? ", " : ""}

                    {/* Link to the platform's page on the site */}
                    <Link to={"/platforms/" + p.id}>{p.name}</Link>
                </span>
            );
        });
        
    
    // Display that list
    return <p><b>Platforms:</b>&nbsp;{list}</p>
};


// This component makes a comma-separated list out of a given array of genre objects.
const GenreList = ({ genres }) => {
    // No genres? Return nothing.
    if (!genres) {
        return <></>;
    }

    // Turn the array into a comma-separated string and render it
    const list = genres.map(g => g.name).join(', ');
    return <p><b>Genres:</b>&nbsp;{list}</p>;
};


// This component displays a series of screenshots, given an array of image URLs.
// Each image is a link, which opens the screenshot in a new tab when clicked.
const ScreenshotGallery = ({ title, images }) => {

    // If no images, display nothing
    if (!images) {
        return <></>;
    }
    
    // Build a series of anchor tags from each image
    let imageElements = images.map((s, i) => {
        let imageName = `${title} | Screenshot #${i + 1}`;

        return (
            <a key={i} href={s} target="_blank" rel="noreferrer">
                <img src={s} alt={imageName} title={imageName} />
            </a>
        );
    });

    // Render the screenshots
    return (
        <div>
            <h3 className={styles.infoHeading}>Screenshots</h3>
            <p>Click on a screenshot to enlarge it in a new browser window.</p>
            <div className={styles.screenshotGallery}>
                {imageElements}
            </div>
        </div>
    );
};


export default Game;
