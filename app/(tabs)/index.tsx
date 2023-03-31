import {
  View,
  Image,
  Button,
  RefreshControl,
  Modal,
  StyleSheet,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState } from "react";
import {
  Center,
  Text,
  Box,
  Flex,
  Divider,
  Container,
  Pressable,
} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import BountyCard from "../Component/BountyCard";
import moment from "moment";

// Temporary bounty card to display data
const HEIGHT = Dimensions.get("window").height;
const WIDTH = Dimensions.get("window").width;
const FeedPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Use query hook to get bounty data
  const { data: bountyData, refetch } = useBountiesQuery();
  // bountyData.map(bountyItem => bountyItem.createdAt.toDate())

  const [refreshing, setRefreshing] = useState(false);

  const [isModalVisible, setModalVisible] = useState(false);
  const changeModalVisible = (bool: boolean) => {
    setModalVisible(bool);
  };

  const [isModalData, setModalData] = useState(null);

  return (
    <SafeAreaView
      edges={["left", "right"]}
      style={{ flex: 1, backgroundColor: "white" }}
    >
      <FlatList
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: "white",
        }}
        style={{ backgroundColor: "white" }}
        data={bountyData}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              // Refetch bounties data
              setRefreshing(true);
              refetch()
                .then((res) => setRefreshing(false))
                .catch((err) => {
                  setRefreshing(false);
                  alert("Error refreshing bounties");
                });
            }}
          />
        }
        renderItem={({ item }) => (
          <Center>
            <Pressable
              onPress={() => {
                changeModalVisible(true);
                setModalData(item);
              }}
              style={styles.pressable}
            >
              <View style={styles.imagebox}>
                <Image style={styles.avatar} source={{ uri: item.images[0] }} />
              </View>

              {item.category === "pet" ? (
                //pet
                <View style={styles.leftbox}>
                  <Text style={styles.name_text}>{item.name}</Text>
                  <View style={styles.descriptionbox}>
                    <Text style={styles.description_text}>
                      Breed:{item.breed}
                    </Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.description_text}>
                        Age:{item.age}
                      </Text>
                      <Text style={styles.description_text}>
                        Gender:{item.gender}
                      </Text>
                    </View>
                  </View>
                </View>
              ) : (
                //non pet
                <View style={styles.leftbox}>
                  <Text style={styles.name_text}>{item.name}</Text>
                  <View style={styles.descriptionbox}>
                    <Text style={styles.description_text}>{item.category}</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Text style={styles.description_text}>
                        Age: {item.age}{" "}
                      </Text>
                      <Text style={styles.description_text}>
                        Gender: {item.gender}{" "}
                      </Text>
                    </View>
                  </View>
                </View>
              )}

              <View style={styles.rightbox}>
                {/* ."ctrl space" to see all available options */}
                <Text style={styles.timestamp}>
                  {moment(item.createdAt.toDate(), "MMDDYYYY").fromNow()}
                </Text>
                {/* //Need to add in geolocation  */}
                <Text style={styles.location}>
                  {item.createdAt.toDate().toDateString()}
                </Text>
              </View>
            </Pressable>
            <Modal visible={isModalVisible} animationType="slide">
              <BountyCard
                changeModalVisible={changeModalVisible}
                bountyData={isModalData}
              />
            </Modal>
          </Center>
        )}
      />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  name_text: {
    fontWeight: "bold",
    fontSize: 16,
    fontFamily: "Inter_600SemiBold",
  },
  description_text: {
    fontWeight: "normal",
    fontSize: 14,
    paddingHorizontal: 3,
    fontFamily: "Inter_400Regular",
  },
  timestamp: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right",
    fontFamily: "Inter_400Regular",
  },
  location: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right",
    fontFamily: "Inter_400Regular",
  },
  avatar: {
    aspectRatio: 1,
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  descriptionbox: {
    width: "100%",
    height: "75%",
    marginTop: 20,
    justifyContent: "center",
  },
  imagebox: {
    position: "relative",
    flex: 2,
    paddingHorizontal: 5,
  },
  leftbox: {
    position: "relative",
    flex: 6,
    justifyContent: "space-around",
    paddingVertical: 15,
    paddingLeft: 5,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  rightbox: {
    position: "relative",
    flex: 3,
    justifyContent: "space-between",
    paddingTop: 15,
    paddingRight: 5,
    paddingBottom: 25,
    borderBottomWidth: 1,
    borderColor: "#E8E8E8",
  },
  pressable: {
    flexDirection: "row",
    borderRadius: 5,
    backgroundColor: "transparent",
    width: WIDTH * 0.9,
    height: 100,
    marginVertical: 5,
  },
  shadowProp: {
    shadowColor: "#171717",
    shadowOffset: { width: 3, height: 3 },
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  modalName: {
    fontWeight: "bold",
    fontSize: 40,
  },
  avatarModal: {
    width: 170,
    height: 170,
    borderRadius: 90,
  },
  modalCloseButtonContainer: {
    position: "absolute",
    bottom: 0,
    left: 50,
    right: 50,
    backgroundColor: "black",
    borderTopWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 40,
  },
  HuntButtonContainer: {
    position: "absolute",
    bottom: 100,
    left: 100,
    right: 100,
    backgroundColor: "black",
    borderTopWidth: 1,
    borderColor: "black",
    padding: 10,
    borderRadius: 40,
  },
  photos: {
    width: 100,
    height: 100,
  },
});
export default FeedPage;
