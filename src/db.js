import firebase from '@firebase/app';
import 'firebase/database'
firebase.initializeApp({
    apiKey:"",
    authDomain:"reactjst3h2212.firebaseapp.com",
    projectId:"reactjst3h2212",
})
const db=firebase.database();
export default db;