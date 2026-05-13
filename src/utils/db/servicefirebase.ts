import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  doc,
  query,
  addDoc,
  where,
  updateDoc,
} from "firebase/firestore";
import app from "./firebase";
import bcrypt from "bcrypt";

const db = getFirestore(app);

export async function retrieveProducts(collectionName: string) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map((docItem) => ({
    id: docItem.id,
    ...docItem.data(),
  }));
}

export async function retrieveDataByID(collectionName: string, id: string) {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Ambil data user berdasarkan email (untuk login credentials)
export async function signIn(email: string) {
  const q = query(collection(db, "users"), where("email", "==", email));
  const querySnapshot = await getDocs(q);
  const data = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  return data.length > 0 ? data[0] : null;
}

// Registrasi user baru via form
export async function signUp(userData: any, callback: Function) {
  const q = query(collection(db, "users"), where("email", "==", userData.email));
  const querySnapshot = await getDocs(q);

  if (!querySnapshot.empty) {
    return callback({ status: false, message: "Email sudah digunakan" });
  }

  userData.password = await bcrypt.hash(userData.password, 10);
  userData.role = "user"; // Default role untuk registrasi manual

  try {
    await addDoc(collection(db, "users"), userData);
    callback({ status: true, message: "User registered successfully" });
  } catch (error: any) {
    callback({ status: false, message: error.message });
  }
}

// Login/Registrasi otomatis via Google
export async function signInWithGoogle(userData: any, callback: Function) {
  try {
    const q = query(collection(db, "users"), where("email", "==", userData.email));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      // User sudah ada, ambil ID dan Role lama
      const existingUser = querySnapshot.docs[0];
      const userId = existingUser.id;
      userData.role = existingUser.data().role;

      // Update data terbaru (misal foto profil baru)
      await updateDoc(doc(db, "users", userId), userData);
      
      callback({ status: true, data: userData });
    } else {
      // User baru dari Google
      userData.role = "member"; // Default role untuk user Google baru
      await addDoc(collection(db, "users"), userData);
      
      callback({ status: true, data: userData });
    }
  } catch (error: any) {
    callback({ status: false, message: error.message });
  }
}