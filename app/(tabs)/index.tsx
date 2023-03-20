import { View, Image, Button, RefreshControl } from "react-native";
import React, { useEffect, useState } from "react";
import { Center, Text, Box, Flex, Divider, FlatList } from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";

// Temporary bounty card to display data
const bountyCard: React.FC<BountyQueryType> = bountyItem => {
  return (
    <Center
      w="full"
      bg="white"
      borderWidth={1}
      rounded="md"
      shadow={3}
      flexDirection="row"
      justifyContent={"start"}
      alignItems="start"
      p={3}
    >
      {/* Image */}
      <Image
        source={{
          uri: bountyItem.images[0],
        }}
        style={{ width: 50, height: 50 }}
        borderRadius={10}
      />
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
  const { data: bountyData, refetch } = useBountiesQuery();

  // Pull to refresh state
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
        renderItem={({ item }) => bountyCard(item)}
        keyExtractor={item => item.createdAt.toString()}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              // Refetch bounties data
              setRefreshing(true);
              refetch()
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
