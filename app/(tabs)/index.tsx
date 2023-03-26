import { View, Image, Button, RefreshControl,Modal,StyleSheet,FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState} from "react";
import { Center, Text, Box, Flex, Divider,Container,Pressable} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import BountyCard from "../Component/BountyCard";

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
      justifyContent="flex-start"
      alignItems="flex-start"
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

  const [isModalVisible, setModalVisible] = useState(false);
  const changeModalVisible =(bool:boolean) =>{
    setModalVisible(bool)

  }
  
  const [isModalData, setModalData] = useState(null);

  const changeModalData =(data:BountyQueryType) =>{
    setModalData(data)

  }

  return (
    <SafeAreaView edges={['left', 'right']}>
    <FlatList
      contentContainerStyle= {{ flexGrow: 1, alignItems:"center", backgroundColor: "white"}}
      data = {bountyData}
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
              <View style = {styles.leftbox}>
                    <Text style={styles.name_text}>{item.name}</Text>
                  <View style = {styles.descriptionbox}>
                    <Text style={styles.description_text}>{item.age}</Text>
                  </View>
              </View>
              
              <View style = {styles.rightbox}>
                  <Text style={styles.timestamp}>{item.lastSeen.toDate().toString()}</Text>
                  <Text style={styles.location}>{item.location.toJSON().latitude}</Text>
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
    justifyContent:"center"
    
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
    paddingHorizontal: 5
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
    flex: 1.5,
    justifyContent: "space-between",
    paddingTop:15,
    paddingRight:5,
    paddingBottom: 25,
    //borderBottomWidth: 2

  },
  pressable: {
    //borderBottomWidth: 1,
    //borderWidth: 1,
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
  DescContainerActive:{
    position: 'absolute',
    backgroundColor: 'lightgrey',//rgba(124,97,128, 1)',
    padding: 10,
    left: 30,
    right: 190,
    borderRadius:25
  },
  DescContainerInactive:{
    position: 'absolute',
    backgroundColor: 'rgba(233,233,233, 1)',//rgba(124,97,128, 1)',
    padding: 10,
    left: 30,
    right: 190,
    borderRadius:25
  },
  PhotoContainerActive:{
    position: 'absolute',
    backgroundColor: 'lightgrey',//rgba(124,97,128, 1)',
    padding: 10,
    left: 190,
    right: 30,
    borderRadius:25
  },
  PhotoContainerInactive:{
    position: 'absolute',
    backgroundColor: 'rgba(233,233,233, 1)',//rgba(124,97,128, 1)',
    padding: 10,
    left: 190,
    right: 30,
    borderRadius:25
  },
  modalBoldedText:{
    fontWeight: "bold",
    fontSize: 20
  },
  modalText:{
    fontSize: 20
  },
  photos:{
    width: 100,
    height: 100,
  }
});
export default FeedPage;
