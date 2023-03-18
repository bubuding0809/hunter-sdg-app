import { query, collection, getDocs } from "firebase/firestore";
import { useQuery } from "react-query";
import { db } from "../../../../firebaseConfig";

// Async function to get the bounty data from firebase
const getBounties = async () => {
  const q = query(collection(db, "Bounty"));

  const bountyData = [];
  const snapShot = await getDocs(q);
  snapShot.forEach(doc => {
    const bounty = doc.data();
    bountyData.push(bounty);
  });

  return bountyData;
};

type QueryOptions = {
  refetchInterval?: number;
  enabled?: boolean;
};

// Use react-query to get the bounty data
const useBountiesQuery = (queryOptions?: QueryOptions) => {
  return useQuery(["bounties"], getBounties, queryOptions);
};

export default useBountiesQuery;
