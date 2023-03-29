import { View, Image, Button, RefreshControl,Modal,StyleSheet,FlatList,Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useEffect, useState} from "react";
import { Center, Text, Box, Flex, Divider,Container,Pressable} from "native-base";
import { Link, Stack, usePathname, useRouter } from "expo-router";
import { useFirebaseSession } from "../../context/FirebaseAuthContext";
import useBountiesQuery from "../../utils/scripts/hooks/queries/useGetBounties";
import type { BountyQueryType } from "../../utils/scripts/hooks/queries/useGetBounties";
import BountyCard from "../Component/BountyCard";
import moment from 'moment';

// Temporary bounty card to display data

const HEIGHT = Dimensions.get('window').height;
const WIDTH = Dimensions.get('window').width;
const FeedPage = () => {
  const router = useRouter();
  const { data: sessionData, isLoading } = useFirebaseSession();

  // Use query hook to get bounty data
  const { data: bountyData, refetch } = useBountiesQuery();
  // bountyData.map(bountyItem => bountyItem.createdAt.toDate())

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
