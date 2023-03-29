import {
  getDoc,
  doc,
  DocumentReference,
  DocumentData,
} from "firebase/firestore";
import { db } from "../../../../firebaseConfig";
import { useQuery } from "react-query";

export type UserQueryType = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  bounties?: DocumentReference<DocumentData>[];
};

type QueryOptions = {
  refetchInterval?: number;
  enabled?: boolean;
};

// Use react-query to get the bounty data
const useGetUser = (
  queryParams: {
    userId: string;
  },
  queryOptions?: QueryOptions
) => {
  // Async function to get the user data from firebase
  const getUser = async () => {
    try {
      const user = await getDoc(doc(db, "User", queryParams.userId));
      return user.data() as UserQueryType;
    } catch (err) {
      throw err;
    }
  };

  return useQuery({
    queryKey: ["getUser", queryParams.userId],
    queryFn: getUser,
    ...queryOptions,
  });
};

export default useGetUser;
