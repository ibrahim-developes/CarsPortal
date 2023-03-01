import auth from "../config/config";
import { Auth, getAuth, createUserWithEmailAndPassword,  signInWithEmailAndPassword } from 'firebase/auth';

export async function signUpApi(firstName, lastName, mobile, email, pass) {
  try {
    const resp = await createUserWithEmailAndPassword(auth, email, pass);
    console.log('User account created', resp);
    return { success:true , resp};
  } catch (error) {
    console.log('Error creating user account', error);
    return { success:false , error };
  }
}


export async function signInApi(email, pass) {
  try {
    const resp = await signInWithEmailAndPassword(auth, email, pass);
    console.log('User looged in ', resp);
    return { success:true , resp};
  } catch (error) {
    console.log('Error creating user account', error);
    return { success:false , error };
  }
}
