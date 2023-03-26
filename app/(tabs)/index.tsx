import { View, Image, RefreshControl } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  Center,
  Text,
  Box,
  Flex,
  Divider,
  FlatList,
  Button,
  HStack,
} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import useJoinBounty, {
  JoinBountyType,
} from "../../utils/scripts/hooks/mutations/useJoinBounty";
import {
  QueryObserverResult,
  RefetchOptions,
  RefetchQueryFilters,
  UseMutateFunction,
} from "react-query";
import type { User } from "firebase/auth";
import useGetUser from "../../utils/scripts/hooks/queries/useGetUser";
import type { UserQueryType } from "../../utils/scripts/hooks/queries/useGetUser";

interface bountyCardProps {
  bountyItem: BountyQueryType;
  joinBounty: UseMutateFunction<
    {
      message: string;
    },
    unknown,
    JoinBountyType,
    void
  >;
  sessionData: User;
  userData: UserQueryType;
  refetchUserData: <TPageData>(
    options?: RefetchOptions & RefetchQueryFilters<TPageData>
  ) => Promise<QueryObserverResult<UserQueryType, unknown>>;
  router: ReturnType<typeof useRouter>;
}
// Temporary bounty card to display data
const BountyCard: React.FC<bountyCardProps> = ({
  bountyItem,
  joinBounty,
  sessionData,
  userData,
  refetchUserData,
  router,
}) => {
  return (
    <Center
      w="full"
      bg="white"
      borderWidth={1}
      rounded="md"
      shadow={3}
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
      p={3}
    >
      {/* Image */}
      <HStack direction="column" space={2}>
        <Image
          source={{
            uri: bountyItem.images[0],
          }}
          style={{ width: 50, height: 50 }}
          borderRadius={10}
        />
        {(!userData?.bounties || !userData?.bounties.length) && (
          <Button
            backgroundColor="red.500"
            borderRadius={"full"}
            onPress={() => {
              joinBounty(
                {
                  bountyId: bountyItem.id,
                  userId: sessionData.uid,
                },
                {
                  onSuccess: () => {
                    refetchUserData();
                    router.replace("(tabs)/activity");
                  },
                }
              );
            }}
          >
            Join
          </Button>
        )}
      </HStack>
      <Box
        style={{
          marginLeft: 10,
        }}
        flexShrink={1}
      >
        <Text fontSize="xl">{bountyItem.name}</Text>
        <Text fontSize="md" numberOfLines={2}>
          {bountyItem.appearance}
        </Text>
        <Divider my={2} />
        <Text fontSize="md" numberOfLines={2}>
          {bountyItem.additionalInfo?.length > 0
            ? bountyItem.additionalInfo
            : "No additional info"}
        </Text>
        <Divider my={2} />
        <Text fontSize="md" textAlign="left">
          Last seen: {bountyItem.lastSeen.toDate().toString()}
        </Text>
      </Box>
      <Divider orientation="vertical" mx={2} />
      <Flex direction="column" h="full" grow={1}>
        <Text fontSize="md" textAlign="right">
          type: {bountyItem.category}
        </Text>
        <Text fontSize="md" textAlign="right">
          breed: {bountyItem.breed ?? "unknown"}
        </Text>
        <Text fontSize="md" textAlign="right">
          age: {bountyItem.age ?? "unknown"}
        </Text>
        <Text fontSize="md" textAlign="right">
          $$$ {bountyItem.reward ?? "unknown"}
        </Text>
        <Text fontSize="md" textAlign="right">
          Sex: {bountyItem.gender}
        </Text>
        <Text fontSize="md" textAlign="right">
          Lat: {bountyItem.location.toJSON().latitude}
        </Text>
        <Text fontSize="md" textAlign="right">
          Long: {bountyItem.location.toJSON().longitude}
        </Text>
      </Flex>
    </Center>
  );
};

const FeedPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Use query hook to get bounty data
  const { data: bountyData, refetch: refetchBountData } = useBountiesQuery();

  // User query hook to get user data by id
  const { data: userData, refetch: refetchUserData } = useGetUser({
    userId: sessionData?.uid,
  });

  // Mutation to join bounty
  const { mutate: joinBounty } = useJoinBounty();

  const [refreshing, setRefreshing] = useState(false);

  return (
    <Center
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 10,
        paddingTop: 10,
        backgroundColor: "#fff",
      }}
    >
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ width: "100%", minHeight: "100%" }}
        data={bountyData}
        renderItem={({ item: bountyItem }) => (
          <BountyCard
            bountyItem={bountyItem}
            joinBounty={joinBounty}
            sessionData={sessionData}
            userData={userData}
            refetchUserData={refetchUserData}
            router={router}
          />
        )}
        keyExtractor={item => item.createdAt.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              // Refetch bounties data
              setRefreshing(true);
              refetchBountData()
                .then(res => setRefreshing(false))
                .catch(err => {
                  setRefreshing(false);
                  alert("Error refreshing bounties");
                });
            }}
          />
        }
        ItemSeparatorComponent={() => (
          <Divider backgroundColor="transparent" p={2} />
        )}
        onEndReached={() => {
          // This is where we would load more bounties when we get to the end of the list
          console.log("Getting next 10 bounties");
        }}
      />
    </Center>
  );
};

export default FeedPage;
