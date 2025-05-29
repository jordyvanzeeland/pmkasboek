import React, { useState } from "react";
import { authenticate } from "../data/Auth";

const Login = (props) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const formHandler = async (event) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append('username', username);
        formData.append('password', password);

        const user = await authenticate(username, password);

        if(user.error){
            setHasError(true);
            setError(user.error)
        }else{
            localStorage.setItem('token', user.access_token);
            window.location.href = "/";
        }
        
    }

    return(
        <React.Fragment>
        <div className="login_bg"></div>
        <div className="container-fluid">
            <div className="login">
                
                <div className="container">
                <form method="POST" className="loginform" onSubmit={(event) => formHandler(event)}>
                <a className="navbar-brand loginlogo" href="#" style={{ marginBottom: "30px", display: "block" }}>
                    <div className="logo">
                        <span>PM</span>Kasboek
                    </div>
                </a>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label className="form-check-label" htmlFor="username">E-mailadres</label>    
                    <input type="text" onChange={(event) => setUsername(event.target.value)} className="form-control" name="username" id="username" placeholder="E-mailadres" aria-describedby="emailHelp" />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-check-label" htmlFor="password">Wachtwoord</label>    
                    <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" name="password" id="password" placeholder="Wachtwoord"  />
                </div>
                <button type="submit" name="submitlogin" id="submitlogin"  className="btn btn-green">Inloggen</button>
                <a className="btn-register" href="/register">Maak account aan</a>
                </form>
                </div>
            </div>
        </div>
        </React.Fragment>
        
    )
}

export default Login;