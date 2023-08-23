import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/login.css'
import { login } from "../api/service";

export const Login = () => {
    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        const data = {};

        for (let pair of formData) {
            data[`${pair[0]}`] = pair[1];
        }

        console.log(data);
        login(data);
    }

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
                        value={form.empNo}
                        onChange={onChangeHandler}
                    />
                    <br />

                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        name="employeePassword"
                        placeholder="비밀번호"
                        value={form.password}
                        onChange={onChangeHandler}
                    />

                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
