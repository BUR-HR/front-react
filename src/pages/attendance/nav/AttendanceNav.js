import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../../AuthContext";

const AttendanceNav = () => {
    const [isSelectIndex, setIsSelectIndex] = useState({
        isActive: false,
        index: 0,
    });

    const { auth } = useAuth();

    const onClickHandler = (index) => {
        if (isSelectIndex.isActive)
            setIsSelectIndex({ isActive: !isSelectIndex.isActive, index: 0 });
        if (index !== isSelectIndex.index)
            setIsSelectIndex({ isActive: true, index: index });
    };

    return (
        <div className="submenulist">
            <div
                key={1}
                className={`submenu ${
                    isSelectIndex.index === 1 ? "select" : ""
                }`}
                onClick={() => onClickHandler(1)}
            >
                <span>근태관리</span>
                <img
                    src="/common/images/plus.svg"
                    alt=""
                    className="submenu-plus-icon menu-icon"
                />
                <img
                    src="/common/images/minus.svg"
                    alt=""
                    className="submenu-minus-icon menu-icon"
                />
            </div>
            <div className="dropmenu">
                <ul>
                    <NavLink to="/attendance/">근태관리</NavLink>
                    {auth?.join().includes("HR_EMPLOYEE") ? (
                        <NavLink to="/attendance/list">근태현황</NavLink>
                    ) : undefined}
                </ul>
            </div>
        </div>
    );
};

export default AttendanceNav;
