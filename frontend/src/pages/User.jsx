import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Account from '../components/Account';
import { setAuthentication } from '../redux/reducers/authSlice';
import EditButton from '../components/EditButton';


const User = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile)
  const token = useSelector((state) => state.auth.token); // Supposons que le token soit stocké dans auth.token
  const [isOpen, setIsOpen] = useState(false)


  useEffect(() => {
    let token = localStorage.getItem('token')
    const fetchDataUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        // Dispatch l'action appropriée pour mettre à jour le profil dans le state Redux (authSlice)
        dispatch(setAuthentication({ token, user: data.body }));
      } catch (err) {
        console.log(err);
      }
    };

    if (token) {
      // N'appelle fetchDataUser que si le token est présent
      fetchDataUser();
    }
  }, [dispatch, token]);

  const handleToggleFormulaire = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <nav className="main-nav">
        {/* ... contenu du menu */}
      </nav>
      <main className="main bg-dark">
        {!isOpen && (
          <div className="header">
            <h1>Welcome back<br />{profile.firstName + " " + profile.lastName + "!"}</h1>
            <button className="edit-button" onClick={handleToggleFormulaire}>Edit Name</button>
          </div>
        )}
        {isOpen && (
          <EditButton  isOpen={isOpen} setIsOpen={setIsOpen}/>
        )}
        <h2 className="sr-only">Accounts</h2>
        <Account title="Argent Bank Checking (x8349)" amount="$2,082.79" description="Available Balance" />
        <Account title="Argent Bank Savings (x6712)" amount="$10,928.42" description="Available Balance" />
        <Account title="Argent Bank Credit Card (x8349)" amount="$184.30" description="Current Balance" />
      </main>
    </>
  );
};

export default User;
