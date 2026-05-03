import { signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";
import toast from 'react-hot-toast';

export const sendOTP = async (phoneNumber) => {
  try {
    return await signInWithPhoneNumber(auth, phoneNumber);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};
