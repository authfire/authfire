import { Analytics } from 'firebase/analytics';
import { FirebaseApp } from 'firebase/app'
import { AppCheck } from 'firebase/app-check';
import { Auth } from 'firebase/auth';
import { Firestore } from 'firebase/firestore';
import { FirebaseStorage } from 'firebase/storage';
import { atom } from 'nanostores'

const $loading = atom<boolean>(true)
const setLoading = (loading: boolean) => {
  $loading.set(loading);
}

const $app = atom<FirebaseApp | undefined>()

const setApp = (app: FirebaseApp) => {
  $app.set(app);
}

const $appCheck = atom<AppCheck | undefined>(undefined)

const setAppCheck = (appCheck: AppCheck) => {
  $appCheck.set(appCheck);
}

const $auth = atom<Auth | undefined>(undefined)

const setAuth = (auth: Auth) => {
  $auth.set(auth);
}

const $firestore = atom<Firestore | undefined>(undefined)

const setFirestore = (firestore: Firestore) => {
  $firestore.set(firestore);
}

const $storage = atom<FirebaseStorage | undefined>(undefined)

const setStorage = (storage: FirebaseStorage) => {
  $storage.set(storage);
}

const $analytics = atom<Analytics | undefined>(undefined)

const setAnalytics = (analytics: Analytics) => {
  $analytics.set(analytics);
}

export {
  $app, setApp, $appCheck, setAppCheck, $auth, setAuth, $firestore, setFirestore, $storage, setStorage, $analytics, setAnalytics, $loading, setLoading
}
