"use client";
import FeedSection from "./_components/_overlay/feed";
import { useEffect, useState } from "react";
import { onAuthStateChangedHelper } from "../utils/firebase/firebase";
import { User } from "firebase/auth";
import SignIn from "./_components/_overlay/sign-in";
import MapComponent from "./_components/_map/mainmap";
import { MapProvider } from "./_providers/mapprovider";

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  useEffect(() => {
    const unsubscribe = onAuthStateChangedHelper((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  });
  return (
    <MapProvider>
      <div>
        <div className="relative h-[100dvh] w-[100vw] mapboxgl-map">
          <div className="absolute h-full w-full justify-center pointer-events-auto">
            <MapComponent />
            <FeedSection />
            <div className="fixed top-10 text-white bg-gray-900/70 pt-2 pr-2 mt-1 mr-1">
              {user ? (
                <h1>Welcome, {user.displayName}</h1>
              ) : (
                <h1>Welcome, Guest</h1>
              )}
              <SignIn user={user} />
            </div>
          </div>
        </div>
      </div>
    </MapProvider>
  );
}
