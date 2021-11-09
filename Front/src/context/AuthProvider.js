import { useState, useEffect } from 'react';
import AuthContext from './auth-context';
import { auth } from '../services/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';


const AuthProvider = (props) => {
  const [currentUser, setCurrentUser] = useState({});
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  const register = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
          const credentials = await createUserWithEmailAndPassword(auth, email, password);
          const idToken = await credentials.user.getIdToken();
       //    const response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user`, {
        console.log("MY token antes de enviar " + idToken);
         //  const response = await fetch(`http://localhost:3800/user`, {
            let response = await fetch(`${process.env.REACT_APP_BACKEND_BASE_URL}/user`, {
                                    method: 'POST',
                                    headers: {
                                      'Authorization': `Bearer ${idToken}`,
                                      'Content-Type': 'application/json'
                                    }
                                   ,body: JSON.stringify({ "title": 'React Hooks POST Request Example' })
                                  });
          const data = await response.json();
          console.log("MY RESPUESTA" + data);
          resolve(data);
        } catch(e) {
          reject(e);
        }
    });
    
    
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  }

  const logout = () => {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoadingUserInfo(false);
    });
    return unsubscribe
  }, []);
  
  const authContext = {
    currentUser,
    register,
    login,
    logout
  }

  return <AuthContext.Provider value={authContext}>
    {!loadingUserInfo && props.children}
  </AuthContext.Provider>
}

export default AuthProvider;