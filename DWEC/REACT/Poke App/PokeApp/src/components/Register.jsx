import "./firebase";
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            await updateProfile(userCredential.user, { displayName: name });
            navigate('/');
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="register-container">
            <h2>Registrarse</h2>
            {error && <p className="error">{error}</p>}
            <form onSubmit={handleRegister}>
                <input 
                    type="text" 
                    placeholder="Nombre" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    required 
                />
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
                <button type="submit">Registrarse</button>
            </form>
            <p>
                ¿Ya tienes una cuenta? 
                <span onClick={() => navigate('/login')} style={{cursor: 'pointer', color: 'blue'}}>
                    {' '}Inicia sesión aquí
                </span>
            </p>
        </div>
    );
}

export default Register;