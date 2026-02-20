/**
 * Littoralicious — Firebase Configuration
 *
 * Setup:
 * 1. Go to https://console.firebase.google.com
 * 2. Create a new project (e.g., "littoralicious")
 * 3. Add a Web app (Project Settings > General > Your apps > Add app)
 * 4. Copy the config values below
 * 5. Enable Firestore Database (Build > Firestore > Create database > Start in test mode)
 */

const firebaseConfig = {
    apiKey: 'AIzaSyBYlg3FpLvUILXTNWpaRo0W9aUlKaWl3mc',
    authDomain: 'littoralicious.firebaseapp.com',
    projectId: 'littoralicious',
    storageBucket: 'littoralicious.firebasestorage.app',
    messagingSenderId: '517367024770',
    appId: '1:517367024770:web:5d1134186c9d79ba2a389b',
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
