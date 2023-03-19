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

const createBounty = async (variable: CreateBountyType) => {
  try {
    const userDocRef = (await getDoc(doc(db, "User", variable.client))).ref;
    const collectionRef = collection(db, "Bounty");
    const newDoc = await addDoc(collectionRef, {
      ...variable,
      client: userDocRef,
    });
    return (await getDoc(newDoc)).data();
  } catch (error) {
    throw error;
  }
};

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
