import React, { useState } from "react";
import { register } from "../data/Auth";

const Register = (props) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formHandler = async (event) => {
        event.preventDefault();

        try{
            const response = await register(name, email, password);
            
            if (response.user) {
                document.querySelector('.alert-success').style.display = 'block';
                document.querySelector('.alert-danger').style.display = 'none';
            } else {
                console.error("Registration failed:", response.message);
                document.querySelector('.alert-success').style.display = 'none';
                document.querySelector('.alert-danger').style.display = 'block';
            }
        }catch(error){
            console.log(error);
        }
    }

    return(
        <React.Fragment>
        <div className="login_bg"></div>
        <div className="login register">
            <form method="POST" className="loginform" onSubmit={(event) => formHandler(event)}>
                <a className="navbar-brand loginlogo" href="#" style={{ marginBottom: "30px", display: "block" }}>
                    <div className="logo">
                        <span>PM</span>Kasboek
                    </div>
                </a>
                
                <h3>Account aanmaken</h3>
                <p>Vul hieronder de gegevens in om een account aan te maken. Direct na het aanmaken van het account kun je al inloggen.</p>

                <div className="alert alert-success" role="alert">
                    Je account is aangemaakt! <a href="/login">Klik hier om in te loggen</a>
                </div>

                <div className="alert alert-danger" role="alert">
                    Er is iets misgegaan!
                </div>

                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label className="form-check-label" htmlFor="name">Bedrijfsnaam</label>    
                    <input type="text" onChange={(event) => setName(event.target.value)} className="form-control" name="name" id="name" placeholder="Bedrijfsnaam" required />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                    <label className="form-check-label" htmlFor="email">E-mailadres</label>    
                    <input type="text" onChange={(event) => setEmail(event.target.value)} className="form-control" name="email" id="email" aria-describedby="emailHelp" placeholder="E-mailadres" required />
                </div>
                <div className="form-group" style={{ marginBottom: "20px" }}>
                <label className="form-check-label" htmlFor="password">Wachtwoord</label>    
                    <input type="password" onChange={(event) => setPassword(event.target.value)} className="form-control" name="password" id="password" placeholder="Wachtwoord" required/>
                </div>
                <button type="submit" name="submitlogin" id="submitlogin"  className="btn btn-green">Account aanmaken</button>
            </form>
        </div>
        </React.Fragment>
    )
}

export default Register;