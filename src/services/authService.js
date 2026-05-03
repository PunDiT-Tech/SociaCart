import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  signInWithPhoneNumber,
  RecaptchaVerifier
} from "firebase/auth";
import { auth } from "./firebase";
import toast from 'react-hot-toast';

// ============ EMAIL/PASSWORD AUTH ============

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    console.error("Error sending reset email:", error);
    throw error;
  }
};

// ============ PHONE AUTH ============

let recaptchaVerifier;

const getRecaptchaVerifier = () => {
  if (!recaptchaVerifier) {
    recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      badge: 'bottomright',
      callback: () => {
        console.log('reCAPTCHA solved');
      },
      'error-callback': (error) => {
        console.error('reCAPTCHA error:', error);
        toast.error('reCAPTCHA verification failed');
      }
    });
  }
  return recaptchaVerifier;
};

export const sendOTP = async (phoneNumber) => {
  try {
    // Clear existing verifier if any
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }
    
    const verifier = getRecaptchaVerifier();
    console.log('Sending OTP to:', phoneNumber);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, verifier);
    console.log('OTP sent successfully');
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    console.error("Error code:", error?.code);
    console.error("Error message:", error?.message);
    
    // Provide user-friendly error messages
    if (error?.code === 'auth/captcha-check-failed') {
      throw new Error('reCAPTCHA verification failed. Please try again.');
    }
    if (error?.code === 'auth/invalid-phone-number') {
      throw new Error('Invalid phone number format');
    }
    if (error?.code === 'auth/too-many-requests') {
      throw new Error('Too many attempts. Please try again later.');
    }
    if (error?.code === 'auth/missing-phone-number') {
      throw new Error('Phone number is required');
    }
    throw new Error(error?.message || 'Failed to send SMS code');
  }
};

export const confirmOTP = async (confirmationResult, otp) => {
  try {
    console.log('Confirming OTP:', otp);
    const result = await confirmationResult.confirm(otp);
    console.log('OTP confirmed successfully');
    return result.user;
  } catch (error) {
    console.error("Error confirming OTP:", error);
    
    if (error?.code === 'auth/invalid-verification-code') {
      throw new Error('Invalid SMS code. Please try again.');
    }
    if (error?.code === 'auth/session-expired') {
      throw new Error('Session expired. Please request a new code.');
    }
    throw new Error(error?.message || 'Invalid SMS code');
  }
};

export const clearRecaptcha = () => {
  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
    recaptchaVerifier = null;
  }
};

// ============ LOGOUT ============

export const logOut = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out:", error);
    throw error;
  }
};
