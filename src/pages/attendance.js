import NavBar from "../common/NavBar";
import Content from "../common/content";
import Main from "../common/main";
import "../css/attendance.css";
import "../css/nav.css";
import AttendanceContent from "./main-content/AttendanceContent";
import AttendanceNav from "./nav-content/AttendanceNav";

export const Attendance = () => {
    

    return (
        <Content>
            <NavBar>
                <AttendanceNav />
            </NavBar>
            <Main>
                <AttendanceContent/>
            </Main>
        </Content>
    );
};

export default Attendance;
