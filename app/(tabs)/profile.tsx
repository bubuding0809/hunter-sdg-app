import React, { useState, FunctionComponent, Fragment } from "react";
import {
  Center,
  Pressable,
  VStack,
  Container,
  Row,
  Heading,
  ScrollView,
  HStack,
  Image,
  Box,
  Text,
  Divider,
} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import { StyleSheet, View, Dimensions, StatusBar } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import ToggleSwitch from "../../components/Home/ToggleSwitch";
import useJoinBounty from "../../utils/scripts/hooks/mutations/useJoinBounty";
import useGetUser from "../../utils/scripts/hooks/queries/useGetUser";
import useGetBountyByUserId from "../../utils/scripts/hooks/queries/useGetBountyByUserId";

const PROFILE_IMAGE =
  "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=778&q=80";

const WIDTH = Dimensions.get("window").width;
const HEIGHT = Dimensions.get("window").height;

const ProfilePage = () => {
  const router = useRouter();
  const [currTab, setCurrTab] = useState<1 | 2>(1);
  const { data: sessionData } = useFirebaseSession();

  // User data
  const { data: userData } = useGetUser(
    {
      userId: sessionData?.uid ?? "",
    },
    {
      enabled: !!sessionData?.uid,
    }
  );

  // bounty data
  const { data: bountyData } = useGetBountyByUserId(
    {
      userId: sessionData?.uid ?? "",
    },
    {
      enabled: !!sessionData?.uid,
    }
  );

  // render bounties or members tab
  const renderTab = () => {
    switch (currTab) {
      case 1:
        return (
          <ScrollView flex={1} width="85%">
            <VStack
              divider={
                <Divider borderColor="gray.200" borderWidth="1px" ml={"16"} />
              }
            >
              {bountyData ? (
                <HStack p={2} borderBottomColor="gray.200" space={2}>
                  {/* Bounty image */}
                  {bountyData?.images[0] ? (
                    <Image
                      source={{
                        uri: bountyData?.images[0] ?? PROFILE_IMAGE,
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

                  <VStack
                    alignItems="start"
                    justifyContent="flex-start"
                    flex={1}
                  >
                    {/* Bounty heading */}
                    <Heading
                      fontFamily={"Inter_400Regular"}
                      fontSize="16px"
                      lineHeight="19.36px"
                      textAlign="center"
                    >
                      Name:{" "}
                      <Text
                        fontFamily="Inter_700Bold"
                        fontSize="16px"
                        lineHeight="19.36px"
                      >
                        {bountyData?.name}
                      </Text>
                    </Heading>

                    {/* Bounty id */}
                    <Text
                      fontFamily={"Inter_400Regular"}
                      fontSize="16px"
                      lineHeight="19.36px"
                      textAlign="center"
                    >
                      ID: {bountyData.id}
                    </Text>

                    {/* Bounty appearance */}
                    <Text
                      mt={1}
                      noOfLines={2}
                      isTruncated
                      fontFamily="Inter_300Light"
                      fontSize={12}
                    >
                      {bountyData?.appearance}
                    </Text>

                    {/* Bounty additional info */}
                    <Text
                      mt={1}
                      noOfLines={2}
                      isTruncated
                      fontFamily="Inter_300Light"
                      fontSize={12}
                    >
                      {bountyData?.additionalInfo}
                    </Text>
                  </VStack>
                </HStack>
              ) : (
                <Text>No bounties yet</Text>
              )}
            </VStack>
          </ScrollView>
        );
      case 2:
        return <>Tab 2</>;
      default:
        return <></>;
    }
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.topbox} edges={["left", "right"]}>
        <Container style={styles.picturebox}>
          <View
            style={{
              backgroundColor: "#E5E5E5",
              height: "0%",
              width: "100%",
              bottom: 0,
              position: "absolute",
            }}
          />
          <Image
            style={styles.profilePhoto}
            source={{
              uri: PROFILE_IMAGE,
            }}
            alt="Profile Image"
          />
        </Container>

        <Heading
          mt={16}
          fontFamily="Inter_600SemiBold"
          fontSize="30px"
          textAlign="center"
        >
          {userData?.firstName} {userData?.lastName}
        </Heading>

        <Container style={styles.togglebox}>
          <ToggleSwitch
            onSelectSwitch={setCurrTab}
            selectionColor={"#000000"}
            options={["Bounties", "Members"]}
          />
        </Container>

        <Container style={styles.bottombox}>{renderTab()}</Container>

        <Container style={styles.buttonbox}>
          <Pressable>
            <View
              style={{
                borderRadius: 100,
                backgroundColor: "black",
                alignItems: "center",
                width: WIDTH * 0.85,
                padding: 18,
                top: "10%",
              }}
            >
              <Link
                href="bountyForm"
                style={{
                  color: "white",
                  fontFamily: "Inter_600SemiBold",
                  fontSize: 16,
                  alignItems: "center",
                }}
              >
                New Bounty
              </Link>
            </View>
          </Pressable>
        </Container>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  topbox: {
    paddingVertical: 0,
    maxHeight: "100%",
    flex: 1,
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white",
  },
  picturebox: {
    maxWidth: "100%",
    height: 200,
    backgroundColor: "black",
    alignItems: "center",
    // paddingTop: -40
  },
  profilePhoto: {
    marginTop: 100,
    height: 150,
    aspectRatio: 1,
    borderRadius: 150,
    borderWidth: 3,
    borderColor: "white",
    zIndex: 2,
  },
  togglebox: {
    zIndex: 1,
    marginTop: 25,
    maxWidth: "100%",
    flex: 1,
    width: WIDTH,
    position: "relative",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  bottombox: {
    marginTop: 8,
    maxWidth: "100%",
    width: "100%",
    flex: 5,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
    display: "flex",
  },
  buttonbox: {
    maxWidth: "100%",
    flex: 1.5,
    position: "relative",
    borderColor: "red",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "white",
  },
});

export default ProfilePage;
