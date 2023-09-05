import React from 'react'
import { Outlet } from 'react-router-dom'
import { Content, Main, NavBar } from "../../common/commons";
import "../../css/nav.css";
import CalendarNav from './nav/CalendarNav';

const SchduleList = () => {
    return (
        <Content>
            <NavBar>
                <CalendarNav />
            </NavBar>
            <Main>
                <Outlet />
            </Main>
        </Content>
    );
};

export default SchduleList;