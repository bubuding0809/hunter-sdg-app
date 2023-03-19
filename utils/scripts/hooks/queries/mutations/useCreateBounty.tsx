import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { Modify } from "react-native-maps/lib/sharedTypesInternal";
import { useMutation } from "react-query";
import { db } from "../../../../../firebaseConfig";
import { Bounty } from "../../../types";

export type CreateBountyType = Modify<
  Bounty,
  {
    client: string;
  }
>;

// This is the async function that will be called when the mutation is called
const createBounty = async (variable: CreateBountyType) => {
  try {
    // First get document ref to the user that is creating the bounty
    const userDocRef = doc(db, "User", variable.client);

    // Create a reference to the bounty collection and add the bounty
    const collectionRef = collection(db, "Bounty");
    const newDoc = await addDoc(collectionRef, {
      ...variable,
      client: userDocRef,
    });

    // Return the data of the newly created bounty
    return (await getDoc(newDoc)).data();
  } catch (error) {
    // Do something upon error
    throw error;
  }
};

// This is a wrapper around the useMutation hook that will be used in the component
const useCreateBounty = () => {
  return useMutation(["createBounty"], createBounty, {
    onMutate: variable => {
      // * Do something upon request of mutation
    },
    onError: (error, variable, context) => {
      // * Do something upon error
    },
    onSuccess: (data, variable, context) => {
      // * Do something upon success
    },
    onSettled: (data, error, variable, context) => {
      // * Do something upon completion of mutation this can be either success or error
    },
  });
};

export default useCreateBounty;
