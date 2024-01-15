import { initializeApp} from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage} from 'firebase/storage'


const firebaseConfig = {
    apiKey: "AIzaSyDrKFpE3tu4MQS2c11x1Y5NCIeJ2yinfN0",
    authDomain: "reldtec.firebaseapp.com",
    projectId: "reldtec",
    storageBucket: "reldtec.appspot.com",
    messagingSenderId: "258328966823",
    appId: "1:258328966823:web:709db02a1ee8eb472d0d82",
    measurementId: "G-5KHT354FCK"
  };

  const firebaseApp = initializeApp(firebaseConfig);

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);
  const storage = getStorage(firebaseApp);


  export { auth, db, storage};
