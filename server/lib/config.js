import firebase from 'firebase/compat/app';
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import 'firebase/compat/firestore';

export default function constructFB(info) {

    // const {
    //     apiKey,
    //     authDomain,
    //     projectId,
    //     storageBucket,
    //     messagingSenderId,
    //     appId,
    //     measurementId,
    //     FIREBASE_DATABASE_URL,
    //     stripeKey,
    //     stripeKeySecret,
    // } = info.public
    console.log(info.public.firebase.apiKey)

    const secondFirebaseConfig = {
      apiKey: info.public.firebase.apiKey,
      authDomain: info.public.firebase.authDomain,
      projectId: info.public.firebase.projectId,
      storageBucket: info.public.firebase.storageBucket,
      messagingSenderId: info.public.firebase.messagingSenderId,
      appId: info.public.firebase.appId,
    }

    const secondFirebaseApp = firebase.initializeApp(secondFirebaseConfig, 'second');

    // init firebase & store
    const secondFirestore = secondFirebaseApp.firestore();
    const auth = getAuth(secondFirebaseApp)

    const infoFinal = {store: secondFirestore, auth: auth}
    return infoFinal
}