import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  firstName: "",
  lastName: "",
  userName: "",
};

const profileSlice = createSlice({
    name: "profile", 
    initialState,
    reducers: {
        // Reducer pour définir les données du profil utilisateur
        setGetProfile: (state, action) => {
            // Met à jour les champs du profil avec les données fournies
            state.email = action.payload.data.body.email;
            state.firstName = action.payload.data.body.firstName;
            state.lastName = action.payload.data.body.lastName;
            state.userName = action.payload.data.body.userName;
        },
        // Reducer pour éditer le profil utilisateur
        setEditProfile: (state, action) => {
            // Met à jour le nom d'utilisateur avec la valeur fournie
            state.userName = action.payload;
        },
        // Reducer pour réinitialiser le profil utilisateur à l'état initial
        resetProfile: () => {
          // Retourne l'état initial du profil utilisateur
          return initialState;
      },
    },
});

// Export des actions de la tranche de réduction du profil utilisateur
export const { setGetProfile, setEditProfile, resetProfile } = profileSlice.actions;

// Export du réducteur de la tranche de réduction du profil utilisateur
export default profileSlice.reducer;
