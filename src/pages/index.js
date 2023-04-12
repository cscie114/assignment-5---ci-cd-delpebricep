import * as React from "react"
import { Link } from "gatsby";
import Layout from "../components/Layout";
import { StaticImage } from "gatsby-plugin-image";


const IndexPage = () => {
    return (
        <Layout pageTitle={null}>
            <div style={{ textAlign: "center" }}>
                <h2>Welcome to the next level.</h2>
                
                <StaticImage 
                    src="../images/home_image.png"
                    placeholder="blurred"
                    loading="eager"
                    width={600}
                    formats={["png"]}
                    alt="Home Image"
                />

                <p>This is the <b>Gatsby Game Museum</b>. We document and display some of the world's top video games. Some of the games on display are reviewed by our curators.</p>
                <p>Start exploring by <Link to="/games">browsing the full list of games</Link> or <Link to="/platforms">selecting a platform</Link>.</p>
            </div>

        </Layout>
    );
};

export const Head = () => <title>Home Page</title>;
export default IndexPage;

