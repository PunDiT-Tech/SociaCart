import { 
  doc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs,
  limit 
} from "firebase/firestore";
import { db } from "./firebase";

export const getStoreBySlug = async (slug) => {
  const q = query(collection(db, "users"), where("store_name", "==", slug), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  return { id: querySnapshot.docs[0].id, ...querySnapshot.docs[0].data() };
};

export const createStore = async (userId, data) => {
  const storeRef = doc(db, "users", userId);
  await setDoc(storeRef, {
    ...data,
    id: userId,
    created_at: new Date().toISOString()
  });
};

export const updateStore = async (userId, data) => {
  const storeRef = doc(db, "users", userId);
  await updateDoc(storeRef, {
    ...data,
    updated_at: new Date().toISOString()
  });
};
