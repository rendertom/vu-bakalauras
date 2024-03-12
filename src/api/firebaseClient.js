import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import {
  and,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from 'firebase/firestore';

import { AUTH, DB } from './FirebaseConfig';
import userType from '../config/userType';

const COLLECTION_CONNECTIONS = 'connections';
const COLLECTION_EXAMS = 'exams';
const COLLECTION_USERS = 'users';

export default {
  async createConnection(connection) {
    const connectionsRef = collection(DB, COLLECTION_CONNECTIONS);
    const docRef = doc(connectionsRef, connection.id);

    await setDoc(docRef, connection);

    return connection;
  },

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

      const user = { email, firstName, lastName, uid, type };

      await setDoc(docRef, user);

      return user;
    }
  },

  async deleteConnection(id) {
    const docRef = doc(DB, `${COLLECTION_CONNECTIONS}/${id}`);
    await deleteDoc(docRef);
  },

  async getConnectionsBy(key, value) {
    const q = query(
      collection(DB, COLLECTION_CONNECTIONS),
      where(key, '==', value)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
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
      where('type', '==', userType.STUDENT)
    );

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map((doc) => doc.data());
  },

  async getUser(uid) {
    const docRef = doc(DB, `${COLLECTION_USERS}/${uid}`);
    const docSnap = await getDoc(docRef);

    return docSnap;
  },

  async getUserByEmailAndType(email, type) {
    try {
      const q = query(
        collection(DB, COLLECTION_USERS),
        and(where('email', '==', email), where('type', '==', type))
      );

      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map((doc) => doc.data())[0];
    } catch (error) {
      console.log(error);
    }
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

  async updateConnection(id, connection) {
    const docRef = doc(DB, `${COLLECTION_CONNECTIONS}/${id}`);
    await updateDoc(docRef, connection);
  },
};
