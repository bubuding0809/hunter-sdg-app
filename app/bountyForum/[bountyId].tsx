import { Platform } from "react-native";
import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  HStack,
  KeyboardAvoidingView,
  VStack,
  Text,
  Divider,
  FlatList,
  Image,
} from "native-base";
import { useRouter, useSearchParams, Stack } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import useGetBountyById from "../../utils/scripts/hooks/queries/useGetBountyById";
import ChatInput from "../../components/Chat/ChatInput";
import { rtdb } from "../../firebaseConfig";
import { ref, onValue, set } from "firebase/database";

import type { Unsubscribe } from "firebase/database";

export type ForumMessageType = {
  user: {
    userId: string;
    name: string;
    profilePicture: string;
  };
  message: string;
  timestamp: number;
};

const PLACE_HOLDER_IMAGE =
  "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

const bountyForum = () => {
  const { bountyId, bountyName } = useSearchParams();

  // Query to get bounty data
  const { data: bountyData } = useGetBountyById(
    {
      bountyId: (bountyId ?? "") as string,
    },
    {
      enabled: !!bountyId,
    }
  );

  const [forumMessages, setForumMessages] = useState<ForumMessageType[]>([]);

  // Subscribe to forum chat room on real time database
  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;
    if (bountyId) {
      const forumRef = ref(rtdb, `forums/${bountyId}/messages`);
      unsubscribe = onValue(forumRef, snapshot => {
        const data = snapshot.val();
        setForumMessages(data ?? []);
      });
    }
    return unsubscribe;
  }, []);

  const handleSendMessage = (message: ForumMessageType) => {
    const forumRef = ref(rtdb, `forums/${bountyId}/messages`);
    const data = [...forumMessages, message];
    set(forumRef, data);
  };

  return (
    <>
      <Stack.Screen
        options={{
          title: "Bounty Forum",
        }}
      />
      <SafeAreaView
        edges={["bottom"]}
        style={{
          backgroundColor: "white",
          height: "100%",
        }}
      >
        {/* Bounty banner */}
        <HStack
          p={2}
          borderBottomColor="gray.200"
          bgColor="white"
          zIndex={1}
          shadow={1}
          space={2}
        >
          {/* Bounty image */}
          {bountyData?.images[0] ? (
            <Image
              source={{
                uri: bountyData?.images[0] ?? PLACE_HOLDER_IMAGE,
              }}
              width="55px"
              height="55px"
              borderRadius="xl"
              alt={bountyData?.name ?? "Bounty image"}
            />
          ) : (
            <Box
              width="55px"
              height="55px"
              borderRadius="xl"
              bgColor="gray.200"
            />
          )}

          <VStack alignItems="start" justifyContent="flex-start" flex={1}>
            {/* Bounty heading */}
            <Heading
              fontFamily={"Inter_400Regular"}
              fontSize="16px"
              lineHeight="19.36px"
              textAlign="center"
            >
              <Text
                fontFamily="Inter_700Bold"
                fontSize="16px"
                lineHeight="19.36px"
              >
                {bountyName}
              </Text>
              's search party
            </Heading>

            {/* Bounty description */}
            <Text
              noOfLines={2}
              isTruncated
              fontFamily="Inter_300Light"
              fontSize={12}
            >
              {bountyData?.appearance}
            </Text>
          </VStack>
        </HStack>
        <KeyboardAvoidingView
          bgColor="white"
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          keyboardVerticalOffset={95}
          flex={1}
        >
          <VStack h="full">
            {/* Forum message list */}
            <FlatList
              flex={1}
              px={4}
              data={forumMessages.sort((a, b) => b.timestamp - a.timestamp)}
              inverted
              renderItem={({ item: { user, message, timestamp }, index }) => (
                <VStack key={index}>
                  <Text
                    fontFamily="Inter_700Bold"
                    fontSize="16px"
                    lineHeight="19.36px"
                  >
                    @{user.name} | {new Date(timestamp).toLocaleTimeString()}
                  </Text>
                  <Text
                    fontFamily="Inter_500Medium"
                    fontSize="16px"
                    lineHeight="19.36px"
                  >
                    {message}
                  </Text>
                </VStack>
              )}
              ItemSeparatorComponent={() => (
                <Divider
                  borderColor="gray.200"
                  borderWidth="1px"
                  my={2}
                  w="full"
                />
              )}
              ListHeaderComponent={() => <Box h={4} />}
              ListFooterComponent={() => <Box h={4} />}
            />

            {/* Forum message input */}
            <ChatInput onSend={handleSendMessage} />
          </VStack>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default bountyForum;
