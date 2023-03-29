import {
  addDoc,
  collection,
  doc,
  getDoc,
  Timestamp,
  serverTimestamp,
  updateDoc,
  runTransaction,
  query,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { db } from "../../../../firebaseConfig";

export type JoinBountyType = {
  bountyId: string;
  userId: string;
};

// This is the async function that will be called when the mutation is called
const joinBounty = async (variable: JoinBountyType) => {
  try {
    // Create a reference to the bounty collection and add the bounty
    const bountyCollectionRef = collection(db, "Bounty");
    const userCollectionRef = collection(db, "User");
    const bountyRef = doc(
      bountyCollectionRef,
      variable.bountyId
    ) as DocumentReference<DocumentData>;
    const hunterRef = doc(
      userCollectionRef,
      variable.userId
    ) as DocumentReference<DocumentData>;

    await runTransaction(db, async transaction => {
      const bountyDoc = await transaction.get(bountyRef);
      const hunterDoc = await transaction.get(hunterRef);
      const prevHunters = bountyDoc.data()
        .hunters as DocumentReference<DocumentData>[];
      const prevBounties = hunterDoc.data()
        .bounties as DocumentReference<DocumentData>[];

      if (prevBounties && !!prevBounties.length) {
        throw new Error("User already joined a bounty");
      }

      if (prevHunters && prevHunters.map(b => b.id).includes(hunterRef.id)) {
        throw new Error("User already joined this bounty");
      }

      // Add the userId ref to the bounty userId array
      transaction.update(bountyRef, {
        hunters: prevHunters
          ? [...bountyDoc.data().hunters, hunterRef]
          : [hunterRef],
      });

      // Add the bounty ref to the user bounty array
      transaction.update(hunterRef, {
        bounties: prevBounties
          ? [...hunterDoc.data().bounties, bountyRef]
          : [bountyRef],
      });
    });

    return {
      message: "Successfully joined bounty",
    };
  } catch (error) {
    // Do something upon error
    throw error;
  }
};

// This is a wrapper around the useMutation hook that will be used in the component
const useJoinBounty = () => {
  const queryClient = useQueryClient();

  return useMutation(["joinBounty"], joinBounty, {
    onMutate: async variable => {
      // * Do something before mutation
    },
    onError: (error, variable, context) => {
      // * Do something upon error
    },
    onSuccess: (data, variable, context) => {
      // * Do something upon success
    },
    onSettled: async (data, error, variable, context) => {
      // * Do something upon completion of mutation this can be either success or error
    },
  });
};

export default useJoinBounty;
