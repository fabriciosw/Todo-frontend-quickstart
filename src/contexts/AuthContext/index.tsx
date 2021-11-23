import React, { useState, useEffect, useContext } from 'react';
import firebase, { auth } from '../../config/firebase';
import { IAuthContext, IAuthProvider } from './interfaces';

const AuthContext = React.createContext<IAuthContext>({} as IAuthContext);

export function useAuth(): IAuthContext {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: IAuthProvider): React.ReactElement {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  async function signup(displayName: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    return auth.createUserWithEmailAndPassword(email, password).then((user) => {
      auth.currentUser?.updateProfile({ displayName });
      return user;
    });
  }

  function login(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout(): Promise<void> {
    return auth.signOut();
  }

  function resetPassword(email: string): Promise<void> {
    return auth.sendPasswordResetEmail(email);
  }

  async function updateEmail(email: string): Promise<void> {
    return currentUser?.updateEmail(email);
  }

  async function updatePassword(password: string): Promise<void> {
    return currentUser?.updatePassword(password);
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
}
