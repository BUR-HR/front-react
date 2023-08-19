import React from 'react'
import { Outlet } from 'react-router-dom'
import { Content, Main, NavBar } from '../common/commons'

const Schdule = () => {
    return (
        <Content>
            <NavBar>
            </NavBar>
            <Main>
                <Outlet />
            </Main>
        </Content>
    )
}

export default Schdule