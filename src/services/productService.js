import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "./firebase";

export const uploadProductImage = async (userId, file) => {
  const storageRef = ref(storage, `products/${userId}/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);
  return await getDownloadURL(snapshot.ref);
};

export const addProduct = async (data) => {
  return await addDoc(collection(db, "products"), {
    ...data,
    created_at: new Date().toISOString()
  });
};

export const updateProduct = async (productId, data) => {
  const productRef = doc(db, "products", productId);
  await updateDoc(productRef, {
    ...data,
    updated_at: new Date().toISOString()
  });
};

export const deleteProduct = async (productId, imageUrl) => {
  if (imageUrl) {
    try {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    } catch (err) {
      console.error("Failed to delete image:", err);
    }
  }
  await deleteDoc(doc(db, "products", productId));
};
