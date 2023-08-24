import { useState } from "react";
import { NavLink } from "react-router-dom";
import { NavBar } from '../../../../common/component/NavBar';



const EmployeecardNav = () => {
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
        <div className="nav-container"> 
        <div className={`submenulist ${isSelectIndex.isActive ? "active" : ""}`}>
            <div
                key={1}
                className={`submenu ${
                    isSelectIndex.index === 1 ? "select" : ""
                }`}
                onClick={() => onClickHandler(1)}
            >
                <span>인사관리</span>
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
                    <NavLink>인사카드 등록</NavLink>
                    <NavLink>사원조회</NavLink>
                </ul>
            </div>
            <div
                key={2}
                className={`submenu ${
                    isSelectIndex.index === 2 ? "select" : ""
                }`}
                onClick={() => onClickHandler(2)}
            >
            
            </div>


        </div>
        </div>
    );
};

export default EmployeecardNav;
