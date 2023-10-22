import { ReactNode } from "react";
import { User as FirebaseUser } from "firebase/auth";

export class User {
  id: string;
  firstName?: string;
  lastName?: string;

  constructor(
    id: string,
    firstName: string | undefined,
    lastName: string | undefined
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  public static convertFirebaseUser(firebaseUser?: FirebaseUser | null): User | null {
    if (firebaseUser != null) {
      const userName: string[] | undefined = firebaseUser.displayName?.split(" ");
      const firstName = userName?.at(0);
      const lastName = userName?.at(1);
      return new User(firebaseUser.uid, firstName, lastName);
    }
    return null;
  }
}
