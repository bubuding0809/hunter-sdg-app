import { View, Text } from "react-native";
import React, { useState } from "react";
import {
  Box,
  Button,
  Icon,
  IconButton,
  Input,
  KeyboardAvoidingView,
} from "native-base";
import { useRouter, usePathname, useSearchParams, Stack } from "expo-router";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import useGetBounty from "../../utils/scripts/hooks/queries/useGetBounty";

const bountyForum = () => {
  const { bountyId, bountyName } = useSearchParams();
  const [userMessage, setUserMessage] = useState("");
  return (
    <>
      <Stack.Screen
        options={{
          title: bountyName as string,
        }}
      />
      <KeyboardAvoidingView>
        <Box display="relative">
          <Input
            placeholder="Enter your message"
            type="text"
            value={userMessage}
            onChangeText={setUserMessage}
            height={"50px"}
            borderRadius="full"
            fontFamily={"Inter_500Medium"}
            fontSize={"16px"}
          />
          <IconButton
            position="absolute"
            right={0}
            top={0}
            bottom={0}
            icon={
              <Icon as={<MaterialCommunityIcons name="send" />} size="sm" />
            }
          />
        </Box>
      </KeyboardAvoidingView>
    </>
  );
};

export default bountyForum;
