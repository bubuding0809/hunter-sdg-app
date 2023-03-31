import React, { useEffect, useState } from "react";
import { Box, IconButton, Input } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useGetUser from "../../utils/scripts/hooks/queries/useGetUser";
import { ForumMessageType } from "../../app/bountyForum/[bountyId]";

interface ChatInputProps {
  onSend: (message: ForumMessageType) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSend }) => {
  const { data: sessionData } = useFirebaseSession();
  const [userMessage, setUserMessage] = useState("");

  // Query to get user data
  const { data: userData } = useGetUser(
    {
      userId: sessionData?.uid ?? "",
    },
    {
      enabled: !!sessionData?.uid,
    }
  );

  return (
    <Box
      display="relative"
      px={2}
      pt={1}
      borderTopWidth="1px"
      borderTopColor="gray.200"
    >
      <Input
        pl={4}
        height={"55px"}
        borderRadius="full"
        bgColor={"gray.50"}
        fontFamily={"Inter_500Medium"}
        fontSize={"16px"}
        lineHeight="19.36px"
        placeholder="Enter your message"
        type="text"
        value={userMessage}
        onChangeText={setUserMessage}
        _focus={{
          borderColor: "gray.400",
          bgColor: "white",
        }}
      />
      <IconButton
        style={{
          position: "absolute",
          right: 0,
          bottom: -9,
        }}
        position={"absolute"}
        borderRadius="full"
        variant={"unstyled"}
        _icon={{
          as: Ionicons,
          name: "ios-arrow-up-circle",
          size: "50px",
          color: "black",
        }}
        _pressed={{
          _icon: {
            color: "gray.400",
          },
        }}
        onPress={() => {
          if (!userMessage.trim().length) return;
          onSend({
            user: {
              userId: sessionData?.uid ?? "",
              name: userData?.firstName,
              profilePicture: "",
            },
            message: userMessage,
            timestamp: Date.now(),
          });
          setUserMessage("");
        }}
      />
    </Box>
  );
};

export default ChatInput;
