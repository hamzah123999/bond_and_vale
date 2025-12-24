import React from "react";
import FlowingMenu from "./FlowingMenu";

const demoItems = [
    { link: "/services", text: "Build Trust Fast", image: "/BuildTrust.jpg" },
    { link: "/services", text: "Stories Convert", image: "/DataInsights.jpg" },
    { link: "/contact", text: "Let’s Bond", image: "/LetBond.jpg" },
    { link: "/blog", text: "Ideas & Insights", image: "/StoriesConvert.jpg" },
];


export default function FlowingMenuComp() {
    return (
        <div style={{ height: "400px", position: "relative" }}>
            <FlowingMenu items={demoItems} />
        </div>
    );
}
