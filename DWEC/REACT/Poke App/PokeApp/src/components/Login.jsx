import "../firebase";
import React, { useState, useEffect } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isRegistering, setIsRegistering] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();
    const db = getFirestore();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });

        return () => unsubscribe();
    }, [auth]);

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const userDoc = await getDoc(doc(db, "ranking", userCredential.user.uid));
            if (!userDoc.exists()) {
                setError("No se encontró un usuario registrado con estas credenciales.");
                await signOut(auth);
            }
        } catch (error) {
            setError("Error al iniciar sesión. Verifica tus credenciales o regístrate si no tienes una cuenta.");
        }
    };

    const handleSocialLogin = async (provider) => {
        try {
            const result = await signInWithPopup(auth, provider);
            const userDoc = await getDoc(doc(db, "ranking", result.user.uid));
            if (!userDoc.exists()) {
                // Si es la primera vez que el usuario inicia sesión con este método
                await setDoc(doc(db, "ranking", result.user.uid), {
                    userId: result.user.uid,
                    username: result.user.displayName || 'Usuario Anónimo',
                    email: result.user.email,
                    tiempo: Infinity
                });
            }
        } catch (error) {
            setError(error.message);
        }
    };

    const handleGoogleLogin = () => handleSocialLogin(new GoogleAuthProvider());
    const handleGithubLogin = () => handleSocialLogin(new GithubAuthProvider());

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!username) {
            setError("Por favor, introduce un nombre de usuario");
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(db, "ranking", userCredential.user.uid), {
                userId: userCredential.user.uid,
                username: username,
                email: email,
                tiempo: Infinity  // Usamos Infinity como valor inicial
            });
        } catch (error) {
            setError(error.message);
        }
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            setError(error.message);
        }
    };

    if (user) {
        return (
            <div className="logged-in-container">
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
                {isRegistering && (
                    <input 
                        type="text" 
                        placeholder="Nombre de usuario" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        required 
                    />
                )}
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
                    <br></br>
                    <button onClick={handleGithubLogin}>Iniciar Sesión con GitHub</button>
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