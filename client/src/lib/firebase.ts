// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, serverTimestamp, query, orderBy, limit, getDocs } from "firebase/firestore";
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import type { User } from "firebase/auth";

// Debug: Check if environment variables are loaded
// Environment variables are validated below - no logging for security

// Validate that all required environment variables are present
const requiredEnvVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID'
];

requiredEnvVars.forEach(envVar => {
  if (!import.meta.env[envVar]) {
    throw new Error(`Missing required environment variable: ${envVar}`);
  }
});

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
console.log('🔥 Firebase: Initializing Firebase app...');
const app = initializeApp(firebaseConfig);
console.log('🔥 Firebase: App initialized successfully');

let analytics: ReturnType<typeof getAnalytics> | undefined = undefined;
if (typeof window !== "undefined") {
  try {
    analytics = getAnalytics(app);
    console.log('🔥 Firebase: Analytics initialized successfully');
  } catch (e) {
    console.warn('🔥 Firebase: Analytics initialization failed (this is usually okay):', e);
  }
}

const auth = getAuth(app);
console.log('🔥 Firebase: Auth initialized');

const db = getFirestore(app);
console.log('🔥 Firebase: Firestore initialized');

// const storage = getStorage(app);
const googleProvider = new GoogleAuthProvider();
console.log('🔥 Firebase: All services initialized successfully');

// Contact form interface
export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  phone?: string;
  country?: string;
  state?: string;
  course?: string;
  timestamp?: any;
  source?: string; // To track which page the form was submitted from
}

// Enquiry form interface (Services page)
export interface EnquiryFormData {
  name: string;
  email: string;
  message: string;
  phone: string;
  country: string;
  state: string;
  course: string;
  courseTitle?: string;
  timestamp?: any;
  source?: string;
  fileUrl?: string; // URL of uploaded file
  fileName?: string; // Original filename
}

// Authentication functions
export const signUpWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signInWithEmail = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return { user: result.user, error: null };
  } catch (error: any) {
    return { user: null, error: error.message };
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
    return { error: null };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const onAuthStateChange = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

// Firestore functions for contact forms
export const submitContactForm = async (formData: ContactFormData) => {
  try {
    console.log('🔥 Firebase: Starting contact form submission to Firestore');
    console.log('🔥 Firebase: Database instance:', db ? 'initialized' : 'not initialized');
    console.log('🔥 Firebase: Form data:', {
      name: formData.name,
      email: formData.email,
      source: formData.source,
      hasMessage: !!formData.message
    });

    const submissionData = {
      ...formData,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    };

    console.log('🔥 Firebase: Attempting to add document to contactSubmissions collection');
    
    const docRef = await addDoc(collection(db, "contactSubmissions"), submissionData);
    
    console.log('🔥 Firebase: Document successfully written with ID:', docRef.id);
    return { id: docRef.id, error: null };
  } catch (error: any) {
    console.error('🔥 Firebase: Error submitting contact form:', error);
    console.error('🔥 Firebase: Error details:', {
      code: error.code,
      message: error.message,
      details: error.details,
      stack: error.stack
    });
    
    // Return more specific error information
    let errorMessage = error.message;
    if (error.code) {
      errorMessage = `${error.code}: ${error.message}`;
    }
    
    return { id: null, error: errorMessage };
  }
};

export const getRecentContactSubmissions = async (limitCount: number = 10) => {
  try {
    const q = query(
      collection(db, "contactSubmissions"),
      orderBy("timestamp", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const submissions = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { submissions, error: null };
  } catch (error: any) {
    return { submissions: [], error: error.message };
  }
};

// Firestore functions for service enquiries (new collection)
export const submitServiceEnquiry = async (formData: EnquiryFormData) => {
  try {
    const docRef = await addDoc(collection(db, "serviceEnquiries"), {
      ...formData,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
    });
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

export const getRecentServiceEnquiries = async (limitCount: number = 10) => {
  try {
    const q = query(
      collection(db, "serviceEnquiries"),
      orderBy("timestamp", "desc"),
      limit(limitCount)
    );
    const querySnapshot = await getDocs(q);
    const enquiries = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return { enquiries, error: null };
  } catch (error: any) {
    return { enquiries: [], error: error.message };
  }
};

// File upload function using Cloudinary
export const uploadFile = async (file: File): Promise<{ url: string; error: string | null }> => {
  try {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'enquiry-uploads');
    formData.append('cloud_name', 'dmd4xxvmy');
    formData.append('folder', 'enquiry-files');

    const response = await fetch(`https://api.cloudinary.com/v1_1/dmd4xxvmy/auto/upload`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Upload failed: ${response.statusText}`);
    }

    const result = await response.json();
    return { url: result.secure_url, error: null };
  } catch (error: any) {
    console.error('Cloudinary upload error:', error);
    return { url: '', error: error.message };
  }
};

// Enhanced service enquiry submission with file upload
export const submitServiceEnquiryWithFile = async (formData: EnquiryFormData, file?: File) => {
  try {
    let fileUrl = '';
    let fileName = '';

    // Upload file if provided (no authentication required)
    if (file) {
      const uploadResult = await uploadFile(file);
      
      if (uploadResult.error) {
        return { id: null, error: `File upload failed: ${uploadResult.error}` };
      }
      fileUrl = uploadResult.url;
      fileName = file.name;
    }

    // Save enquiry data with file information
    const enquiryData = {
      ...formData,
      fileUrl,
      fileName,
      timestamp: serverTimestamp(),
      createdAt: new Date().toISOString(),
      userId: auth.currentUser?.uid || null,
    };

    const docRef = await addDoc(collection(db, "serviceEnquiries"), enquiryData);
    
    return { id: docRef.id, error: null };
  } catch (error: any) {
    return { id: null, error: error.message };
  }
};

// Test Firebase connection
export const testFirebaseConnection = async () => {
  try {
    console.log('🔥 Firebase: Testing connection...');
    
    // Test Firestore connection by trying to get a non-existent document
    const testDoc = await getDocs(query(collection(db, "contactSubmissions"), limit(1)));
    
    console.log('🔥 Firebase: Connection test successful! Firestore is accessible.');
    console.log('🔥 Firebase: Found', testDoc.size, 'existing contact submissions');
    
    return { success: true, error: null };
  } catch (error: any) {
    console.error('🔥 Firebase: Connection test failed:', error);
    
    if (error.code === 'permission-denied') {
      console.error('🔥 Firebase: Permission denied - check Firestore security rules');
    } else if (error.code === 'unavailable') {
      console.error('🔥 Firebase: Firestore is currently unavailable');
    }
    
    return { success: false, error: error.message };
  }
};

export { auth, db, analytics }; 