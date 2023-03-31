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
const useGetBountyById = (
  queryParams: {
    bountyId: string;
  },
  queryOptions?: QueryOptions
) => {
  // Async function to get the user data from firebase
  const getBounty = async () => {
    try {
      const bounty = await getDoc(doc(db, "Bounty", queryParams.bountyId));
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
    queryKey: ["getBounty", queryParams.bountyId],
    queryFn: getBounty,
    ...queryOptions,
  });
};

export default useGetBountyById;
