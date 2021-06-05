import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

var config = {
    apiKey: "AIzaSyCvJCRKGEb2lfoWlhdQdCD9d-00P_ygJsI",
    authDomain: "clothing-store-db-dffdf.firebaseapp.com",
    projectId: "clothing-store-db-dffdf",
    storageBucket: "clothing-store-db-dffdf.appspot.com",
    messagingSenderId: "257948308915",
    appId: "1:257948308915:web:0cd7b6a89961f39aa3a7c6"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) {
        return null;
    }

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();
    if(snapShot.exists) {
        return userRef;
    }

    const { displayName, email } = userAuth;
    const createdAt = new Date();

    await userRef.set({
        displayName: displayName,
        email: email,
        createdAt: createdAt,
        ...additionalData
    });

    return userRef;
}