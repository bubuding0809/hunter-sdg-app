import {
  query,
  collection,
  getDocs,
  limit,
  orderBy,
  Timestamp,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { useQuery } from "react-query";
import { Bounty } from "../../types";
import { Modify } from "react-native-maps/lib/sharedTypesInternal";

export type BountyQueryType = Modify<
  Bounty,
  {
    lastSeen: Timestamp;
    createdAt: Timestamp;
    id: string;
  }
>;

// Async function to get the bounty data from firebase
const getBounties = async () => {
  // limit query to only 10 bounties and order by creation date from newest to oldest
  const q = query(
    collection(db, "Bounty"),
    orderBy("createdAt", "desc"),
    limit(10)
  );

  // Collect all the bounty data into an array and return it
  const bountyData = [];
  const snapShot = await getDocs(q);
  snapShot.forEach(doc => {
    bountyData.push({
      ...doc.data(),
      id: doc.id,
    });
  });

  return bountyData as BountyQueryType[];
};

type QueryOptions = {
  refetchInterval?: number;
  enabled?: boolean;
};

// Use react-query to get the bounty data
const useGetBounties = (queryOptions?: QueryOptions) => {
  return useQuery(["getBounties"], getBounties, queryOptions);
};

export default useGetBounties;
