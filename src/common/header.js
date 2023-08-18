import { NavLink } from "react-router-dom";
import "../css/section.css";

export const Header = () => {
    return (
        <div className="header">
            <div className="menu">
                <NavLink to={"/attendance"}>
                    <img
                        src="/common/images/logo.png"
                        className="logo"
                        alt="logo"
                    />
                </NavLink>
                <NavLink to={"/attendance"} className={({isActive}) => isActive ? "menu-item active" : "menu-item"}>
                    <img
                        src="/common/images/clock.png"
                        className="menu-image"
                        alt="attendance"
                    />
                    근태
                </NavLink>
                <NavLink to='/human' className="menu-item">
                    <img
                        src="/common/images/human.png"
                        className="menu-image"
                        alt="human"
                    />
                    인사
                </NavLink>
                <NavLink to='orgchart' className="menu-item">
                    <img
                        src="/common/images/sitemap.png"
                        className="menu-image"
                        alt="oranization"
                    />
                    조직
                </NavLink>
                <NavLink to='rest' className="menu-item">
                    <img
                        src="/common/images/vacation.png"
                        className="menu-image"
                        alt="vacation"
                    />
                    휴가
                </NavLink>
                <NavLink to='payment' className="menu-item">
                    <img
                        src="/common/images/bank.png"
                        className="menu-image"
                        alt="salary"
                    />
                    급여
                </NavLink>
                <NavLink to='schedule' className="menu-item">
                    <img
                        src="/common/images/calendar.png"
                        className="menu-image"
                        alt="calendar"
                    />
                    스케쥴
                </NavLink>
                <NavLink to='login' className={'logout'}>
                    <span>로그아웃</span>
                </NavLink>
            </div>
        </div>
    );
};

export default Header;
