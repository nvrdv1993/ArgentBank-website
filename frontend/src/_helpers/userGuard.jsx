import React from 'react';
import { Navigate } from 'react-router-dom';

// Définition du composant UserGuard
const UserGuard = ({ children }) => {
    // Vérification de la présence du token dans le localStorage
    let token = !!localStorage.getItem('token');

    // Si aucun token n'est trouvé, redirige vers la page de connexion
    if (!token) {
        return <Navigate to="/signIn" />;
    }

    // Si un token est trouvé, renvoie les éléments enfants du composant
    return children;
};

// Export du composant UserGuard
export default UserGuard;
