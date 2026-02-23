import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, setDoc, orderBy, limit, getDocs, query } from 'firebase/firestore';

const app = initializeApp(/* your firebase config */);
const auth = getAuth(app);
const firestore = getFirestore(app);

const signup = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error signing up:', error);
    return { success: false, error: error.message };
  }
};

const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Error logging in:', error);
    return { success: false, error: error.message };
  }
};

const storeQuestion = async (question) => {
  try {
    await firestore.collection('questions').add(question);
  } catch (error) {
    console.error('Error storing question:', error);
  }
};

const storeUserData = async (userId, data) => {
  try {
    await firestore.collection('users').doc(userId).set(data);
  } catch (error) {
    console.error('Error storing user data:', error);
  }
};

const storeScore = async (userId, score) => {
  try {
    await firestore.collection('scores').doc(userId).set({ score });
  } catch (error) {
    console.error('Error storing score:', error);
  }
};

const getLeaderboard = async () => {
  try {
    const snapshot = await firestore.collection('scores').orderBy('score', 'desc').limit(10).get();
    return snapshot.docs.map(doc => doc.data());
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
  }
};

export default {
  signup,
  login,
  storeQuestion,
  storeUserData,
  storeScore,
  getLeaderboard,
};
