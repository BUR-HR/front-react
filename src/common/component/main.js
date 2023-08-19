import React from "react";
import content from './content.module.css';

const Main = ({ children }) => {
    return <div className={content.main}>{children}</div>;
};

export default Main;
