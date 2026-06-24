import React from "react";
import FlowingMenu from "./FlowingMenu";

const demoItems = [
    { link: "/services", text: "Build Trust Fast", image: "/BuildTrust.webp" },
    { link: "/services", text: "Stories Convert", image: "/DataInsights.webp" },
    { link: "/contact", text: "Let’s Bond", image: "/LetBond.webp" },
    { link: "/blog", text: "Ideas & Insights", image: "/StoriesConvert.webp" },
];


export default function FlowingMenuComp() {
    return (
        <div style={{ height: "400px", position: "relative" }}>
            <FlowingMenu items={demoItems} />
        </div>
    );
}
