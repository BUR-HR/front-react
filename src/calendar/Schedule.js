import React from 'react'
import Content from '../common/content'
import NavBar from '../common/NavBar'
import Main from '../common/main'
import { Outlet } from 'react-router-dom'

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