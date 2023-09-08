import { Outlet } from "react-router-dom"
import { Content, Main, NavBar } from "../../../common/commons"
import InquiryNav from "./nav/InquiryNav"

const Inquiry = () => {

    return (
        <Content>
            <NavBar>
                <InquiryNav/>
            </NavBar>
            <Main>
                <Outlet/>
            </Main>
        </Content>
    )
}

export default Inquiry;