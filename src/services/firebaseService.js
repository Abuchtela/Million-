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
    const q = query(
      collection(firestore, 'scores'),
      orderBy('score', 'desc'),
      limit(10)
    );
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      return [];
    }
    
    // Get user data for each score entry
    const leaderboardData = [];
    for (const scoreDoc of snapshot.docs) {
      const scoreData = scoreDoc.data();
      try {
        const userDoc = await getDoc(doc(firestore, 'users', scoreDoc.id));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          leaderboardData.push({
            id: scoreDoc.id,
            score: scoreData.score,
            name: userData.name || 'Anonymous',
            timestamp: scoreData.timestamp
          });
        } else {
          leaderboardData.push({
            id: scoreDoc.id,
            score: scoreData.score,
            name: 'Anonymous',
            timestamp: scoreData.timestamp
          });
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        // Add entry without user data
        leaderboardData.push({
          id: scoreDoc.id,
          score: scoreData.score,
          name: 'Anonymous',
          timestamp: scoreData.timestamp
        });
      }
    }
    
    return leaderboardData;
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    return [];
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
