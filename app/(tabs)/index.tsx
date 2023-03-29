<<<<<<< HEAD
import { View, Image, Button, RefreshControl,Modal,StyleSheet,FlatList,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState} from "react";
import { Center, Text, Box, Flex, Divider,Container,Pressable} from "native-base";
=======
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
>>>>>>> main
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
<<<<<<< HEAD
import BountyCard from "../Component/BountyCard";
import moment from 'moment';
=======
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
>>>>>>> main

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
<<<<<<< HEAD
=======
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
>>>>>>> main

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const FeedPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Use query hook to get bounty data
<<<<<<< HEAD
  const { data: bountyData, refetch } = useBountiesQuery();
  // bountyData.map(bountyItem => bountyItem.createdAt.toDate())
=======
  const { data: bountyData, refetch: refetchBountData } = useBountiesQuery();

  // User query hook to get user data by id
  const { data: userData, refetch: refetchUserData } = useGetUser({
    userId: sessionData?.uid,
  });

  // Mutation to join bounty
  const { mutate: joinBounty } = useJoinBounty();
>>>>>>> main

  const [refreshing, setRefreshing] = useState(false);

<<<<<<< HEAD
  const [isModalVisible, setModalVisible] = useState(false);
  const changeModalVisible =(bool:boolean) =>{
    setModalVisible(bool)

  }
  
  const [isModalData, setModalData] = useState(null);

  const changeModalData =(data:BountyQueryType) =>{
    setModalData(data)

  }

  return (
    <View style = {{height: HEIGHT, backgroundColor:"white"}}>
      <SafeAreaView edges={['left', 'right']}>
    <FlatList
      contentContainerStyle= {{ flexGrow: 1, alignItems:"center", backgroundColor: "white", height:HEIGHT, width:WIDTH}}
      data = {bountyData}
      showsVerticalScrollIndicator = {false}
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
      renderItem = {({item}) => 
          
            <Container style = {[styles.bountyBox, styles.shadowProp]}>
              <Pressable onPress ={ () => {changeModalVisible(true),setModalData(item)}} style = {styles.pressable}>
                <View style = {styles.imagebox}>
                  <Image style={styles.avatar} source={{ uri: item.images[0] }} />
                </View>

              {item.category === 'pet' ? (
                //pet
                <View style = {styles.leftbox}>
                  <Text style={styles.name_text}>{item.name}</Text>
                  <View style = {styles.descriptionbox}>
                    <Text style={styles.description_text}>Breed:{item.breed}</Text>
                    <View style = {{flexDirection:"row"}}>
                      <Text style={styles.description_text}>Age:{item.age}</Text>
                      <Text style={styles.description_text}>Gender:{item.gender}</Text>
                    </View>
                    
                  </View>
                </View>
                ) : (
                  //non pet 
                  <View style = {styles.leftbox}>
                 <Text style={styles.name_text}>{item.name}</Text>
                  <View style = {styles.descriptionbox}>
                  <Text style={styles.description_text}>{item.category}</Text>
                  <View style = {{flexDirection: "row"}}>
                    <Text style={styles.description_text}>Age: {item.age} </Text>
                    <Text style={styles.description_text}>Gender: {item.gender} </Text>
                  </View>
                    
                  </View>
                </View>
              )}
              
              <View style = {styles.rightbox}> 
              {/* ."ctrl space" to see all available options */}
                  <Text style={styles.timestamp}>{moment(item.createdAt.toDate(), "MMDDYYYY").fromNow()}</Text>
                  {/* //Need to add in geolocation  */}
                  <Text style={styles.location}>{item.createdAt.toDate().toDateString()}</Text>
              </View>
              </Pressable>
              <Modal
                visible = {isModalVisible}
                animationType = "slide">
                <BountyCard
                changeModalVisible ={changeModalVisible}
                data = {isModalData}
                />
                </Modal>
                
            </Container>

      
      }
    />
    </SafeAreaView>
    </View>
    
=======
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
>>>>>>> main
  );
};
const styles = StyleSheet.create({
  
  name_text: {
    fontWeight: "bold",
    fontSize: 16

  },
  description_text: {
    fontWeight: "normal",
    fontSize: 14
  },
  timestamp: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right",
  },
  location: {
    fontWeight: "normal",
    fontSize: 10,
    textAlign: "right",
  },
  description_box:{
    width:"70%",
    height:"100%",

  },
  bountyBox: {
    width: "100%", 
    height: 100,
    flexDirection: "row", 
    marginVertical: 10,
    backgroundColor: "white",
    justifyContent:"center",
    borderRadius: 10
  },
  avatar: {
    aspectRatio: 1, 
    width: "100%",
    marginVertical: 10,
    borderRadius: 5,
  },
  descriptionbox: {
    width:"100%",
    height: "75%",
    marginTop: 20,
    justifyContent:"center"
  },
  imagebox:{
    position: "relative",
    flex: 2,
    paddingHorizontal: 5,
    justifyContent:"center",
  },
  leftbox:{
    position: "relative",
    flex: 6,
    justifyContent: "space-around",
    paddingVertical:15,
    paddingLeft:5,
    //borderBottomWidth: 2
  },
  rightbox:{
    position: "relative",
    flex: 2,
    justifyContent: "space-between",
    paddingTop:15,
    paddingRight:5,
    paddingBottom: 25,
    //borderBottomWidth: 2

  },
  pressable: {
    borderColor: "grey",
    width: "100%",
    height: "100%",
    flexDirection: "row",
    borderRadius: 5,

  },
  shadowProp: {
    shadowColor: '#171717',
    shadowOffset: {width: 3, height: 3},
    shadowOpacity: 0.4,
    shadowRadius: 3,
  },
  modalName: {
    fontWeight: "bold",
    fontSize: 40
  },
  avatarModal:{
    width: 170,
    height: 170,
    borderRadius: 90
  },
  modalCloseButtonContainer:{
    position: 'absolute',
    bottom: 0,
    left: 50,
    right: 50,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius:40
  },
  HuntButtonContainer:{
    position: 'absolute',
    bottom: 100,
    left: 100,
    right: 100,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderColor: 'black',
    padding: 10,
    borderRadius:40
  },
  photos:{
    width: 100,
    height: 100,
  }
});
export default FeedPage;
