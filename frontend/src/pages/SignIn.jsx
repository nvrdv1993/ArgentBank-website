import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [error, setError] = useState(null); 
  const navigate = useNavigate(); // Hook de navigation pour naviguer vers d'autres pages

  // Fonction pour soumettre le formulaire de connexion
  const fetchLogIn = async (e) => {
    e.preventDefault(); // Empêche le comportement par défaut du formulaire

    try {
      // Effectue une requête POST vers le serveur pour se connecter
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }), 
      });

      // Si la réponse est OK (statut 200)
      if (response.ok) {
        // Récupère les données de la réponse
        const data = await response.json();
        // Stocke le token d'authentification dans le localStorage
        localStorage.setItem('token', data.body.token);
        // Navigue vers la page utilisateur
        navigate('/user');
      } else {
        // Si la réponse n'est pas OK, affiche un message d'erreur générique
        setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
      }
    } catch (err) {
      console.log(err);
      // Si une erreur se produit pendant la requête
      if (err.response && err.response.status === 400) {
        // Si le statut de la réponse est 400 (Bad Request), affiche un message d'erreur pour des identifiants invalides
        setError("Identifiants invalides. Veuillez réessayer.");
      } else {
        // Sinon, affiche un message d'erreur générique
        setError("Une erreur s'est produite lors de la connexion. Veuillez réessayer plus tard.");
      }
    }
  };

  // Rendu du composant SignIn
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Connexion</h1>
        <form onSubmit={fetchLogIn}>
          {/* Champ pour l'email */}
          <div className="input-wrapper">
            <label htmlFor="username">Nom d'utilisateur</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setEmail(e.target.value)} // Met à jour l'état email lors de la saisie
            />
          </div>
          {/* Champ pour le mot de passe */}
          <div className="input-wrapper">
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)} // Met à jour l'état mot de passe lors de la saisie
            />
          </div>
          {/* Affiche le message d'erreur s'il existe */}
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {/* Bouton de soumission du formulaire */}
          <button type="submit" className="sign-in-button">
            Connexion
          </button>
        </form>
      </section>
    </main>
  );
};

// Exporte le composant SignIn
export default SignIn;
