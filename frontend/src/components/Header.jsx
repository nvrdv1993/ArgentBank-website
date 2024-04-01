import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { setAuthentication } from '../redux/reducers/authSlice';
import { setGetProfile } from '../redux/reducers/userProfileSlice';
import { resetProfile } from '../redux/reducers/userProfileSlice';

const Header = () => {
  const navigate = useNavigate();
  // Hook useDispatch pour obtenir la fonction dispatch du magasin Redux
  const dispatch = useDispatch();
  // Sélectionne si l'utilisateur est authentifié depuis le state Redux
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  // Sélectionne le token d'authentification depuis le state Redux
  const token = useSelector(state => state.auth.token);
  // Sélectionne le profil utilisateur depuis le state Redux
  const profile = useSelector((state) => state.profile);
  
  // Déconnexion
  const handleSignOut = () => {
    localStorage.removeItem('token');
    // Dispatch l'action pour déconnecter l'utilisateur et réinitialiser le profil utilisateur
    dispatch(setAuthentication({ token: null }));
    dispatch(resetProfile());
    navigate('/SignIn');
  };

  useEffect(() => {
    const fetchDataUser = async () => {
      if (!token) return;
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        // Dispatch l'action pour mettre à jour le profil utilisateur dans le state Redux
        dispatch(setGetProfile({ data }));
      } catch (err) {
        console.log(err);
      }
    };
    fetchDataUser();
  }, [dispatch, token]);

  return (
    <header>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="../Home">
          <img
            className="main-nav-logo-image"
            src="/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div className='logBlock'>
          {token && (
            <Link
              className="main-nav-item"
              to="./user"
              style={{ display: 'flex', alignItems: 'center' }}
            >
              <i className="fa fa-user-circle"></i>
              {profile.userName}
            </Link>
          )}
          {isAuthenticated ? (
            <div className="main-nav-item" onClick={handleSignOut} style={{ cursor: 'pointer', fontWeight: 'bold', display: 'flex', alignItems: 'center' }}>
              <i className="fa fa-sign-out"></i>
              Sign Out
            </div>
          ) : (
            <Link className="main-nav-item" to="./SignIn">
              Sign In
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
