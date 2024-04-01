import { createSlice } from '@reduxjs/toolkit';

// Création de la tranche de réduction (slice) authSlice
const authSlice = createSlice({
  name: 'auth', 
  initialState: {
    isAuthenticated: false, // État initial : l'utilisateur n'est pas authentifié
    token: null, // Ajout d'un champ pour stocker le token, initialement null
  },
  reducers: {
    // Définition des reducers (fonctions qui modifient l'état)
    setAuthentication: (state, action) => {
      // Modification de l'état pour refléter l'authentification de l'utilisateur
      state.isAuthenticated = !!action.payload.token; // Convertit le token en un booléen
      state.token = action.payload.token; // Stocke le token dans l'état
    },
  },
});

// Export des actions générées automatiquement par createSlice
export const { setAuthentication, setLogOut } = authSlice.actions;

// Export du réducteur (reducer) généré par createSlice
export default authSlice.reducer;
