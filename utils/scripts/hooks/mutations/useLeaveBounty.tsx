import { ref, remove } from "firebase/database";
import {
  collection,
  doc,
  runTransaction,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { RefreshControlComponent } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { db, rtdb } from "../../../../firebaseConfig";

export type leaveBountyType = {
  bountyId: string;
  userId: string;
};

// This is the async function that will be called when the mutation is called
const leaveBounty = async (variable: leaveBountyType) => {
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

      if (!prevBounties || !prevBounties.length) {
        throw new Error("User has not joined a bounty");
      }

      if (!prevHunters || !prevHunters.map(b => b.id).includes(hunterRef.id)) {
        throw new Error("User has not joined this bounty");
      }

      // Remove the userId ref from the bounty userId array
      transaction.update(bountyRef, {
        hunters: prevHunters.filter(h => h.id !== hunterRef.id),
      });

      // Remove the bounty ref from the user bounty array
      transaction.update(hunterRef, {
        bounties: prevBounties.filter(b => b.id !== bountyRef.id),
      });
    });

    // Remove the user from the real time database of hunters
    const bountyRtdbRef = ref(
      rtdb,
      `bounties/${variable.bountyId}/${variable.userId}`
    );
    await remove(bountyRtdbRef);

    return {
      message: "Successfully left bounty",
    };
  } catch (error) {
    // Do something upon error
    throw error;
  }
};

// This is a wrapper around the useMutation hook that will be used in the component
const useLeaveBounty = () => {
  const queryClient = useQueryClient();

  return useMutation(["leaveBounty"], leaveBounty, {
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

export default useLeaveBounty;
