import { Outlet } from "react-router-dom";
import { Content, Main, NavBar } from "../../common/commons";

import "../../css/attendance.css";
import "../../css/nav.css";

import AttendanceList from "./main/AttendanceList";
import AttendanceMain from "./main/AttendanceMain";
import AttendanceNav from "./nav/AttendanceNav";

export { AttendanceList, AttendanceMain };

export const Attendance = () => {
    return (
        <Content>
            <NavBar>
                <AttendanceNav />
            </NavBar>
            <Main>
                <Outlet />
            </Main>
        </Content>
    );
};

export default Attendance;
