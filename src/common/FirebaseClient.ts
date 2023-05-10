// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytes,
  UploadMetadata,
} from 'firebase/storage';

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

export class FirebaseClient {
  constructor() {
    initializeApp(firebaseConfig);
  }

  async sendFile(
    filePath: string,
    fileName: string,
    fileData: any,
    contentType: string
  ) {
    const storage = getStorage();

    const storageRef = ref(storage, filePath + fileName);

    const metadata: UploadMetadata = {
      contentType: contentType,
    };

    try {
      const response = await uploadBytes(storageRef, fileData, metadata);

      const downloadURL = await getDownloadURL(response.ref);

      return {
        success: true,
        filename: fileName,
        ...metadata,
        url: downloadURL,
      };
    } catch (err) {
      console.error(err);
    }
  }

  async getFile(filePath: string) {
    const storage = getStorage();

    const storageRef = ref(storage, filePath);

    const downloadURL = await getDownloadURL(storageRef);

    return downloadURL;
  }
}
