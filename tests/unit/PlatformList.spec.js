import React from "react";
import { render } from "@testing-library/react";
import { PlatformList } from "../../src/components/Game";


// This timestamp should convert to "January 01, 2023"
const platforms = [
    { id: 2, name: "SEGA Neptune" },
    { id: 6, name: "Hyper Nintendo Entertainment System" },
    { id: 25, name: "Xbox 1080" },
    { id: 33, name: "Atari Cheetah" },
]


describe("PlatformList", () => {
    it("Renders correctly", () => {
        const element = <PlatformList platforms={platforms} />;
        expect(element).toMatchSnapshot();
    });

    it("Displays a list of platforms alphabetically", () => {
        const { getByTestId } = render(<PlatformList platforms={platforms} />);
        expect(getByTestId("platform-list")).toHaveTextContent("Platforms: Atari Cheetah, Hyper Nintendo Entertainment System, SEGA Neptune, Xbox 1080");
    });
})