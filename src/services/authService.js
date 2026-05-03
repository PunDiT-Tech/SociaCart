import { 
  RecaptchaVerifier, 
  signInWithPhoneNumber 
} from "firebase/auth";
import { auth } from "./firebase";
import toast from 'react-hot-toast'; // Import toast

export const setupRecaptcha = (containerId) => {
  if (window.recaptchaVerifier) return; // Avoid re-initializing
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
    },
    'error-callback': () => {
      console.error("reCAPTCHA verification failed.");
      toast.error("reCAPTCHA verification failed. Please try again.");
    }
  });
};

export const sendOTP = async (phoneNumber) => {
  const appVerifier = window.recaptchaVerifier;
  if (!appVerifier) {
    console.error("RecaptchaVerifier not initialized.");
    throw new Error("reCAPTCHA is not ready.");
  }
  try {
    return await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};
