import { Outlet } from "react-router-dom"
import { Content, Main, NavBar } from "../../../common/commons"
import EmployeecardNav from "./nav/EmployeecardNav"

const Employeecard = () => {

    return (
        <Content>
            <NavBar>
                <EmployeecardNav/>
            </NavBar>
            <Main>
                <Outlet/>
            </Main>
        </Content>
    )
}

export default Employeecard;