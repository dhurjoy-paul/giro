import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { app } from '../firebase/firebase.config';
// import { toast } from 'react-toastify';

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
export const AuthContext = createContext(null)
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-

// AuthProvider
const AuthProvider = ({ children }) => {
  const auth = getAuth(app)
  const googleProvider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const notifySuccess = (msg) => toast.success(<ToastSuccess msg={msg} />);
  const ToastSuccess = ({ msg }) => (
    <span className='text-lg text-green-600 font-semibold font-bricolage-grotesque leading-6'>{msg}</span>
  );

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

  const logOut = () => {
    setLoading(true);
    signOut(auth);
    notifySuccess("Logout successful");
    return
  }

  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    })
  }

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, async currentUser => {
      console.log('CurrentUser-->', currentUser?.displayName, currentUser?.email)

      try {
        if (currentUser) {
          setUser(currentUser);
        } else {
          setUser(currentUser);
          localStorage.removeItem('token');
        }
      } catch (err) {
        console.error('Auth error==>', err);
      } finally {
        setLoading(false);
      }
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