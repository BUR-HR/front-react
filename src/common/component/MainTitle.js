import React from "react";
import content from "./content.module.css";

const MainTitle = ({ title }) => {
    return <div className={content.title}>{title}</div>;
};

export default MainTitle;
