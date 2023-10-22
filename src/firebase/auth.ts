import { addUser } from "../api/firebaseAPI";
import { auth } from "./config";
import { User, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from "firebase/auth";

export interface UserDetails {
  firstName: string;
  lastName: string;
}

export async function registerUser(email: string, password: string, userDetails?: UserDetails) {
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed up
    const user = userCredential.user;
    console.log("Registered user. User credentials: " + user)

    if (userDetails != undefined) {
      updateUser(userDetails)
    }
    
    addUser(user.uid)
    // ask to auth w/ spotify
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Failed to register user. Error code: " + errorCode + ". Error message: " + errorMessage + ".")
  });
}

async function updateUser(userDetails: UserDetails) {
  if (auth.currentUser == undefined) {
    throw "Current user is undefined";
  }
  return updateProfile(auth.currentUser, {
    displayName: userDetails.firstName + " " + userDetails.lastName
  }).then(() => {
    console.log("Profile updated.");
  }).catch((error) => {
    console.error("Profile could not be updated. Error: " + error);
  });
}

export async function loginUser(email: string, password: string): Promise<User | undefined> {
  return signInWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Logged in 
    const user = userCredential.user;
    console.log("Logged in as user. User credentials: " + user)

    return user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Failed to login as user. Error code: " + errorCode + ". Error message: " + errorMessage + ".")
    // throw error;
    return undefined;
  });
}

export async function logoutUser() {
  return signOut(auth)
  .then(() => {
    console.log("Logged out.")
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error("Failed to logout. Error code: " + errorCode + ". Error message: " + errorMessage + ".")
    // throw error;
    return undefined;
  });
}