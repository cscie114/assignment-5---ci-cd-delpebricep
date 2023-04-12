import * as React from "react"
import { graphql } from "gatsby";
import Layout from "../../components/Layout";
import GameList from "../../components/GameList";


// This page displays a list of every single game in the data source.
const GameDirectoryPage = ({ data }) => {

    // Render the page and game list
    return (
        <Layout pageTitle="All Games">
            <p>Click on a game to view more information about it. We have a total of <b>{data.allGame.totalCount}</b> game records.</p>
            <GameList games={data.allGame.nodes} />
        </Layout>
    );
};


// Query every game's IGDB ID, name, and slug, as well as the total number of games
export const query = graphql`
    query {
        allGame(sort: {name: ASC}) {
            nodes {
                igdbId
                slug
                name
            }
            totalCount
        }
    }
`;

export const Head = () => <title>All Games</title>;
export default GameDirectoryPage;
