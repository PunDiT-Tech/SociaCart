import { 
  onSnapshot, 
  doc,
  setDoc
} from "firebase/firestore";
import { db } from "./firebase";

// Generate a random 6-digit OTP
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Create a verification request in Firestore
export const requestWhatsAppVerification = async (userId, phoneNumber, otp) => {
  const requestId = `verify_${phoneNumber.replace('+', '')}`;
  await setDoc(doc(db, "verifications", requestId), {
    uid: userId,
    phone: phoneNumber,
    code: otp,
    status: 'pending',
    created_at: new Date().toISOString()
  });
  return requestId;
};

// Listen for Admin Approval
export const listenForVerification = (requestId, onVerified) => {
  return onSnapshot(doc(db, "verifications", requestId), (snapshot) => {
    if (snapshot.exists() && snapshot.data().status === 'verified') {
      onVerified(snapshot.data());
    }
  });
};
