import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import '../css/login.css'

export const Login = () => {
    const navigate = useNavigate();

    const [form, setForm] =  useState({
        empNo: '',
        password: ''
    });

    const onChangeHandler = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const onSubmitHandler = async (e) => {
        e.preventDefault();
    

        // API 호출을 위한 로직 
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    empNo: form.empNo,
                    password: form.password
                })
            });

            if(response.ok) {
                //로그인 성공 시 메인페이지로 이동 
                navigate("/", { replace: true });
            } else {
                //로그인 실패 시 처리 
                console.log("로그인 실패");
            }
        } catch (error) {
            console.error("API 호출 에러", error);
        }
    };


    return (
        <div className="login-body">
            <div className="loginlogo">
                <img src="/common/images/logo.png" alt="logo" />
            </div>

            <div className="login-form">
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="empNo"></label>
                    <input  
                        type="text"
                        id="empNo"
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
                        name="password"
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
