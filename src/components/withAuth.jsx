import React, { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';

export default function withAuth(AuthComponent){
    
    const AuthWrapped = (props) => {
        const [user, setUser] = useState([]);
        const token = localStorage.getItem('token');
    
        const isTokenExpired = (token) => {
            if (!token) {
                return true;
            }

            try {
                const { exp } = jwtDecode(token);
                return exp < Date.now() / 1000;
            } catch (err) {
                console.error('Error decoding token:', err);
                return true;
            }
        }
    
        useEffect(() => {
            const tokenExpired = isTokenExpired(token);
            
            if (tokenExpired) {
                localStorage.clear();
                window.location.reload();
            }
        })
    
        return <AuthComponent history={props.history} />
    }

    return AuthWrapped;
}