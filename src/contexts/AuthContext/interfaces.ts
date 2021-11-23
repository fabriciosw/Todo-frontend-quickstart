import React from 'react';
import firebase from '../../config/firebase';

export interface IAuthContext {
  currentUser: firebase.User | null;
  signup: (displayName: string, email: string, password: string) => Promise<firebase.auth.UserCredential>;
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateEmail: (email: string) => Promise<void>;
  updatePassword: (email: string) => Promise<void>;
}

export interface IAuthProvider {
  children: React.ReactElement;
}
