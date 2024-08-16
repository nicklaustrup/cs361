import React, { useState } from 'react';
import Login from './Login.js';
import Register from './Register.js';


function LoginPage({ setToken }) {

    const [ register, setRegister ] = useState(false);

    const changePage = () => {
        setRegister(!register);
    };


    return (
        <div id="login-wrapper">
            {register ?
                (
                    <Register setToken={setToken} changePage={changePage} />
                )
                : (
                    <Login setToken={setToken} changePage={changePage} />
                )
            }
        </div>

    );
}

export default LoginPage;
