import "./firebase";
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [auth]);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
        } catch (error) {
            setError(error.message);
        }
    };

    if (user) {
        return (
            <div>
                <h2>Sesión iniciada</h2>
                <button onClick={handleLogout}>Cerrar sesión</button>
            </div>
        );
    }

    return (
        <div className="login-container">
            <h2>{isRegistering ? 'Registrarse' : 'Iniciar Sesión'}</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={isRegistering ? handleRegister : handleEmailLogin}>
                <input 
                    type="email" 
                    placeholder="Correo electrónico" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Contraseña" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">
                    {isRegistering ? 'Registrarse' : 'Iniciar Sesión'}
                </button>
            </form>
            {!isRegistering && (
                <>
                    <button onClick={handleGoogleLogin}>Iniciar Sesión con Google</button>
                    <p>
                        ¿No tienes cuenta? 
                        <span onClick={() => setIsRegistering(true)} style={{cursor: 'pointer', color: 'blue'}}>
                            {' '}Regístrate aquí
                        </span>
                    </p>
                </>
            )}
            {isRegistering && (
                <p>
                    ¿Ya tienes cuenta? 
                    <span onClick={() => setIsRegistering(false)} style={{cursor: 'pointer', color: 'blue'}}>
                        {' '}Inicia sesión aquí
                    </span>
                </p>
            )}
        </div>
    );
}

export default Login;