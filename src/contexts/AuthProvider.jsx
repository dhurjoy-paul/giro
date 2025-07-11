import axios from 'axios';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../firebase/firebase.config';
// import { toast } from 'react-toastify';

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export const AuthContext = createContext(null)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// AuthProvider
const AuthProvider = ({ children }) => {
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider();
  // const notifySuccess = () => toast.success(<ToastSuccess />);
  // const notifyFailed = (error) => toast.error(<ToastFailed error={error} />);
  // const ToastSuccess = () => (
  //   <span className='text-lg text-green-600 font-semibold font-poppins'>Profile updated!</span>
  // );
  // const ToastFailed = ({ error }) => (
  //   <div className='font-semibold font-poppins'>
  //     <div className='flex gap-3 mb-1'>
  //       <span className='text-lg text-red-600 font-semibold font-poppins'>Profile didn't update!</span>
  //     </div>
  //     <p>{error}</p>
  //   </div>
  // );

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
  }

  const logOut = () => { setLoading(true); return signOut(auth) }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser -->', currentUser?.displayName, currentUser?.email)
      if (currentUser) {
        setUser(currentUser);

        // Get JWT token
        await axios.post(
          `${import.meta.env.VITE_API_URL}/jwt`,
          {
            email: currentUser?.email,
          },
          { withCredentials: true }
        )
      }
      else {
        setUser(currentUser)
        await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
          withCredentials: true,
        })
      }
      setLoading(false)
    });
    return () => unSubscribe();
  }, []);

  const authInfo = { user, setUser, loading, setLoading, createUser, signIn, signInWithGoogle, logOut, updateUserProfile };

  return (
    <AuthContext.Provider value={authInfo}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider