import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';

import { AUTH, DB } from './FirebaseConfig';

const COLLECTION_USERS = 'users';

export default {
  signOut: async () => {
    await AUTH.signOut();
  },

  onAuthStateChanged: (callback) => {
    onAuthStateChanged(AUTH, callback);
    // firebase.auth().onAuthStateChanged((user) => callback(user));
  },

  async createUser(email, firstName, lastName, password) {
    const userCredential = await createUserWithEmailAndPassword(
      AUTH,
      email,
      password
    );

    if (userCredential) {
      const { uid } = userCredential.user;

      const usersRef = collection(DB, COLLECTION_USERS);
      const docRef = doc(usersRef, uid);

      const user = {
        email,
        firstName,
        lastName,
        uid,
        // likes: [],
      };

      await setDoc(docRef, user);

      return user;
    }
  },

  async getUser(uid) {
    const docRef = doc(DB, `${COLLECTION_USERS}/${uid}`);
    const docSnap = await getDoc(docRef);

    return docSnap;
  },

  async signIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      AUTH,
      email,
      password
    );

    return userCredential;
  },
};
