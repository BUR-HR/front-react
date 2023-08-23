import { useState } from "react";
import { NavLink } from "react-router-dom";

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
        
        <div className="submenulist">
            <div
                key={1}
                className={`submenu ${
                    isSelectIndex.index === 1 ? "select" : ""
                }`}
                onClick={() => onClickHandler(1)}
            >
                <span>급여대장</span>
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
                    <NavLink>급여대장 조회</NavLink>
                    <NavLink>급여지급품의서</NavLink>
                </ul>
            </div>
            <div
                key={2}
                className={`submenu ${
                    isSelectIndex.index === 2 ? "select" : ""
                }`}
                onClick={() => onClickHandler(2)}
            >
                <span>퇴직금대장</span>
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
                    <NavLink>퇴직금대장 조회</NavLink>
                    <NavLink>퇴직금지급품의서</NavLink>
                </ul>
            </div>
            <div
                key={3}
                className={`submenu ${
                    isSelectIndex.index === 3 ? "select" : ""
                }`}
                onClick={() => onClickHandler(3)}
            >
                <span>급여</span>
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
                    <NavLink to='/payment/'>급여명세서 조회</NavLink>
                    <NavLink>예상 퇴직금 조회</NavLink>
                    <NavLink>퇴직금 중간정산 신청</NavLink>
                </ul>
            </div>
        </div>
    );
};

export default EmployeecardNav;
