import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const auth = firebase.auth();
const firestore = firebase.firestore();

const signup = async (email, password) => {
  try {
    await auth.createUserWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('Error signing up:', error);
  }
};

const login = async (email, password) => {
  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (error) {
    console.error('Error logging in:', error);
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
