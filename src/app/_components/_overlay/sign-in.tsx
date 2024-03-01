"use client";

import { Fragment } from "react";

import { User } from "firebase/auth";
import { signInWithGoogle, signOut } from "../../../utils/firebase/firebase";

interface SignInProps {
  user: User | null;
}

export default function SignIn({ user }: SignInProps) {
  return (
    <Fragment>
      {user ? (
        <button onClick={signOut}>Sign Out</button>
      ) : (
        <button onClick={signInWithGoogle}>Sign In</button>
      )}
    </Fragment>
  );
}
