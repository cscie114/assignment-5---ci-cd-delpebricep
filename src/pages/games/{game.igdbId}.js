import * as React from "react";
import { graphql } from "gatsby";

import Layout from "../../components/Layout";
import Game from "../../components/Game";
import { GameReview } from "../../components/GameReview";


// This page displays a game's information, and its review if it has one
const GamePage = ({ data }) => {
    const { game } = data;

    return (
        <Layout pageTitle={game.name}>
            <Game game={game} />
            <GameReview game={game} />
        </Layout>
    );
};


// Using GraphQL, fetch the game with this specific IGDB ID.
export const query = graphql`
	query ($igdbId: Int) {
		game(igdbId: {eq: $igdbId}) {
            igdbId
			name
            slug
            first_release_date
            platforms {
                id
                name
            }
            genres {
                name
            }
            involved_companies
            summary
            cover
            screenshots
		}
	}
`;


// The <head> HTML element on this page should also show the name of the game
export const Head = ({ data }) => {
    return <title>Game Page: { data.game.name }</title>;
};

export default GamePage;
