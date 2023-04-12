import * as React from "react";
import { Link } from "gatsby";
import { GameReviewExistsIcon, pencilIcon } from "./GameReview";


/* 
    This component takes an array of games and renders 
    a list of links to each game's page in the app.

    This is a DRY component that'll be used in multiple pages.
*/
const GameList = ({ games }) => {
    
    // Compose a collection of list elements made from each game
    let list = games.map(game => {
        const { igdbId, name } = game;

        // Each list item links to the corresponding game's page
        // It also displays a game review icon if a review exists for it
        return (
            <li key={igdbId}>
                <Link to={'/games/' + igdbId}>{name}</Link>&nbsp;
                <GameReviewExistsIcon game={game} />
            </li>
        );
    });


    // Render the list, as well as some info text showing what the pencil icon stands for
    return (
        <>  
            <p>{pencilIcon} = Game review available</p>
            <ul>{list}</ul>
        </>
    );
};


export default GameList;