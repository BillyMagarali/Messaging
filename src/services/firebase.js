import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyD31Nzhof6UsCw5Kb1rxrQOMSbnP7OKglY",
    authDomain: "messaging-9cc0e.firebaseapp.com",
    databaseURL: "https://messaging-9cc0e.firebaseio.com"
};
firebase.initializeApp(config);
export const auth = firebase.auth;
export const db = firebase.database();
