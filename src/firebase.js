
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyCQiPvUFnlSGKXO3ug0OznLzeqjH5ZYYDI",
  authDomain: "netflix-clone-7fd26.firebaseapp.com",
  projectId: "netflix-clone-7fd26",
  storageBucket: "netflix-clone-7fd26.appspot.com",
  messagingSenderId: "1052722016888",
  appId: "1:1052722016888:web:a3b76f320c67b525f9f38d"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)


const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);      
        const user = res.user;   
        await addDoc(collection(db,"user"),{
            uid:user.uid,
            name,
            authProvider:"",
            email,
        })       
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login =async (email,password)=>{
    try {
        await signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth)
}


export {auth , db , login , signup , logout}