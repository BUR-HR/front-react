import { useState } from "react";
import { NavLink } from "react-router-dom";

const CalendarNav = () => {
    const [isSelectIndex, setIsSelectIndex] = useState({
        isActive: false,
        index: 0,
    });

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
                <span>스케줄</span>
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
                    <NavLink>캘린더</NavLink>
                </ul>
            </div>
        </div>
    );
};

export default CalendarNav;
