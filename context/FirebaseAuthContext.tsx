import { auth } from "../firebaseConfig";
import { useContext, createContext, useEffect, useState } from "react";
import type { User as FireBaseUser } from "firebase/auth";

type ContextState = { user: FireBaseUser | null | undefined };

// Create the context with an initial state of undefined for the user
// The context state will be updated to either null or a user object when the auth state change is detected
const FirebaseAuthContext = createContext<ContextState>({
  user: undefined,
});

// Create a context provider that will be used to wrap the app
// This provider will listen for auth state changes and update the context state accordingly
// The context state will be used by the useFirebaseSession hook to check for auth state at any level of the app
const FirebaseAuthProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  // Set the initial state of the context to undefined
  const [user, setUser] = useState<FireBaseUser | null | undefined>(undefined);

  // Listen for auth state changes and update the context state accordingly
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(setUser);
    return unsubscribe;
  }, []);

  // Return the context provider with the context state
  // The children prop will be all the components that will be wrapped by the provider
  return (
    <FirebaseAuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </FirebaseAuthContext.Provider>
  );
};

const useFirebaseSession = () => {
  const context = useContext(FirebaseAuthContext);
  // Make sure that the hook is used within a provider
  if (context === undefined) {
    throw new Error(
      "useFirebaseSession must be used within a FirebaseAuthProvider"
    );
  }

  //
  return { data: context.user, isLoading: context.user === undefined };
};

export { FirebaseAuthProvider, useFirebaseSession };
