import React from "react";
import './Auth.css'
import manager from "../../helpers/manager";

function login(){
    manager.signinRedirect();
}

function Auth() {
    return (
        <div className="Auth container">
            <div className={'Auth_title'}>
                <h1>
                    Система управления тестовыми сценариями
                </h1>
            </div>
            <div className={'Auth_buttons'}>
                <button className={'transition'} onClick={login}>Войти</button>
            </div>
        </div>
    );
}

export default Auth;
