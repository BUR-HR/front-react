import { Outlet } from "react-router-dom";
import NavBar from "../../common/NavBar";
import Content from "../../common/content";
import Main from "../../common/main";
import "../../css/attendance.css";
import "../../css/nav.css";
import AttendanceNav from "./nav/AttendanceNav";

export const Attendance = () => {
    

    return (
        <Content>
            <NavBar>
                <AttendanceNav />
            </NavBar>
            <Main>
                <Outlet/>
            </Main>
        </Content>
    );
};

export default Attendance;
