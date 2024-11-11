import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  deleteUser,
  getAuth,
} from "firebase/auth";
import { firebaseApp } from "../../utils/firebaseConfig";

const auth = getAuth(firebaseApp);

export const createFirebaseUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  const firebaseUser = userCredential.user;
  await sendEmailVerification(firebaseUser);
  return firebaseUser;
};

export const deleteFirebaseUser = async (firebaseUser: any) => {
  await deleteUser(firebaseUser);
};

export const wait = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const pollEmailVerification = async (
  firebaseUser: any,
  maxAttempts = 30,
  pollInterval = 10000
) => {
  let attempts = 0;

  while (attempts < maxAttempts) {
    await wait(pollInterval);
    await firebaseUser.reload();

    if (firebaseUser.emailVerified) {
      return true;
    }

    attempts++;
  }
  return false;
};
