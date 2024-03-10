import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';

import { AUTH, DB } from './FirebaseConfig';

const COLLECTION_EXAMS = 'exams';
const COLLECTION_USERS = 'users';

export default {
  async createUser(email, firstName, lastName, password, type) {
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
        type,
      };

      await setDoc(docRef, user);

      return user;
    }
  },

  async getExamsByUser(uid) {
    const q = query(
      collection(DB, COLLECTION_EXAMS),
      where('userId', '==', uid)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  },

  async getStudents() {
    const q = query(
      collection(DB, COLLECTION_USERS),
      where('type', '==', 'STUDENT')
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  },

  async getUser(uid) {
    const docRef = doc(DB, `${COLLECTION_USERS}/${uid}`);
    const docSnap = await getDoc(docRef);

    return docSnap;
  },

  onAuthStateChanged: (callback) => onAuthStateChanged(AUTH, callback),

  async saveTasks(tasks) {
    const examsRef = collection(DB, COLLECTION_EXAMS);
    const docRef = doc(examsRef);

    await setDoc(docRef, tasks);
  },

  async signIn(email, password) {
    const userCredential = await signInWithEmailAndPassword(
      AUTH,
      email,
      password
    );

    return userCredential;
  },

  signOut: async () => await AUTH.signOut(),
};
