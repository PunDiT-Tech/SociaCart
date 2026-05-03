import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "./firebase";
import toast from 'react-hot-toast';

let recaptchaVerifier;

const getRecaptchaVerifier = () => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      badge: 'bottomright'
    });
  }
  return recaptchaVerifier;
};

export const sendOTP = async (phoneNumber) => {
  try {
    const verifier = getRecaptchaVerifier();
    return await signInWithPhoneNumber(auth, phoneNumber, verifier);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

export const clearRecaptcha = () => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
    recaptchaVerifier = null;
  }
};
