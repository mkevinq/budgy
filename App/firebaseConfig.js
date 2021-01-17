import firebase from 'firebase';

// Replace this with your own information
const config = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
}

firebase.initializeApp(config);

export default firebase
