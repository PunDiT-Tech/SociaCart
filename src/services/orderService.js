import { 
  collection, 
  addDoc, 
  updateDoc, 
  doc
} from "firebase/firestore";
import { db } from "./firebase";

export const logOrder = async (data) => {
  return await addDoc(collection(db, "orders"), {
    ...data,
    status: 'pending',
    source: 'whatsapp',
    created_at: new Date().toISOString()
  });
};

export const updateOrderStatus = async (orderId, status) => {
  const orderRef = doc(db, "orders", orderId);
  await updateDoc(orderRef, { status });
};
