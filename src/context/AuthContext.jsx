import { useContext, useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import { AuthContext } from './AuthContextData';

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authInitialized, setAuthInitialized] = useState(false);

  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthInitialized(true);
      if (!currentUser) {
        setUserProfile(null);
        setLoading(false);
      }
    });
    return () => unsubscribeAuth();
  }, []);

  useEffect(() => {
    if (!user) return;
    
    const unsubscribeProfile = onSnapshot(doc(db, "users", user.uid), (doc) => {
      setUserProfile(doc.exists() ? doc.data() : null);
      setLoading(false);
    }, (error) => {
      console.error("Profile listener error:", error);
      setLoading(false);
    });
    return () => unsubscribeProfile();
  }, [user]);

  const value = {
    user,
    userProfile,
    loading: loading || !authInitialized,
    isAuthenticated: !!user,
    hasStore: !!userProfile,
    // Check both Firebase Auth phone and stored profile phone
    isAdmin: user?.phoneNumber === '+2348067369016' || userProfile?.phone === '+2348067369016'
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
