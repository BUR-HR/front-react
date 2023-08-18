import React from "react";
import '../css/login.css'

export const Login = () => {
    return (
        <div className="login-body">
            <div className="loginlogo">
                <img src="/common/images/logo.png" alt="logo" />
            </div>
            <div className="login-form">
                <form>
                    <div className="remember">
                        <input type="checkbox" id="remember" name="remember" />
                        <label htmlFor="remember">사원번호 저장</label>
                    </div>

                    <label htmlFor="username"></label>
                    <input
                        type="text"
                        id="username"
                        name="username"
                        placeholder="사원번호"
                    />
                    <br />

                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="비밀번호"
                    />

                    <button type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
