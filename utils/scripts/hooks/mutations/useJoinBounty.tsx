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
} from "firebase/firestore";
import { useMutation, useQueryClient } from "react-query";
import { db } from "../../../../firebaseConfig";

export type JoinBountyType = {
  bountyId: string;
  hunter: string;
};

// This is the async function that will be called when the mutation is called
const joinBounty = async (variable: JoinBountyType) => {
  try {
    // Create a reference to the bounty collection and add the bounty
    const bountyCollectionRef = collection(db, "Bounty");
    const userCollectionRef = collection(db, "User");
    const bountyRef = doc(bountyCollectionRef, variable.bountyId);
    const hunterRef = doc(userCollectionRef, variable.hunter);

    await runTransaction(db, async transaction => {
      const bountyDoc = await transaction.get(bountyRef);
      const hunterDoc = await transaction.get(hunterRef);
      const prevHunters = bountyDoc.data().hunters;
      const prevBounties = hunterDoc.data().bounties;

      if (prevBounties && !!prevBounties.length) {
        throw new Error("User already joined a bounty");
      }

      if (prevHunters && prevHunters.includes(hunterRef)) {
        throw new Error("User already joined this bounty");
      }

      // Add the hunter ref to the bounty hunter array
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
    onSettled: (data, error, variable, context) => {
      // * Do something upon completion of mutation this can be either success or error
      queryClient.invalidateQueries(["getUserById", { id: variable.hunter }]);
    },
  });
};

export default useJoinBounty;
