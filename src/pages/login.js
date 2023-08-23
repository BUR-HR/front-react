import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/login.css'
import { login } from "../api/service";

export const Login = () => {
    const [empNo, setEmpNo] = useState(""); 
    const [password, setPassword] = useState(""); 
    const [showEmpNoError, setShowEmpNoError] = useState(false);
    const [showPasswordError, setShowPasswordError] = useState(false);
    const navigate = useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {};

        for (let pair of formData) {
            data[`${pair[0]}`] = pair[1];
        }

        if (empNo === "") {
            setShowEmpNoError(true);
        } else {
            setShowEmpNoError(false);
        }

        if (password === "") {
            setShowPasswordError(true);
        } else {
            setShowPasswordError(false);
        }

        if (empNo === "" || password === "") {
            return; 
        }

        console.log(data);
        login(data);

    };

    return (
        <div className="login-body">
            <div className="loginlogo">
                <img src="/common/images/logo.png" alt="logo" />
            </div>

            <div className="login-form">
                <form onSubmit={onSubmit}>
                    <div className="remember">
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember">사원번호 저장</label>
                    </div>

                    <label htmlFor="username"></label>
                    <input
                        type="text"
                        id="username"
                        name="empNo"
                        placeholder="사원번호"
                        className={showEmpNoError ? "error" : ""}
                        value={empNo}
                        onChange={(e) => {
                            setEmpNo(e.target.value);
                            setShowEmpNoError(false); 
                        }}
                    />
                        {showEmpNoError && <span className="error-text">사원번호를 입력해주세요.</span>}
                        <br />

                        <label htmlFor="password"></label>
                        <input
                            type="password"
                            id="password"
                            name="employeePassword"
                            placeholder="비밀번호"
                            className={showPasswordError ? "error" : ""}
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setShowPasswordError(false);
                            }}
                        />
                        {showPasswordError && <span className="error-text">비밀번호를 입력해주세요.</span>}
                        

                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
