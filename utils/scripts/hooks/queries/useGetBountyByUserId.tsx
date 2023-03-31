import {
  getDoc,
  doc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { useQuery } from "react-query";
import type { BountyQueryType } from "./useGetBounties";

type QueryOptions = {
  refetchInterval?: number;
  enabled?: boolean;
};

// Use react-query to get the bounty data
const useGetBountyByUserId = (
  queryParams: {
    userId: string;
  },
  queryOptions?: QueryOptions
) => {
  // Async function to get the user data from firebase
  const getBounty = async () => {
    try {
      const user = await getDoc(doc(db, "User", queryParams.userId));
      const userBounty = user.data()?.bounties[0] as
        | DocumentReference<DocumentData>
        | undefined;

      // If the user has no bounty, return null
      if (!userBounty) {
        return null;
      }

      // Else return the bounty data with the id
      const bounty = await getDoc(userBounty);
      const res = {
        ...bounty.data(),
        id: bounty.id,
      };

      return res as BountyQueryType;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({
    queryKey: ["getBounty", queryParams.userId],
    queryFn: getBounty,
    ...queryOptions,
  });
};

export default useGetBountyByUserId;
