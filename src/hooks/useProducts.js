import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

export default function useProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      setLoading(false);
      return;
    }

    const q = query(
      collection(db, "products"),
      where("user_id", "==", user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const prods = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Sort by created_at in memory (newest first)
      prods.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      setProducts(prods);
      setLoading(false);
    }, (error) => {
      console.error("Products listener error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  return { products, loading };
}
