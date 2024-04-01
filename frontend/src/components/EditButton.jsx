import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setEditProfile } from '../redux/reducers/userProfileSlice';

const EditButton = ({ setIsOpen }) => {
    // Utilisation du hook useSelector pour obtenir le token d'authentification depuis le state Redux
    const token = useSelector(state => state.auth.token);
    // Utilisation du hook useSelector pour obtenir le profil utilisateur depuis le state Redux
    const profile = useSelector(state => state.profile);
    // Déclaration des états locaux
    const [newUserName, setNewUserName] = useState(''); // État pour stocker le nouveau nom d'utilisateur
    const [userName] = useState(profile.userName); // État pour stocker le nom d'utilisateur actuel
    const [error, setError] = useState(''); // État pour gérer les erreurs
    const dispatch = useDispatch(); // Hook useDispatch pour obtenir la fonction dispatch du magasin Redux

    const editUserName = async (e) => {
        e.preventDefault();
        if (!newUserName) {
            setError("The field cannot be empty.");
            return;
        }
        try {
            const response = await fetch("http://localhost:3001/api/v1/user/profile", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ userName: newUserName })
            });
            if (!response) {
                throw new Error("Échec de la mise à jour du nom d'utilisateur");
            }
            // Dispatch l'action pour mettre à jour le nom d'utilisateur dans le state Redux (userProfileSlice)
            dispatch(setEditProfile(newUserName));
            // Ferme le formulaire d'édition
            setIsOpen(false);
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className='userName'>
            <p>Edit user info </p>
            <form>
                <div><label htmlFor="userName"> User name: </label><input
                    type="text"
                    onChange={(e) => {
                        setNewUserName(e.target.value);
                        setError("");
                        console.log(newUserName);
                    }}
                    placeholder={userName}
                /></div>
                {error && <p id="error-message">{error}</p>}
                <div><label htmlFor="firstName">First name: </label><input type="text" disabled placeholder={profile.firstName} /></div>
                <div className="lastname-container"><label htmlFor="lastName">Last name: </label><input type="text" disabled placeholder={profile.lastName} /></div>
                <div className='editbutton'>
                    <button onClick={editUserName}>
                        Save
                    </button>
                    <button onClick={() => setIsOpen(false)}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditButton;
