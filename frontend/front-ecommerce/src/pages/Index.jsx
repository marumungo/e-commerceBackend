import { useEffect } from "react";

const Index = () => {
    useEffect(()=>{
        fetch(`http://localhost:8080`) 
        .then(resp => resp.json())
    }, []);

    return (
        <div className="w-25">
            <h1>Login</h1>
            <form id="cookieForm" action="/api/sessions/login" method="POST">
                <label>Email</label>
                <input type="text" name="email"/>
                <br />
                <label>Password</label>
                <input name="password" type="password"/>
                <button type="submit">Enviar</button>
            </form>
            <p>No tengo usuario <a href="/api/sessions/register">Registrarse</a></p>
            <p>Olvidé mi contraseña <a href="/api/sessions/forgotPassword">Recuperar</a></p>
            <a href="/api/sessions/github">Entrar con GitHub</a>
        </div>
    );
};

export default Index;