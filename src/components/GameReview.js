import React from 'react';
import { useStaticQuery, graphql } from "gatsby";
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';

import * as styles from './gameReview.module.css';


// The pencil icon represents a game review. This is its own DRY variable.
const pencilIcon = <span><FontAwesomeIcon icon={faPen} style={{ color: "#035efc" }} /></span>;

// This component represents a game's review.
const GameReview = ({ game }) => {

    // Try to find the game's Markdown-composed review from the file system.
    const gameReview = GetGameReview(game);

    // If one exists:
    if (gameReview) {
        // Retrieve frontmatter data, as well as the review's image
        const { frontmatter } = gameReview;
        const { title, image, author, date, score } = frontmatter;
        const reviewImage = getImage(image?.childImageSharp?.gatsbyImageData);

        // Render the review
        return (
            <div className={styles.container}>
                {/* REVIEW'S HEADING (includes pencil icon) */}
                <h2>Game Review&nbsp;{pencilIcon}</h2>

                {/* REVIEW TITLE, AUTHOR, DATE, AND IMAGE */}
                <h3>{title}</h3>
                <p>by {author}</p>
                <p>{date}</p>
                <GatsbyImage image={reviewImage} alt={title} />

                {/* REVIEW'S HTML */}
                <div dangerouslySetInnerHTML={{ __html: gameReview.html }}></div>

                {/* REVIEW'S SCORE */}
                <h3>Final Score:&nbsp;{score}%</h3>
            </div>
        );
    } 
    
    // Otherwise, render nothing
    return <></>;
};


/*
    Given a game resource, 
    if it has a corresponding review in the filesystem,
    display the pencil icon.
*/
const GameReviewExistsIcon = ({ game }) => {
    const gameReview = GetGameReview(game);

    if (gameReview) {
        return pencilIcon;
    }

    return <></>
};


// This function looks for any reviews belonging to a specific game.
const GetGameReview = (game) => {
    // Fetch every singe game review in the file system with GraphQL
    const data = useStaticQuery(graphql`
        query {
            allMarkdownRemark {
                nodes {
                    frontmatter {
                        slug
                        title
                        image {
                            childImageSharp {
                                gatsbyImageData(
                                    formats: [PNG],
                                    placeholder: DOMINANT_COLOR,
                                    quality: 100,
                                    width: 500
                                )
                            }
                        }
                        date
                        author
                        score
                    }
                    html
                }
            }
        }
    `);

    // Now filter the results to the first game that matches the review frontmatter's slug
    return data.allMarkdownRemark.nodes.find(el => el.frontmatter.slug === game.slug);
};


export { GameReview, GameReviewExistsIcon, pencilIcon };